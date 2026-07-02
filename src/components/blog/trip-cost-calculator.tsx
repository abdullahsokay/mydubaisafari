"use client";

import { useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";

// Per-night-per-room AED rates (assumes 2 travellers share 1 room)
const ACCOMMODATION_RATES: Record<string, number> = {
  budget: 250,
  midrange: 600,
  luxury: 1500,
};

// Per-person-per-day AED rates for tours & activities
const ACTIVITY_RATES: Record<string, number> = {
  light: 150,
  moderate: 350,
  adventure: 600,
};

// Fixed per-person-per-day AED for food & transport
const FOOD_TRANSPORT_PER_PERSON_PER_DAY = 200;

// Fixed exchange rate
const AED_TO_USD = 0.27;

type AccomTier = "budget" | "midrange" | "luxury";
type ActivityLevel = "light" | "moderate" | "adventure";

export function TripCostCalculator() {
  const [nights, setNights] = useState(4);
  const [travellers, setTravellers] = useState(2);
  const [accomTier, setAccomTier] = useState<AccomTier>("midrange");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const rooms = Math.ceil(travellers / 2);
  const accomTotal = ACCOMMODATION_RATES[accomTier] * rooms * nights;
  const activitiesTotal = ACTIVITY_RATES[activityLevel] * travellers * nights;
  const foodTransportTotal = FOOD_TRANSPORT_PER_PERSON_PER_DAY * travellers * nights;
  const grandTotal = accomTotal + activitiesTotal + foodTransportTotal;
  const grandTotalUsd = Math.round(grandTotal * AED_TO_USD);

  const waMessage = whatsappUrl(
    `Hi! I’d like a quote for a ${nights}-night Dubai trip for ${travellers} traveller${travellers !== 1 ? "s" : ""}.`
  );

  const accomLabels: Record<AccomTier, string> = {
    budget: "Budget (~AED 250/room/night)",
    midrange: "Mid-range (~AED 600/room/night)",
    luxury: "Luxury (~AED 1,500/room/night)",
  };

  const activityLabels: Record<ActivityLevel, string> = {
    light: "Light (~AED 150/person/day)",
    moderate: "Moderate (~AED 350/person/day)",
    adventure: "Adventure-packed (~AED 600/person/day)",
  };

  return (
    <div className="rounded-2xl bg-surface ring-1 ring-black/5 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-midnight px-6 py-5 flex items-center gap-3">
        <Calculator className="h-5 w-5 text-gold" />
        <div>
          <Badge tone="gold" className="mb-1">Trip Planner</Badge>
          <h2 className="font-heading text-xl font-bold text-white leading-tight">
            Trip Cost Calculator
          </h2>
        </div>
      </div>

      <div className="p-6 grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Nights */}
          <div>
            <label className="block text-sm font-semibold text-midnight mb-1.5">
              Number of Nights
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={nights}
              onChange={(e) => setNights(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-midnight/45 bg-white px-4 py-2.5 text-midnight focus:outline-none focus:ring-2 focus:ring-orange/60 focus:border-orange"
            />
          </div>

          {/* Travellers */}
          <div>
            <label className="block text-sm font-semibold text-midnight mb-1.5">
              Number of Travellers
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={travellers}
              onChange={(e) => setTravellers(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-midnight/45 bg-white px-4 py-2.5 text-midnight focus:outline-none focus:ring-2 focus:ring-orange/60 focus:border-orange"
            />
          </div>

          {/* Accommodation */}
          <div>
            <label className="block text-sm font-semibold text-midnight mb-2">
              Accommodation Tier
            </label>
            <div className="space-y-2">
              {(Object.keys(ACCOMMODATION_RATES) as AccomTier[]).map((tier) => (
                <label
                  key={tier}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-2.5 cursor-pointer transition-colors",
                    accomTier === tier
                      ? "border-gold bg-gold/10 text-midnight"
                      : "border-midnight/10 bg-white text-midnight/70 hover:border-gold/40"
                  )}
                >
                  <input
                    type="radio"
                    name="accom"
                    value={tier}
                    checked={accomTier === tier}
                    onChange={() => setAccomTier(tier)}
                    className="accent-gold"
                  />
                  <span className="text-sm">{accomLabels[tier]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-semibold text-midnight mb-2">
              Tours &amp; Activities Level
            </label>
            <div className="space-y-2">
              {(Object.keys(ACTIVITY_RATES) as ActivityLevel[]).map((level) => (
                <label
                  key={level}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-2.5 cursor-pointer transition-colors",
                    activityLevel === level
                      ? "border-gold bg-gold/10 text-midnight"
                      : "border-midnight/10 bg-white text-midnight/70 hover:border-gold/40"
                  )}
                >
                  <input
                    type="radio"
                    name="activity"
                    value={level}
                    checked={activityLevel === level}
                    onChange={() => setActivityLevel(level)}
                    className="accent-gold"
                  />
                  <span className="text-sm">{activityLabels[level]}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {/* Breakdown */}
          <div className="rounded-2xl bg-white ring-1 ring-black/5 p-5 space-y-3">
            <h3 className="font-heading font-semibold text-midnight text-base mb-3">
              Cost Breakdown
            </h3>

            <div className="flex justify-between text-sm text-midnight/75">
              <span>Accommodation ({rooms} room{rooms !== 1 ? "s" : ""} × {nights} nights)</span>
              <span className="font-medium text-midnight">AED {accomTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-midnight/75">
              <span>Tours &amp; Activities ({travellers} pax × {nights} days)</span>
              <span className="font-medium text-midnight">AED {activitiesTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-midnight/75">
              <span>Food &amp; Transport (AED 200/person/day)</span>
              <span className="font-medium text-midnight">AED {foodTransportTotal.toLocaleString()}</span>
            </div>

            <div className="border-t border-midnight/10 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-midnight">Estimated Total</span>
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-goldink">
                    AED {grandTotal.toLocaleString()}
                  </div>
                  <div className="text-sm text-midnight/75">
                    ≈ USD {grandTotalUsd.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Per-person note */}
          <p className="text-xs text-midnight/75 px-1">
            Per person: AED {Math.round(grandTotal / travellers).toLocaleString()} · Based on {travellers} traveller{travellers !== 1 ? "s" : ""} in {rooms} room{rooms !== 1 ? "s" : ""}
          </p>

          {/* CTA */}
          <div className="rounded-2xl bg-midnight/5 border border-midnight/10 p-4 space-y-3">
            <p className="text-xs text-midnight/75">
              <span className="font-semibold text-midnight">Rough estimate</span> — contact us on WhatsApp for an exact quote tailored to your dates and preferences.
            </p>
            <a
              href={waMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#1a7f40] px-5 py-3 text-sm font-semibold text-white hover:bg-[#155f30] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Get an Exact Quote on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
