import { matieresPremiere } from "@/lib/chapitres";
import Link from "next/link";

export default function PremiereSecondairePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-gray-500 mb-1">Mathématiques</p>
        <h1 className="text-3xl font-bold text-gray-900">1ère Secondaire</h1>
        <p className="mt-2 text-gray-600">
          Sélectionne une matière pour accéder aux chapitres.
        </p>
      </div>

      {matieresPremiere.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matieresPremiere.map((m) => (
            <Link
              key={m.slug}
              href={`/premiere-secondaire/${m.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all">
                <div className="text-3xl mb-4">{m.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
                  {m.titre}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {m.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{m.chapitres.length} chapitre{m.chapitres.length > 1 ? "s" : ""}</span>
                  {m.ressources.length > 0 && (
                    <>
                      <span>·</span>
                      <span>{m.ressources.length} ressource{m.ressources.length > 1 ? "s" : ""}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 text-gray-400">
      <div className="text-6xl mb-4">📚</div>
      <p className="text-lg font-medium text-gray-500">Contenu bientôt disponible</p>
      <p className="text-sm mt-1">Les matières seront ajoutées prochainement.</p>
    </div>
  );
}
