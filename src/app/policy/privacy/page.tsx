import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how MyDubaiSafari collects, uses, and protects your personal information when you book a Dubai desert safari via WhatsApp.",
  alternates: { canonical: `${SITE_URL}/policy/privacy` },
};

const LAST_UPDATED = "1 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-midnight/50">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-10 text-midnight/80 leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                1. Who We Are
              </h2>
              <p>
                MyDubaiSafari (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
                &ldquo;us&rdquo;) operates a desert safari tour booking service
                based in Dubai, United Arab Emirates. Our office is located at{" "}
                {SITE.address}. We can be reached at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-gold underline hover:text-orange transition-colors"
                >
                  {SITE.email}
                </a>{" "}
                or by WhatsApp at {SITE.whatsappDisplay}.
              </p>
              <p className="mt-2">
                This Privacy Policy explains what personal information we collect
                when you enquire about or book a tour with us via WhatsApp, how
                we use that information, and your rights as a data subject.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                2. Information We Collect
              </h2>
              <p>
                Because all bookings are made through WhatsApp conversations, we
                collect only the information you voluntarily share with us during
                that conversation. This typically includes:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  <strong>Name</strong> — so we can address you and identify your
                  booking.
                </li>
                <li>
                  <strong>WhatsApp phone number</strong> — to communicate with you,
                  confirm your booking, and send pickup reminders.
                </li>
                <li>
                  <strong>Number of participants and ages</strong> — to prepare the
                  correct vehicle, pricing, and safety arrangements.
                </li>
                <li>
                  <strong>Hotel name and area</strong> — for pickup coordination.
                </li>
                <li>
                  <strong>Dietary requirements or medical notes</strong> — only if
                  you choose to share them to help us accommodate your needs.
                </li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> collect payment card numbers, passport
                details, or any government identification through WhatsApp. Payment
                is collected in cash or via approved payment links at the time of
                the tour.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                3. How We Use Your Information
              </h2>
              <p>We use your personal information solely to:</p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>Confirm your booking and issue itinerary details.</li>
                <li>
                  Coordinate hotel pickup and drop-off logistics with our drivers.
                </li>
                <li>
                  Contact you before the tour with timing, meeting-point, and
                  preparation information.
                </li>
                <li>
                  Follow up after the tour to ask for feedback (optional, you may
                  ignore this message at any time).
                </li>
                <li>
                  Comply with UAE tourism regulations where applicable.
                </li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> sell, rent, or share your personal
                information with third-party marketers. Your data is never used for
                automated profiling or decision-making.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                4. Legal Basis for Processing
              </h2>
              <p>
                Where UAE Federal Decree-Law No. 45 of 2021 on Personal Data
                Protection (PDPL) or other applicable laws apply, we process your
                personal data on the following bases:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  <strong>Contractual necessity</strong> — processing required to
                  fulfil your tour booking.
                </li>
                <li>
                  <strong>Legitimate interests</strong> — operational coordination
                  with drivers and camp partners.
                </li>
                <li>
                  <strong>Legal obligation</strong> — where required by UAE
                  authorities or tourism regulators.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                5. Data Sharing
              </h2>
              <p>
                Your information is shared only with our trusted operational
                partners who need it to deliver your experience:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  Our drivers and camp ground operators — for pickup and activity
                  coordination.
                </li>
                <li>
                  WhatsApp (Meta Platforms) — as the messaging platform through
                  which you communicate with us. WhatsApp&rsquo;s own privacy
                  policy governs their handling of message metadata.
                </li>
              </ul>
              <p className="mt-3">
                All partners are instructed to use your data only for the purpose
                of delivering the booked experience and must not retain it after
                the tour is complete.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain booking-related data for up to 12 months after your tour
                date, primarily in case of disputes or refund requests. WhatsApp
                chat history is subject to WhatsApp&rsquo;s own retention rules
                and your device settings. You may request deletion of your data at
                any time — see Section 8 below.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                7. Cookies and Website Tracking
              </h2>
              <p>
                Our website (mydubaisafari.com) is a static brochure site. We do
                not use tracking cookies, third-party analytics, or advertising
                networks. If this changes, we will update this policy accordingly
                and provide a cookie notice.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                8. Your Rights
              </h2>
              <p>
                Under applicable UAE data protection law, you have the right to:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>
                  <strong>Access</strong> — request a copy of the personal data we
                  hold about you.
                </li>
                <li>
                  <strong>Correction</strong> — ask us to correct inaccurate data.
                </li>
                <li>
                  <strong>Deletion</strong> — request we delete your data (subject
                  to any legal retention requirements).
                </li>
                <li>
                  <strong>Objection</strong> — object to processing based on
                  legitimate interests.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please message us on WhatsApp at{" "}
                {SITE.whatsappDisplay} or email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-gold underline hover:text-orange transition-colors"
                >
                  {SITE.email}
                </a>
                . We will respond within 14 business days.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                9. Security
              </h2>
              <p>
                We take reasonable precautions to protect your information,
                including limiting access to booking data to staff who need it.
                However, no method of electronic communication is 100% secure. If
                you have concerns about the security of your data, please contact
                us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. The most
                recent version will always be available on this page with an
                updated &ldquo;Last updated&rdquo; date at the top.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                11. Contact Us
              </h2>
              <p>
                For any privacy-related questions or requests, please contact us:
              </p>
              <address className="mt-3 not-italic space-y-1 text-midnight/70">
                <p>MyDubaiSafari</p>
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
