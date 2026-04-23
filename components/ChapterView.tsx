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
  coursContent?: React.ReactNode;
  exercicesContent?: React.ReactNode;
  quizContent?: React.ReactNode;
};

export default function ChapterView({
  titre,
  niveauLabel,
  coursContent,
  exercicesContent,
  quizContent,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("cours");

  const content: Record<Tab, React.ReactNode> = {
    cours: coursContent ?? <Placeholder icon="📖" label="Cours bientôt disponible" sub="La théorie sera ajoutée prochainement." />,
    exercices: exercicesContent ?? <Placeholder icon="✏️" label="Exercices bientôt disponibles" sub="Les exercices et correctifs seront ajoutés prochainement." />,
    quiz: quizContent ?? <Placeholder icon="🎯" label="Quiz bientôt disponible" sub="Le quiz sera ajouté prochainement." />,
  };

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-64">
        {content[activeTab]}
      </div>
    </div>
  );
}

function Placeholder({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="text-center py-16 p-8">
      <div className="text-5xl mb-4">{icon}</div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="text-sm mt-1 text-gray-400">{sub}</p>
    </div>
  );
}
