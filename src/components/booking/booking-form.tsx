"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import type { Tour } from "@/lib/catalog/types";
import { ADDONS } from "@/lib/catalog/addons";

interface BookingFormProps {
  tour: Tour;
}

type AddonSelection = { optionIndex: number; qty: number };

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
  const [selectedAddons, setSelectedAddons] = useState<
    Record<string, AddonSelection>
  >({});

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = { optionIndex: 0, qty: 1 };
      return next;
    });
  const setAddonOption = (id: string, optionIndex: number) =>
    setSelectedAddons((prev) => ({ ...prev, [id]: { ...prev[id], optionIndex } }));
  const setAddonQty = (id: string, qty: number) =>
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: Math.max(1, qty) },
    }));

  // Base price: per-person packages multiply by guests; private/per-vehicle is flat.
  const isPerPerson = !tour.priceUnit || tour.priceUnit === "person";
  const basePrice = isPerPerson
    ? adults * tour.priceAdult +
      children * tour.priceChild +
      infants * tour.priceInfant
    : tour.priceAdult;

  const addonLines = ADDONS.flatMap((a) => {
    const sel = selectedAddons[a.id];
    if (!sel) return [];
    const opt = a.options[sel.optionIndex];
    return [
      {
        name: a.name,
        optLabel: opt.label,
        qty: sel.qty,
        lineTotal: opt.price * sel.qty,
      },
    ];
  });
  const addonsTotal = addonLines.reduce((s, l) => s + l.lineTotal, 0);
  const total = basePrice + addonsTotal;

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

    // WhatsApp renders *bold* / _italic_; emojis + dividers make the plain-text
    // prefill read like a structured booking card in the chat.
    const divider = "━━━━━━━━━━━━━━";
    const addonsBlock = addonLines.length
      ? [
          "🎯 *Add-ons*",
          ...addonLines.map(
            (l) =>
              `   • ${l.name} (${l.optLabel}) ×${l.qty} — AED ${l.lineTotal.toLocaleString()}`,
          ),
        ].join("\n")
      : null;

    const message = [
      "🏜️ *New Booking Inquiry — MyDubaiSafarii*",
      divider,
      `📦 *${tour.name}*`,
      `💰 Package: AED ${basePrice.toLocaleString()} _(${tour.priceUnit ?? "per person"})_`,
      "",
      `📅 Date: ${date}`,
      `⏰ Time: ${time}`,
      `👥 Guests: ${peopleStr}`,
      "",
      `📍 Pickup: ${pickup}`,
      `🏁 Drop-off: ${dropoff.trim() || "Same as pickup"}`,
      `🍽️ Food: ${foodStr}`,
      `🩺 Medical/Special needs: ${medicalNeeds.trim() || "None"}`,
      addonsBlock ? "" : null,
      addonsBlock,
      divider,
      `💵 *Estimated total: AED ${total.toLocaleString()}*`,
      "_(final price confirmed on WhatsApp)_",
      "",
      `🙍 Name: ${name}`,
      `📞 Phone: ${phone.trim() || "-"}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = whatsappUrl(message);
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-surface p-8 shadow-luxe-lg ring-1 ring-midnight/8">
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Mobile fixed bottom CTA bar (hidden on lg+) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-gold/30 bg-surface/95 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-[0_-10px_30px_-12px_rgba(126,60,27,0.4)]">
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
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
              Service
            </h2>
            <p className="mt-3 rounded-xl border border-midnight/10 bg-sand px-4 py-3 text-sm font-medium text-midnight">
              {tour.name}
            </p>
          </section>

          {/* Date & Time & Guests */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
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

          {/* Adventure add-ons */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
              Adventure Add-ons{" "}
              <span className="text-sm font-normal text-midnight/45">
                (optional)
              </span>
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              Add a quad bike or buggy blast (30 min each) to your safari — final
              price confirmed on WhatsApp.
            </p>
            <div className="mt-4 space-y-3">
              {ADDONS.map((a) => {
                const sel = selectedAddons[a.id];
                const checked = !!sel;
                return (
                  <div
                    key={a.id}
                    className="rounded-xl border border-midnight/15 bg-sand p-3"
                  >
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(a.id)}
                        className="mt-0.5 size-4 accent-orange"
                        aria-label={`Add ${a.name}`}
                      />
                      <span className="min-w-0">
                        <span className="text-sm font-medium text-midnight">
                          {a.name}
                        </span>
                        <span className="block text-xs text-midnight/60">
                          {a.durationMin} min · {a.priceLabel}
                          {a.note ? ` · ${a.note}` : ""}
                        </span>
                      </span>
                    </label>
                    {checked && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3 pl-6">
                        <label className="flex items-center gap-2 text-xs text-midnight/70">
                          Option
                          <select
                            value={sel.optionIndex}
                            onChange={(e) =>
                              setAddonOption(a.id, Number(e.target.value))
                            }
                            aria-label={`${a.name} option`}
                            className="rounded-lg border border-midnight/45 bg-surface px-2 py-1 text-sm text-midnight focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                          >
                            {a.options.map((o, i) => (
                              <option key={i} value={i}>
                                {o.label} — AED {o.price.toLocaleString()}
                              </option>
                            ))}
                          </select>
                        </label>
                        <div className="w-32">
                          <Stepper
                            label="Qty"
                            value={sel.qty}
                            min={1}
                            onChange={(v) => setAddonQty(a.id, v)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pickup & Drop-off */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Food preference */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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
                className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
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
                className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
              />
            </div>
          </section>

          {/* Medical / special needs */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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
              className="mt-3 w-full resize-none rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
            />
          </section>

          {/* Contact */}
          <section className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe ring-1 ring-midnight/8">
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
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
                  className="mt-1.5 w-full rounded-xl border border-midnight/45 bg-sand px-4 py-2.5 text-sm text-midnight transition-colors hover:border-goldink placeholder:text-midnight/30 focus:border-orange focus:ring-2 focus:ring-orange/60 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Sticky summary */}
        <aside>
          <div className="sticky top-24 relative overflow-hidden rounded-2xl bg-surface p-6 shadow-luxe-lg ring-1 ring-midnight/8">
            {/* Gold gradient hairline crown */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-brand-gradient"
            />
            <h2 className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-midnight">
              <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand-gradient" />
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

            {/* Price breakdown */}
            <div className="mt-4 space-y-2 border-t border-midnight/10 pt-4 text-sm">
              <div className="flex justify-between text-midnight/70">
                <span>Package</span>
                <span className="font-medium text-midnight">
                  AED {basePrice.toLocaleString()}
                  <span className="ml-1 text-xs text-midnight/50">
                    {isPerPerson ? "· per person" : "· private"}
                  </span>
                </span>
              </div>
              {addonLines.map((l, i) => (
                <div key={i} className="flex justify-between text-midnight/70">
                  <span className="max-w-[190px] truncate">
                    {l.name} ({l.optLabel}) ×{l.qty}
                  </span>
                  <span className="font-medium text-midnight">
                    AED {l.lineTotal.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="mt-1 flex items-baseline justify-between rounded-xl bg-linear-to-r from-palegold/45 to-sand px-3 py-2.5 text-base font-bold text-midnight ring-1 ring-gold/25">
                <span>Estimated total</span>
                <span className="font-heading text-lg">
                  AED {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "mt-4 rounded-xl border border-midnight/10 bg-sand p-3 text-xs text-midnight/60",
              )}
            >
              We&apos;ll confirm the final price &amp; availability on WhatsApp.
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
