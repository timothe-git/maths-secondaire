"use client";
import { useState } from "react";
import GeometryCanvas from "./GeometryCanvas";
import type { Step, ConstructionType } from "@/lib/geometry";

type Props = {
  type: ConstructionType;
  steps: Step[];
  color: string;
};

export default function ConstructionStepper({ type, steps, color }: Props) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Canvas */}
      <div className="bg-[#F8FAFF] flex justify-center items-center p-4 border-b border-gray-100">
        <GeometryCanvas type={type} visibles={current.show} />
      </div>

      {/* Step panel */}
      <div className="p-6">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-4 tracking-wide"
          style={{ background: color }}
        >
          Étape {step + 1} / {steps.length}
        </span>

        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
          {current.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "Georgia, serif" }}>
          {current.desc}
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                i === step ? "scale-125" : "bg-gray-200 hover:bg-gray-300"
              }`}
              style={i === step ? { background: color } : {}}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ← Précédent
          </button>
          <button
            disabled={step === steps.length - 1}
            onClick={() => setStep((s) => s + 1)}
            className="flex-1 py-2.5 px-4 rounded-xl border-2 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            style={{ borderColor: color, color }}
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
