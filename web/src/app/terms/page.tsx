import type { Metadata } from "next";
import { DocLink, DocList, DocSection, P } from "@/components/site/doc-parts";
import { LegalShell } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Hyperblur catalog and Hyperblur Pro.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      lead="The rules for using the Hyperblur catalog, the MCP server and Hyperblur Pro."
      updated="November 7, 2026"
    >
      <DocSection title="1. Who we are">
        <P>
          Hyperblur is a catalog of visual effects and interface components for
          React, distributed as a shadcn registry, an MCP server and a Claude
          Code plugin. It is operated by Anderson Monteiro, an individual based
          in Brazil (&quot;Hyperblur&quot;, &quot;we&quot;, &quot;us&quot;). You
          can reach us at{" "}
          <DocLink href="mailto:support@hyperblur.dev">
            support@hyperblur.dev
          </DocLink>
          .
        </P>
        <P>
          By using the website, the registry or Hyperblur Pro you agree to these
          terms.
        </P>
      </DocSection>

      <DocSection title="2. The free catalog">
        <P>
          The public catalog is released under the MIT license. You may use,
          copy, modify and distribute the code in personal and commercial
          projects, as long as you keep the license notice. The catalog is
          provided as is, without warranty of any kind.
        </P>
      </DocSection>

      <DocSection title="3. Hyperblur Pro">
        <P>
          Hyperblur Pro is a paid subscription that gives access to premium
          content, such as full page templates, premium blocks and a private
          registry, as described on the <DocLink href="/pro">Pro page</DocLink>.
          Pro is launching soon; this section applies once subscriptions are
          available for purchase.
        </P>
        <P>
          What a plan includes is what the Pro page lists at the moment you
          subscribe. We add new content over time, but we do not promise any
          specific future item, release date or number of items.
        </P>
      </DocSection>

      <DocSection title="4. Licenses and keys">
        <DocList>
          <li>
            A Pro license key is personal to the subscriber. A Team plan covers
            the number of seats shown on the plan.
          </li>
          <li>
            Do not share, publish or resell your key. We may revoke keys that
            are shared or abused.
          </li>
          <li>
            With an active subscription you may use Pro content in any number of
            projects, including projects you build for clients.
          </li>
          <li>
            You may not redistribute, resell or republish Pro content as a
            component library, template pack, registry or any similar product.
          </li>
          <li>
            If you cancel, you keep the right to use the code you already
            installed in your projects. Access to the private registry and to
            new Pro content ends when the paid period ends.
          </li>
        </DocList>
      </DocSection>

      <DocSection title="5. Payments and billing">
        <P>
          Payments are handled by a third-party payment provider, which collects
          the price and applicable taxes at checkout. Subscriptions renew
          automatically every month or every year, depending on the plan you
          choose, until you cancel. Prices are shown on the Pro page and may
          change; a price change applies to your next renewal after we notify
          you by email.
        </P>
      </DocSection>

      <DocSection title="6. Cancellation and refunds">
        <P>
          You can cancel at any time. Refunds are covered by the{" "}
          <DocLink href="/refund">Refund Policy</DocLink>.
        </P>
      </DocSection>

      <DocSection title="7. Acceptable use">
        <DocList>
          <li>
            Do not use the service to break the law or to infringe other
            people&apos;s rights.
          </li>
          <li>
            Do not attempt to bypass access controls, scrape the private
            registry or overload the service.
          </li>
          <li>Do not claim the Hyperblur name or logo as your own.</li>
        </DocList>
      </DocSection>

      <DocSection title="8. Intellectual property">
        <P>
          The Hyperblur name, logo and website design belong to us. The code you
          receive is licensed to you as described above; you own what you build
          with it.
        </P>
      </DocSection>

      <DocSection title="9. Availability and changes">
        <P>
          We work to keep the service available, but it may be interrupted for
          maintenance or for reasons outside our control. We may change, add or
          remove content. We may update these terms; the date at the top shows
          the latest version, and continued use after an update means you accept
          it.
        </P>
      </DocSection>

      <DocSection title="10. Liability">
        <P>
          To the extent permitted by law, the service and the code are provided
          as is, and we are not liable for indirect or consequential losses,
          such as lost profit or data. Our total liability for any claim is
          limited to the amount you paid us in the 12 months before the claim.
          Nothing in these terms limits rights that the law gives you as a
          consumer.
        </P>
      </DocSection>

      <DocSection title="11. Governing law">
        <P>
          These terms are governed by the laws of Brazil. If a dispute cannot be
          solved by talking to us first, it will be handled by the courts of the
          place where the consumer lives, when the law gives you that right.
        </P>
      </DocSection>

      <DocSection title="12. Contact">
        <P>
          Questions about these terms:{" "}
          <DocLink href="mailto:support@hyperblur.dev">
            support@hyperblur.dev
          </DocLink>
          .
        </P>
      </DocSection>
    </LegalShell>
  );
}
