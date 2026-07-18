import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SITE, whatsappUrl, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "MyDubaiSafarii's cancellation and refund policy for desert safari and adventure tours booked via WhatsApp.",
  alternates: { canonical: `${SITE_URL}/policy/cancellation` },
};

const LAST_UPDATED = "1 July 2026";

const waHref = whatsappUrl(
  "Hi! I need to cancel or reschedule my booking. My booking details are:",
);

export default function CancellationPolicyPage() {
  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            Cancellation Policy
          </h1>
          <p className="mt-2 text-sm text-midnight/50">
            Last updated: {LAST_UPDATED}
          </p>

          <p className="mt-6 text-midnight/70 leading-relaxed">
            We understand plans can change. Below is our cancellation and refund
            policy for all tours booked with MyDubaiSafarii. If you need to
            cancel or reschedule, please message us on WhatsApp at{" "}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline hover:text-orange transition-colors font-medium"
            >
              {SITE.whatsappDisplay}
            </a>{" "}
            as early as possible.
          </p>

          <div className="mt-10 space-y-10 text-midnight/80 leading-relaxed">
            {/* Summary table */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-4">
                At a Glance
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-midnight/10 bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-midnight/10 bg-sand">
                      <th className="px-5 py-3 text-left font-heading font-semibold text-midnight">
                        Tour Type
                      </th>
                      <th className="px-5 py-3 text-left font-heading font-semibold text-midnight">
                        Free Cancellation Window
                      </th>
                      <th className="px-5 py-3 text-left font-heading font-semibold text-midnight">
                        Within Window / No-Show
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        type: "Evening Desert Safari",
                        window: "Up to 24 hours before",
                        late: "No refund",
                      },
                      {
                        type: "Morning Desert Safari",
                        window: "Up to 24 hours before",
                        late: "No refund",
                      },
                      {
                        type: "Desert Quad Bike Adventure",
                        window: "Up to 24 hours before",
                        late: "No refund",
                      },
                      {
                        type: "Dune Buggy Desert Adventure",
                        window: "Up to 24 hours before",
                        late: "No refund",
                      },
                      {
                        type: "Overnight Desert Safari & Camping",
                        window: "Up to 48 hours before",
                        late: "No refund",
                      },
                      {
                        type: "Private VIP Desert Safari",
                        window: "Up to 48 hours before",
                        late: "No refund",
                      },
                    ].map((row, i) => (
                      <tr
                        key={row.type}
                        className={
                          i % 2 === 0 ? "bg-surface" : "bg-sand/40"
                        }
                      >
                        <td className="px-5 py-3 font-medium text-midnight">
                          {row.type}
                        </td>
                        <td className="px-5 py-3 text-midnight/70">
                          {row.window}
                        </td>
                        <td className="px-5 py-3 text-clay font-medium">
                          {row.late}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Standard Tours (24-Hour Window)
              </h2>
              <p>
                For the following tours, you may cancel free of charge up to{" "}
                <strong>24 hours before the scheduled start time</strong>:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>Evening Desert Safari with BBQ Dinner</li>
                <li>Morning Desert Safari &amp; Dune Bashing</li>
                <li>Desert Quad Bike Adventure</li>
                <li>Dune Buggy Desert Adventure</li>
              </ul>
              <p className="mt-3">
                Cancellations made less than 24 hours before the tour start time,
                or failure to appear at the pickup location, will be charged in
                full (100% of the tour price). No partial refunds are available
                for late cancellations.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Premium &amp; Overnight Tours (48-Hour Window)
              </h2>
              <p>
                Due to the additional logistics, staffing, and camp setup involved,
                the following tours require a longer notice period:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>Overnight Desert Safari &amp; Camping</li>
                <li>Private VIP Desert Safari</li>
              </ul>
              <p className="mt-3">
                You may cancel free of charge up to{" "}
                <strong>48 hours before the scheduled start time</strong>.
                Cancellations within 48 hours of the tour, or no-shows, will be
                charged in full.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                How to Cancel or Reschedule
              </h2>
              <p>
                All cancellation and reschedule requests must be submitted via
                WhatsApp message to{" "}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline hover:text-orange transition-colors font-medium"
                >
                  {SITE.whatsappDisplay}
                </a>
                . Please include:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>Your full name and booking date.</li>
                <li>The name of the tour you booked.</li>
                <li>Whether you wish to cancel or reschedule.</li>
              </ul>
              <p className="mt-3">
                Your cancellation is only confirmed once you receive a written
                acknowledgement from our team. A WhatsApp message alone to the
                number above initiates the process; please wait for our
                confirmation.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Rescheduling
              </h2>
              <p>
                If you need to change your tour date rather than cancel, we are
                happy to reschedule subject to availability, provided the request
                is made within the free-cancellation window (24 or 48 hours as
                applicable). Rescheduling requests made outside this window are at
                our discretion and may be subject to an administration fee.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Cancellation by MyDubaiSafarii
              </h2>
              <p>
                If we cancel a tour for any reason — including adverse weather,
                sandstorm warnings, government restrictions, or force-majeure
                events — we will notify you as soon as possible via WhatsApp and
                offer either:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                <li>A full refund of any amount paid, or</li>
                <li>
                  A reschedule to a date of your choice, subject to availability.
                </li>
              </ul>
              <p className="mt-3">
                We are not responsible for any consequential losses (e.g., hotel
                costs, flights) arising from our cancellation.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Refund Processing
              </h2>
              <p>
                Where a refund is due, we will process it within 5–7 business days
                to the original payment method. Timing may vary depending on your
                bank or payment provider.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-midnight mb-3">
                Questions?
              </h2>
              <p>
                If you have any questions about our cancellation policy, please
                contact us:
              </p>
              <address className="mt-3 not-italic space-y-1 text-midnight/70">
                <p>WhatsApp: {SITE.whatsappDisplay}</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-gold underline hover:text-orange transition-colors"
                  >
                    {SITE.email}
                  </a>
                </p>
              </address>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
