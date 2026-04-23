import { chapitresDeuxieme } from "@/lib/chapitres";
import ChapterCard from "@/components/ChapterCard";

export default function DeuxiemeSecondairePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-gray-500 mb-1">Mathématiques</p>
        <h1 className="text-3xl font-bold text-gray-900">2ème Secondaire</h1>
        <p className="mt-2 text-gray-600">
          Sélectionne un chapitre pour accéder au cours, aux exercices et au
          quiz.
        </p>
      </div>

      {chapitresDeuxieme.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapitresDeuxieme.map((c) => (
            <ChapterCard
              key={c.slug}
              chapitre={c}
              niveau="deuxieme-secondaire"
            />
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
      <p className="text-lg font-medium text-gray-500">
        Contenu bientôt disponible
      </p>
      <p className="text-sm mt-1">
        Les chapitres seront ajoutés prochainement.
      </p>
    </div>
  );
}
