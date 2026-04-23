"use client";
import { useState } from "react";
import ConstructionStepper from "./ConstructionStepper";
import { MEDIATRICE_STEPS, BISSECTRICE_STEPS, ANGLE60_STEPS } from "@/lib/geometry";

const CONSTRUCTIONS = [
  {
    id: "mediatrice" as const,
    label: "Médiatrice",
    color: "#059669",
    definition:
      "La médiatrice d'un segment est la droite perpendiculaire à ce segment passant par son milieu.",
    tool: "compas + règle",
  },
  {
    id: "bissectrice" as const,
    label: "Bissectrice",
    color: "#7C3AED",
    definition:
      "La bissectrice d'un angle est la demi-droite qui partage cet angle en deux angles égaux.",
    tool: "compas + règle",
  },
  {
    id: "angle60" as const,
    label: "Angle de 60°",
    color: "#0284C7",
    definition:
      "Un angle de 60° se construit exactement à la règle et au compas en formant un triangle équilatéral.",
    tool: "compas + règle non graduée",
  },
] as const;

export default function ConstructionsContent() {
  const [active, setActive] = useState<"mediatrice" | "bissectrice" | "angle60">("mediatrice");

  const current = CONSTRUCTIONS.find((c) => c.id === active)!;
  const steps = active === "mediatrice" ? MEDIATRICE_STEPS : active === "bissectrice" ? BISSECTRICE_STEPS : ANGLE60_STEPS;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Constructions à la règle et au compas
        </h2>
        <p className="text-sm text-gray-500">
          Suis les étapes pour apprendre à tracer chaque figure avec précision.
        </p>
      </div>

      {/* Construction selector */}
      <div className="flex gap-2 mb-6">
        {CONSTRUCTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className="px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
            style={
              active === c.id
                ? { background: c.color, color: "#fff" }
                : { background: "#F1F5F9", color: "#475569" }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Definition box */}
      <div
        className="rounded-xl p-4 mb-6 border text-sm"
        style={{
          background: `${current.color}10`,
          borderColor: `${current.color}30`,
        }}
      >
        <span className="font-semibold" style={{ color: current.color }}>
          Définition —{" "}
        </span>
        <span className="text-gray-700">{current.definition}</span>
        <span className="ml-2 text-xs text-gray-400 italic">
          (outils : {current.tool})
        </span>
      </div>

      {/* Step-by-step construction — key={active} force le reset à l'étape 1 au changement */}
      <ConstructionStepper key={active} type={active} steps={steps} color={current.color} />

      {/* Tip */}
      <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
        <span className="font-semibold">💡 Conseil : </span>
        clique sur les points de progression pour naviguer librement entre les étapes.
      </div>
    </div>
  );
}
