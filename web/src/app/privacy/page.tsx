import type { Metadata } from "next";
import { DocLink, DocList, DocSection, P } from "@/components/site/doc-parts";
import { LegalShell } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What data Hyperblur collects, why, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      lead="What we collect, why we collect it and how to ask us to change or delete it."
      updated="November 7, 2026"
    >
      <DocSection title="Who is responsible">
        <P>
          Hyperblur is operated by Anderson Monteiro, an individual based in
          Brazil, who is the controller of the personal data described here.
          Contact:{" "}
          <DocLink href="mailto:support@hyperblur.dev">
            support@hyperblur.dev
          </DocLink>
          .
        </P>
      </DocSection>

      <DocSection title="What we collect">
        <DocList>
          <li>
            <strong>Messages you send us.</strong> If you email support, we keep
            your address and the conversation so we can help you.
          </li>
          <li>
            <strong>Purchase data.</strong> When you buy Hyperblur Pro, our
            payment provider collects your name, email, billing country and
            payment details. We receive your email, plan and payment status. We
            never see or store your card number.
          </li>
          <li>
            <strong>Access data.</strong> For Pro, we keep your email and
            license key so the private registry and the MCP server can recognize
            you.
          </li>
          <li>
            <strong>Technical logs.</strong> Our servers record your IP address,
            browser type and the pages requested. We use this to keep the
            service secure and working, and we keep it for a limited time.
          </li>
          <li>
            <strong>Usage events.</strong> When you click a copy button, a main
            button or a link to another site, your browser sends the event name,
            the page path and a random identifier that lives only in the current
            tab session. It goes to analytics run by us, sets no cookies, is
            never used for advertising and is skipped when your browser sends Do
            Not Track.
          </li>
          <li>
            <strong>Install requests.</strong> When the registry serves a file,
            we count the request per item. We do not link these counts to a
            person.
          </li>
        </DocList>
        <P>
          The website does not use advertising cookies or advertising trackers,
          and it sets no cookies at all. If that changes, we will update this
          page.
        </P>
      </DocSection>

      <DocSection title="Why we use it">
        <DocList>
          <li>
            To deliver the service and Pro access you paid for (performance of a
            contract).
          </li>
          <li>
            To answer your messages and give support (legitimate interest and
            contract).
          </li>
          <li>
            To keep the service secure and to prevent abuse (legitimate
            interest).
          </li>
          <li>To meet tax and legal obligations (legal obligation).</li>
        </DocList>
      </DocSection>

      <DocSection title="Who we share it with">
        <P>
          We do not sell your data. We share only what is needed with the
          providers that run the service:
        </P>
        <DocList>
          <li>
            The payment provider that processes purchases and subscriptions.
          </li>
          <li>The email provider that delivers our messages and receipts.</li>
          <li>The hosting provider that runs our servers.</li>
        </DocList>
        <P>
          Some of these providers are located outside Brazil, so your data may
          be processed in other countries. We choose providers that protect data
          in line with the law.
        </P>
      </DocSection>

      <DocSection title="How long we keep it">
        <P>
          We keep support messages and Pro account data while your account is
          active and for as long as needed to handle questions, taxes and legal
          duties. Server logs are kept for a short period and then deleted. You
          can ask us to delete your data earlier, unless the law requires us to
          keep it.
        </P>
      </DocSection>

      <DocSection title="Your rights">
        <P>
          Under the Brazilian General Data Protection Law (LGPD), and similar
          laws where you live, you can ask us to confirm that we process your
          data, to give you access to it, to correct it, to delete it, to export
          it and to stop processing it. You can also withdraw consent where we
          rely on it. Write to{" "}
          <DocLink href="mailto:support@hyperblur.dev">
            support@hyperblur.dev
          </DocLink>{" "}
          and we will answer within 15 days.
        </P>
      </DocSection>

      <DocSection title="Security">
        <P>
          We use encrypted connections, access controls and backups to protect
          your data. No system is perfectly secure, so if something affecting
          you happens, we will tell you as the law requires.
        </P>
      </DocSection>

      <DocSection title="Children">
        <P>
          Hyperblur is built for developers and is not directed at children
          under 13.
        </P>
      </DocSection>

      <DocSection title="Changes">
        <P>
          We may update this policy. The date at the top shows the latest
          version. If a change is important, we will tell you by email or on the
          website.
        </P>
      </DocSection>
    </LegalShell>
  );
}
