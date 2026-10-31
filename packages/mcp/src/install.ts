import { spawn } from "node:child_process";
import { stat } from "node:fs/promises";
import path from "node:path";

export const INSTALL_TIMEOUT_MS = 3 * 60 * 1000;
const OUTPUT_LIMIT = 30_000;
const KILL_GRACE_MS = 5_000;

export interface CommandResult {
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  output: string;
  spawnError?: string;
}

export interface RunOptions {
  cwd: string;
  timeoutMs: number;
}

export type CommandRunner = (command: string, args: string[], options: RunOptions) => Promise<CommandResult>;

export function shadcnArgs(itemUrl: string, overwrite: boolean): string[] {
  return ["shadcn@latest", "add", itemUrl, "--yes", ...(overwrite ? ["--overwrite"] : [])];
}

export function npxInvocation(args: string[]): { command: string; args: string[] } {
  if (process.platform === "win32") {
    const npxCli = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js");
    return { command: process.execPath, args: [npxCli, ...args] };
  }
  return { command: "npx", args };
}

export async function validateProjectDir(projectDir: string): Promise<string | undefined> {
  if (!path.isAbsolute(projectDir)) {
    return `projectDir must be an absolute path, got "${projectDir}". Pass the full path to the root of the React project (the folder that contains package.json).`;
  }
  const dirStat = await stat(projectDir).catch(() => undefined);
  if (!dirStat) {
    return `projectDir "${projectDir}" does not exist. Pass the full path to the root of an existing React project.`;
  }
  if (!dirStat.isDirectory()) {
    return `projectDir "${projectDir}" is a file, not a directory. Pass the project root folder that contains package.json.`;
  }
  const manifest = await stat(path.join(projectDir, "package.json")).catch(() => undefined);
  if (!manifest?.isFile()) {
    return `No package.json found in "${projectDir}". Point projectDir at the root of the React project, or create the project first.`;
  }
  return undefined;
}

export async function findInstalledFile(projectDir: string, target: string): Promise<string | undefined> {
  const candidates = [path.join(projectDir, target), path.join(projectDir, "src", target)];
  for (const candidate of candidates) {
    const found = await stat(candidate).catch(() => undefined);
    if (found?.isFile()) return candidate;
  }
  return undefined;
}

export const runCommand: CommandRunner = (command, args, options) =>
  new Promise((resolve) => {
    let output = "";
    let timedOut = false;
    let settled = false;
    let killTimer: NodeJS.Timeout | undefined;

    const append = (chunk: Buffer) => {
      output += chunk.toString("utf8");
      if (output.length > OUTPUT_LIMIT * 2) {
        output = output.slice(-OUTPUT_LIMIT);
      }
    };

    const child = spawn(command, args, {
      cwd: options.cwd,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, npm_config_yes: "true" },
      windowsHide: true,
    });

    const finish = (result: Omit<CommandResult, "output" | "timedOut">) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      const trimmed = output.length > OUTPUT_LIMIT ? `[output truncated]\n${output.slice(-OUTPUT_LIMIT)}` : output;
      resolve({ ...result, timedOut, output: trimmed });
    };

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      killTimer = setTimeout(() => child.kill("SIGKILL"), KILL_GRACE_MS);
    }, options.timeoutMs);

    child.stdout.on("data", append);
    child.stderr.on("data", append);
    child.on("error", (error) => finish({ exitCode: null, signal: null, spawnError: error.message }));
    child.on("close", (exitCode, signal) => finish({ exitCode, signal }));
  });
