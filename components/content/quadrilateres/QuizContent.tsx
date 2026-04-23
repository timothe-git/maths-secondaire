"use client";
import { useState } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct option
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Combien de côtés possède un quadrilatère ?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    explanation:
      "Un quadrilatère est défini par ses 4 côtés et 4 sommets. Le préfixe « quadri » vient du latin et signifie « quatre ».",
  },
  {
    id: 2,
    question: "Quelle est la somme des angles intérieurs d'un quadrilatère ?",
    options: ["90°", "180°", "270°", "360°"],
    correct: 3,
    explanation:
      "La somme des angles intérieurs de tout quadrilatère vaut toujours 360°. On peut le vérifier en découpant les angles et en les assemblant pour former un tour complet.",
  },
  {
    id: 3,
    question: "Un trapèze possède combien de paire(s) de côtés parallèles ?",
    options: ["0", "1", "2", "4"],
    correct: 1,
    explanation:
      "Le trapèze possède exactement 1 paire de côtés parallèles, appelés les « bases ». C'est sa propriété définissante.",
  },
  {
    id: 4,
    question: "Un parallélogramme possède combien de paires de côtés parallèles ?",
    options: ["0", "1", "2", "4"],
    correct: 2,
    explanation:
      "Le parallélogramme possède 2 paires de côtés parallèles. C'est pour cela que son nom contient « parallèle ».",
  },
  {
    id: 5,
    question: "Un carré est-il toujours un rectangle ?",
    options: [
      "Non, jamais",
      "Oui, toujours",
      "Seulement si ses côtés sont égaux",
      "Parfois",
    ],
    correct: 1,
    explanation:
      "Oui, toujours ! Le carré possède 4 angles droits, ce qui en fait automatiquement un rectangle. Il est même un rectangle particulier avec en plus 4 côtés égaux.",
  },
  {
    id: 6,
    question: "Quelle est la propriété distinctive du losange (par rapport au parallélogramme) ?",
    options: [
      "Il a 4 angles droits",
      "Il a 4 côtés égaux",
      "Il a 2 axes de symétrie",
      "Ses diagonales sont égales",
    ],
    correct: 1,
    explanation:
      "Le losange est un parallélogramme dont les 4 côtés sont égaux. Ses diagonales sont perpendiculaires, mais pas nécessairement égales.",
  },
  {
    id: 7,
    question: "Quelle figure est à la fois un rectangle ET un losange ?",
    options: ["Le trapèze", "Le parallélogramme", "Le carré", "Le trapèze isocèle"],
    correct: 2,
    explanation:
      "Le carré réunit les propriétés du rectangle (4 angles droits) et du losange (4 côtés égaux). C'est le quadrilatère le plus régulier.",
  },
  {
    id: 8,
    question: "Dans un trapèze isocèle, que peut-on dire des côtés non-parallèles ?",
    options: [
      "Ils sont perpendiculaires",
      "Ils sont parallèles",
      "Ils sont égaux",
      "Ils forment des angles droits",
    ],
    correct: 2,
    explanation:
      "Dans un trapèze isocèle, les deux côtés non-parallèles (jambes) sont égaux. Cela lui confère un axe de symétrie et des diagonales de même longueur.",
  },
  {
    id: 9,
    question: "Combien d'axes de symétrie possède un carré ?",
    options: ["1", "2", "4", "8"],
    correct: 2,
    explanation:
      "Le carré possède 4 axes de symétrie : les 2 axes passant par les milieux des côtés opposés, et les 2 diagonales.",
  },
  {
    id: 10,
    question: "Un rectangle est-il forcément un parallélogramme ?",
    options: [
      "Non, ce sont deux figures différentes",
      "Oui, car il a 2 paires de côtés parallèles",
      "Non, car il a des angles droits",
      "Seulement si tous ses côtés sont égaux",
    ],
    correct: 1,
    explanation:
      "Oui ! Un rectangle a ses côtés opposés parallèles deux à deux, ce qui en fait bien un parallélogramme. C'est un parallélogramme particulier avec des angles droits.",
  },
];

type AnswerState = {
  selected: number;
  revealed: boolean;
};

export default function QuizContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const answer = answers[question.id];
  const isRevealed = answer?.revealed ?? false;

  function handleSelect(optionIndex: number) {
    if (isRevealed) return;
    setAnswers((prev) => ({
      ...prev,
      [question.id]: { selected: optionIndex, revealed: false },
    }));
  }

  function handleReveal() {
    if (!answer) return;
    setAnswers((prev) => ({
      ...prev,
      [question.id]: { ...prev[question.id], revealed: true },
    }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  function handleRetry() {
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
  }

  const score = questions.filter(
    (q) => answers[q.id]?.revealed && answers[q.id]?.selected === q.correct
  ).length;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
    const msg =
      pct >= 80
        ? "Excellent travail ! Tu maîtrises bien les quadrilatères."
        : pct >= 50
        ? "Bon début ! Relis le cours et réessaie pour améliorer ton score."
        : "Continue à étudier le cours, tu vas y arriver !";

    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {score} / {questions.length}
        </h2>
        <p className="text-gray-500 mb-1">{pct}% de bonnes réponses</p>
        <p className="text-gray-600 text-sm mb-8 max-w-sm mx-auto">{msg}</p>

        {/* Score breakdown */}
        <div className="flex justify-center gap-1.5 mb-8 flex-wrap max-w-sm mx-auto">
          {questions.map((q) => {
            const a = answers[q.id];
            const correct = a?.revealed && a.selected === q.correct;
            return (
              <div
                key={q.id}
                title={`Question ${q.id}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  correct ? "bg-green-500" : "bg-red-400"
                }`}
              >
                {q.id}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors cursor-pointer"
        >
          Recommencer le quiz
        </button>
      </div>
    );
  }

  const isCorrect = isRevealed && answer?.selected === question.correct;

  return (
    <div className="p-6 md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className="text-sm text-gray-400">
          {score} bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-2 bg-violet-400 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-lg font-semibold text-gray-900 mb-6 leading-snug">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let style =
            "border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50";

          if (answer?.selected === i && !isRevealed) {
            style = "border-violet-400 bg-violet-50 text-violet-800";
          }
          if (isRevealed) {
            if (i === question.correct) {
              style = "border-green-400 bg-green-50 text-green-800";
            } else if (answer?.selected === i) {
              style = "border-red-400 bg-red-50 text-red-800";
            } else {
              style = "border-gray-100 bg-gray-50 text-gray-400";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isRevealed}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer disabled:cursor-default ${style}`}
            >
              <span className="font-bold mr-2 opacity-60">
                {["A", "B", "C", "D"][i]}.
              </span>
              {option}
              {isRevealed && i === question.correct && (
                <span className="ml-2">✓</span>
              )}
              {isRevealed && answer?.selected === i && i !== question.correct && (
                <span className="ml-2">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isRevealed && (
        <div
          className={`rounded-xl p-4 mb-6 text-sm ${
            isCorrect
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-semibold mb-1">{isCorrect ? "Bonne réponse ! 🎉" : "Pas tout à fait... 🤔"}</p>
          <p>{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!isRevealed && (
          <button
            onClick={handleReveal}
            disabled={!answer}
            className="px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Valider
          </button>
        )}
        {isRevealed && (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors cursor-pointer"
          >
            {currentIndex < questions.length - 1 ? "Question suivante →" : "Voir mon score"}
          </button>
        )}
      </div>
    </div>
  );
}
