"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import type { Tour } from "@/lib/catalog/types";

interface BookingFormProps {
  tour: Tour;
}

function Stepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-midnight/70">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex size-8 items-center justify-center rounded-full border border-midnight/45 text-midnight/75 transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-midnight">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex size-8 items-center justify-center rounded-full border border-midnight/45 text-midnight/75 transition-colors hover:border-gold hover:text-gold"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function BookingForm({ tour }: BookingFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [foodPref, setFoodPref] = useState("No preference");
  const [foodNotes, setFoodNotes] = useState("");
  const [medicalNeeds, setMedicalNeeds] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const isValid =
    date !== "" && adults >= 1 && pickup.trim() !== "" && name.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const peopleStr = [
      `${adults} adult${adults !== 1 ? "s" : ""}`,
      children > 0 ? `${children} child${children !== 1 ? "ren" : ""}` : null,
      infants > 0 ? `${infants} infant${infants !== 1 ? "s" : ""}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    const foodStr = foodNotes.trim()
      ? `${foodPref}, ${foodNotes.trim()}`
      : foodPref;

    const message = [
      "New Booking Inquiry — MyDubaiSafarii",
      `Service: ${tour.name}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `People: ${peopleStr}`,
      `Pickup: ${pickup}`,
      `Drop-off: ${dropoff.trim() || "-"}`,
      `Food: ${foodStr}`,
      `Medical/Special needs: ${medicalNeeds.trim() || "None"}`,
      `Name: ${name}`,
      `Phone: ${phone.trim() || "-"}`,
    ].join("\n");

    const url = whatsappUrl(message);
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-4xl">💬</div>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-midnight">
            Opening WhatsApp…
          </h2>
          <p className="mt-2 text-midnight/75">
            Thank you, {name}! We&apos;ve opened WhatsApp with your inquiry
            pre-filled. If it didn&apos;t open automatically,{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline"
            >
              tap here to open WhatsApp
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-midnight/50">
            We&apos;ll confirm price &amp; availability and get back to you
            shortly.
          </p>
          <Link
            href="/tours"
            className="mt-6 inline-block text-orange hover:underline text-sm"
          >
            ← Browse more tours
          </Link>
        </div>
      </div>
    );
  }

  const total =
    adults * tour.priceAdult +
    children * tour.priceChild +
    infants * tour.priceInfant;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Mobile fixed bottom CTA bar (hidden on lg+) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-midnight/10 bg-surface/95 backdrop-blur px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-midnight/60 leading-tight">Estimated total</p>
          <p className="text-base font-bold text-midnight">
            {tour.currency} {total.toLocaleString()}
          </p>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid}
          className="shrink-0"
        >
          Send on WhatsApp
        </Button>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_360px] pb-28 lg:pb-0">
        {/* Left: Form sections */}
        <div className="space-y-6">
          {/* Service */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Service
            </h2>
            <p className="mt-3 rounded-xl border border-midnight/10 bg-sand px-4 py-3 text-sm font-medium text-midnight">
              {tour.name}
            </p>
          </section>

          {/* Date & Time & Guests */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Date, Time &amp; Guests
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Tour date <span className="text-orange">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Preferred time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Stepper
                label="Adults"
                value={adults}
                min={1}
                onChange={setAdults}
              />
              <Stepper
                label="Children (3–12)"
                value={children}
                min={0}
                onChange={setChildren}
              />
              <Stepper
                label="Infants (0–2)"
                value={infants}
                min={0}
                onChange={setInfants}
              />
            </div>
          </section>

          {/* Pickup & Drop-off */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Pickup &amp; Drop-off
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pickup"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Pickup location <span className="text-orange">*</span>
                </label>
                <input
                  id="pickup"
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Dubai Marina, hotel name…"
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoff"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Drop-off location{" "}
                  <span className="text-midnight/40">(optional)</span>
                </label>
                <input
                  id="dropoff"
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Same as pickup if blank"
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Food preference */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Food Preference
            </h2>
            <div className="mt-4">
              <label
                htmlFor="food-pref"
                className="block text-sm font-medium text-midnight/70"
              >
                Diet
              </label>
              <select
                id="food-pref"
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
              >
                <option>No preference</option>
                <option>Vegetarian</option>
                <option>Non-vegetarian</option>
                <option>Vegan</option>
                <option>Halal</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="food-notes"
                className="block text-sm font-medium text-midnight/70"
              >
                Additional food notes{" "}
                <span className="text-midnight/40">(optional)</span>
              </label>
              <input
                id="food-notes"
                type="text"
                value={foodNotes}
                onChange={(e) => setFoodNotes(e.target.value)}
                placeholder="e.g. nut allergy, no pork…"
                className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
              />
            </div>
          </section>

          {/* Medical / special needs */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Medical &amp; Special Needs
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              Please tell us about any medication, allergies, mobility or
              accessibility requirements. We want to ensure everyone has a safe
              and comfortable experience.
            </p>
            <label
              htmlFor="medical-needs"
              className="sr-only"
            >
              Medical and special needs
            </label>
            <textarea
              id="medical-needs"
              rows={3}
              value={medicalNeeds}
              onChange={(e) => setMedicalNeeds(e.target.value)}
              placeholder="e.g. wheelchair user, carries EpiPen, fear of heights… or leave blank if none."
              className="mt-3 w-full resize-none rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
            />
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Your Details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Your name <span className="text-orange">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-midnight/70"
                >
                  Your phone{" "}
                  <span className="text-midnight/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 000 0000"
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Sticky summary */}
        <aside>
          <div className="sticky top-24 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-lg font-semibold text-midnight">
              Booking Summary
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex justify-between text-midnight/70">
                <span>Service</span>
                <span className="max-w-[180px] text-right font-medium text-midnight">
                  {tour.name}
                </span>
              </li>
              {date && (
                <li className="flex justify-between text-midnight/70">
                  <span>Date</span>
                  <span className="font-medium text-midnight">{date}</span>
                </li>
              )}
              <li className="flex justify-between text-midnight/70">
                <span>Time</span>
                <span className="font-medium text-midnight">{time}</span>
              </li>
              <li className="flex justify-between text-midnight/70">
                <span>Guests</span>
                <span className="font-medium text-midnight">
                  {adults} adult{adults !== 1 ? "s" : ""}
                  {children > 0
                    ? `, ${children} child${children !== 1 ? "ren" : ""}`
                    : ""}
                  {infants > 0
                    ? `, ${infants} infant${infants !== 1 ? "s" : ""}`
                    : ""}
                </span>
              </li>
              {pickup && (
                <li className="flex justify-between text-midnight/70">
                  <span>Pickup</span>
                  <span className="max-w-[180px] text-right font-medium text-midnight">
                    {pickup}
                  </span>
                </li>
              )}
              <li className="flex justify-between text-midnight/70">
                <span>Food</span>
                <span className="font-medium text-midnight">{foodPref}</span>
              </li>
            </ul>

            <div
              className={cn(
                "mt-4 rounded-xl border border-midnight/10 bg-sand p-3 text-xs text-midnight/60",
              )}
            >
              We&apos;ll confirm price &amp; availability on WhatsApp.
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!isValid}
              className="mt-6 w-full"
            >
              Send Booking on WhatsApp
            </Button>

            {!isValid && (
              <p className="mt-2 text-center text-xs text-midnight/70">
                Please set a date, pickup location, and your name
              </p>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
