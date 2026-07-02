import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of MyDubaiSafarii's website and the booking of Dubai desert safari tours via WhatsApp.",
};

const LAST_UPDATED = "1 July 2026";

export default function TermsPage() {
  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-midnight/50">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-10 text-midnight/80 leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website or booking a tour with MyDubaiSafarii
                (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;,
                &ldquo;the Company&rdquo;), you agree to be bound by these Terms
                of Service. If you do not agree, please do not use our website or
                services. These terms are governed by the laws of the United Arab
                Emirates.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                2. Services
              </h2>
              <p>
                MyDubaiSafarii provides desert safari tours, adventure
                experiences, and related tourism services in Dubai, UAE. All
                bookings are confirmed via WhatsApp ({SITE.whatsappDisplay}).
                A booking is only confirmed when you receive an explicit
                confirmation message from our team along with your booking
                reference.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                3. Booking and Payment
              </h2>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  Bookings are made via WhatsApp conversation with our team.
                </li>
                <li>
                  Prices are quoted in UAE Dirhams (AED) and are per person unless
                  otherwise stated.
                </li>
                <li>
                  Payment is due at the time of the tour (in cash, or via a payment
                  link sent by our team). We do not store payment card details.
                </li>
                <li>
                  Prices are subject to change without notice until a booking is
                  confirmed in writing by our team.
                </li>
                <li>
                  We reserve the right to decline any booking at our discretion.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                4. Cancellation and Refunds
              </h2>
              <p>
                Our cancellation policy is detailed in the{" "}
                <a
                  href="/policy/cancellation"
                  className="text-gold underline hover:text-orange transition-colors"
                >
                  Cancellation Policy
                </a>
                . In summary:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  Standard tours: free cancellation up to 24 hours before the
                  experience.
                </li>
                <li>
                  Premium/overnight tours: free cancellation up to 48 hours before
                  the experience.
                </li>
                <li>
                  No refunds for cancellations within the applicable window, or for
                  no-shows.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                5. Health, Safety, and Eligibility
              </h2>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  Dune bashing and off-road activities involve inherent physical
                  risks. By booking, you acknowledge this and confirm that all
                  participants are in a suitable state of health.
                </li>
                <li>
                  Dune bashing is not recommended for guests who are pregnant, have
                  back or neck injuries, heart conditions, or severe motion sickness.
                </li>
                <li>
                  Children under 3 years of age are not permitted on dune-bashing
                  vehicles. Infants may attend the camp only.
                </li>
                <li>
                  Quad bikes and dune buggies require participants to be a minimum
                  of 16 years of age to drive.
                </li>
                <li>
                  Our guides&rsquo; safety instructions must be followed at all
                  times. Failure to do so may result in removal from the activity
                  without a refund.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                6. Liability
              </h2>
              <p>
                MyDubaiSafarii carries public liability insurance appropriate for
                our licensed activities. However, to the maximum extent permitted
                by UAE law, we are not liable for:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  Personal injury, loss or damage arising from participation in
                  activities where the participant failed to follow safety
                  instructions.
                </li>
                <li>
                  Loss or theft of personal belongings during tours.
                </li>
                <li>
                  Delays or cancellations caused by adverse weather conditions,
                  government restrictions, or other force-majeure events.
                </li>
                <li>
                  Indirect or consequential losses (missed flights, hotel costs,
                  etc.).
                </li>
              </ul>
              <p className="mt-3">
                In all cases, our total liability to you shall not exceed the price
                paid for the tour in question.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibent text-midnight mb-3">
                7. Weather and Itinerary Changes
              </h2>
              <p>
                Desert conditions can change rapidly. We reserve the right to
                modify itineraries, substitute activities, or postpone tours due
                to unsafe weather, sandstorms, or other conditions beyond our
                control. Where a tour is cancelled by us, we will offer a full
                refund or a reschedule — your choice.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                8. Photography and Media
              </h2>
              <p>
                During tours, our team may take photographs or short video clips
                for use on our social media channels and website. If you do not
                wish to be photographed, please inform your guide at the start of
                the tour. We will never share identifiable images of minors without
                explicit parental consent.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                9. Intellectual Property
              </h2>
              <p>
                All content on this website — including text, photography,
                graphics, and branding — is the property of MyDubaiSafarii or
                its licensors. You may not reproduce, distribute, or create
                derivative works from this content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                10. Governing Law
              </h2>
              <p>
                These Terms of Service are governed by the laws of the United Arab
                Emirates and, where applicable, the Emirate of Dubai. Any disputes
                arising under these terms shall be subject to the exclusive
                jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                11. Changes to These Terms
              </h2>
              <p>
                We may update these terms from time to time. The latest version
                will always be posted on this page with a revised &ldquo;Last
                updated&rdquo; date. Continued use of our services after changes
                are posted constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                12. Contact
              </h2>
              <address className="not-italic space-y-1 text-midnight/70">
                <p>MyDubaiSafarii</p>
                <p>{SITE.address}</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-gold underline hover:text-orange transition-colors"
                  >
                    {SITE.email}
                  </a>
                </p>
                <p>WhatsApp: {SITE.whatsappDisplay}</p>
              </address>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
