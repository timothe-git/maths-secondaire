"use client";
import { useState } from "react";

type Tab = "cours" | "exercices" | "quiz";

const tabs: { id: Tab; label: string; color: string; activeColor: string }[] = [
  {
    id: "cours",
    label: "Cours",
    color: "text-green-700 hover:bg-green-50",
    activeColor: "bg-green-100 text-green-800 font-semibold",
  },
  {
    id: "exercices",
    label: "Exercices",
    color: "text-orange-700 hover:bg-orange-50",
    activeColor: "bg-orange-100 text-orange-800 font-semibold",
  },
  {
    id: "quiz",
    label: "Quiz",
    color: "text-violet-700 hover:bg-violet-50",
    activeColor: "bg-violet-100 text-violet-800 font-semibold",
  },
];

type Props = {
  titre: string;
  niveau: string;
  niveauLabel: string;
};

export default function ChapterView({ titre, niveau, niveauLabel }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("cours");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2 text-sm text-gray-500">
        Mathématiques &rsaquo; {niveauLabel} &rsaquo; {titre}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{titre}</h1>

      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              activeTab === tab.id ? tab.activeColor : tab.color
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-64">
        {activeTab === "cours" && <CoursPlaceholder />}
        {activeTab === "exercices" && <ExercicesPlaceholder />}
        {activeTab === "quiz" && <QuizPlaceholder />}
      </div>
    </div>
  );
}

function CoursPlaceholder() {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-4">📖</div>
      <p className="font-medium text-gray-500">Cours bientôt disponible</p>
      <p className="text-sm mt-1">La théorie sera ajoutée prochainement.</p>
    </div>
  );
}

function ExercicesPlaceholder() {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-4">✏️</div>
      <p className="font-medium text-gray-500">Exercices bientôt disponibles</p>
      <p className="text-sm mt-1">
        Les exercices et correctifs seront ajoutés prochainement.
      </p>
    </div>
  );
}

function QuizPlaceholder() {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-4">🎯</div>
      <p className="font-medium text-gray-500">Quiz bientôt disponible</p>
      <p className="text-sm mt-1">Le quiz sera ajouté prochainement.</p>
    </div>
  );
}
