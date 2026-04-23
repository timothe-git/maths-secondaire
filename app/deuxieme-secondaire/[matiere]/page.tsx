import { matieresDeuxieme } from "@/lib/chapitres";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ matiere: string }>;
};

export default async function MatierePage({ params }: Props) {
  const { matiere: slug } = await params;
  const matiere = matieresDeuxieme.find((m) => m.slug === slug);

  if (!matiere) notFound();

  const niveau = "deuxieme-secondaire";

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-gray-500 mb-1">
          Mathématiques &rsaquo; 2ème Secondaire
        </p>
        <h1 className="text-3xl font-bold text-gray-900">{matiere.titre}</h1>
        <p className="mt-2 text-gray-600">{matiere.description}</p>
      </div>

      {matiere.chapitres.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Chapitres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matiere.chapitres.map((c) => (
              <Link key={c.slug} href={`/${niveau}/${slug}/${c.slug}`} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all h-full flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
                    {c.titre}
                  </h3>
                  <p className="text-sm text-gray-500 flex-1">{c.description}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Cours</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">Exercices</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">Quiz</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {matiere.ressources.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Ressources supplémentaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {matiere.ressources.map((r) => (
              <Link key={r.slug} href={`/${niveau}/${slug}/${r.slug}`} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all flex gap-4">
                  <div className="text-2xl shrink-0">📄</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {r.titre}
                    </h3>
                    <p className="text-sm text-gray-500">{r.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
