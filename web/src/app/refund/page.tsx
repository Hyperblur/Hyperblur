import type { Metadata } from "next";
import { DocLink, DocList, DocSection, P } from "@/components/site/doc-parts";
import { LegalShell } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How cancellation and refunds work for Hyperblur Pro.",
};

export default function RefundPage() {
  return (
    <LegalShell
      title="Refund Policy"
      lead="Cancel whenever you want. If Pro is not for you, ask for your money back within 14 days."
      updated="November 7, 2026"
    >
      <DocSection title="14-day refund">
        <P>
          If you subscribe to Hyperblur Pro, monthly or yearly, you can ask for
          a full refund within 14 days of the purchase. No explanation is
          needed.
        </P>
      </DocSection>

      <DocSection title="How to ask">
        <DocList>
          <li>
            Email{" "}
            <DocLink href="mailto:support@hyperblur.dev">
              support@hyperblur.dev
            </DocLink>{" "}
            from the address you used at checkout, or include the order number
            from your receipt.
          </li>
          <li>
            We reply within a few business days and confirm the refund by email.
          </li>
          <li>
            The money goes back to the original payment method. The time it
            takes to show up depends on your bank or card issuer.
          </li>
        </DocList>
      </DocSection>

      <DocSection title="Renewals">
        <P>
          If a renewal charge surprised you, write to us within 14 days of the
          charge and we will refund it. To avoid future charges, cancel before
          the renewal date.
        </P>
      </DocSection>

      <DocSection title="Cancelling">
        <DocList>
          <li>
            You can cancel at any time; the cancel link is in your receipt and
            in your account email.
          </li>
          <li>
            After you cancel, you keep access until the end of the period you
            already paid for.
          </li>
          <li>
            You keep the right to use the code you already installed in your
            projects.
          </li>
          <li>
            Cancelling stops the next charge. It does not refund the current
            period after the 14 days.
          </li>
        </DocList>
      </DocSection>

      <DocSection title="What is not refundable">
        <P>
          The free catalog is free and has nothing to refund. We may decline
          refunds for accounts that violate the{" "}
          <DocLink href="/terms">Terms of Service</DocLink>, for example by
          sharing or reselling Pro content.
        </P>
      </DocSection>

      <DocSection title="Your rights as a consumer">
        <P>
          If you live in Brazil, you also have the right of withdrawal within 7
          days of an online purchase under the Consumer Defense Code. Our 14-day
          policy already covers it. Nothing here limits rights the law gives
          you.
        </P>
      </DocSection>

      <DocSection title="Contact">
        <P>
          <DocLink href="mailto:support@hyperblur.dev">
            support@hyperblur.dev
          </DocLink>
        </P>
      </DocSection>
    </LegalShell>
  );
}
