"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Wind,
  Thermometer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
}

function getCondition(code: number): { label: string; Icon: React.ElementType } {
  if (code === 0) return { label: "Clear sky", Icon: Sun };
  if (code <= 3) return { label: "Partly cloudy", Icon: CloudSun };
  if (code === 45 || code === 48) return { label: "Foggy", Icon: Cloud };
  if (code >= 51 && code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code >= 80 && code <= 82) return { label: "Showers", Icon: CloudRain };
  if (code >= 95 && code <= 99) return { label: "Thunderstorm", Icon: CloudLightning };
  return { label: "Cloudy", Icon: Cloud };
}

export function DubaiWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FDubai"
    )
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => {
        const c = data.current;
        setWeather({
          temperature: Math.round(c.temperature_2m),
          apparentTemperature: Math.round(c.apparent_temperature),
          weatherCode: c.weather_code,
          windSpeed: Math.round(c.wind_speed_10m),
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const { label, Icon } = weather
    ? getCondition(weather.weatherCode)
    : { label: "", Icon: Sun };

  return (
    <div className="rounded-2xl bg-midnight text-white overflow-hidden shadow-sm ring-1 ring-white/10 h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-white/10">
        <p className="text-xs font-medium uppercase tracking-widest text-gold/80">Live</p>
        <h3 className="font-heading text-lg font-bold text-white leading-tight">Dubai now</h3>
      </div>

      <div className="px-5 py-5">
        {loading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-10 w-24 rounded-lg bg-white/10" />
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="h-3 w-28 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/10" />
          </div>
        )}

        {error && !loading && (
          <p className="text-sm text-white/50">Weather unavailable</p>
        )}

        {weather && !loading && (
          <div className="space-y-4">
            {/* Temp + icon */}
            <div className="flex items-center gap-3">
              <Icon
                className={cn(
                  "h-10 w-10 shrink-0",
                  weather.weatherCode === 0 ? "text-gold" : "text-white/70"
                )}
              />
              <div>
                <div className="font-heading text-4xl font-bold text-white leading-none">
                  {weather.temperature}°C
                </div>
                <div className="text-sm text-white/60 mt-0.5">{label}</div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Thermometer className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>Feels like {weather.apparentTemperature}°C</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Wind className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>Wind {weather.windSpeed} km/h</span>
              </div>
            </div>

            <p className="text-[10px] text-white/30 leading-tight">
              Source: Open-Meteo · Updates on page load
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
