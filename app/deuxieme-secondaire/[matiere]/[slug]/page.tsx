import { matieresDeuxieme } from "@/lib/chapitres";
import ChapterView from "@/components/ChapterView";
import { notFound } from "next/navigation";
import CoursCalculLitteral from "@/components/content/calcul-litteral/CoursContent";

type Props = {
  params: Promise<{ matiere: string; slug: string }>;
};

const chapitreContent: Record<
  string,
  { cours?: React.ReactNode; exercices?: React.ReactNode; quiz?: React.ReactNode }
> = {
  "calcul-litteral": {
    cours: <CoursCalculLitteral />,
  },
};

const ressourceContent: Record<string, React.ReactNode> = {};

export default async function SlugPage({ params }: Props) {
  const { matiere: matiereSlug, slug } = await params;
  const matiere = matieresDeuxieme.find((m) => m.slug === matiereSlug);

  if (!matiere) notFound();

  const chapitre = matiere.chapitres.find((c) => c.slug === slug);
  const ressource = matiere.ressources.find((r) => r.slug === slug);

  if (!chapitre && !ressource) notFound();

  const niveauLabel = "2ème Secondaire";
  const breadcrumb = `Mathématiques › ${niveauLabel} › ${matiere.titre}`;

  if (ressource) {
    const content = ressourceContent[slug];
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500 mb-2">{breadcrumb}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{ressource.titre}</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {content ?? (
            <div className="text-center py-16 p-8">
              <div className="text-5xl mb-4">📄</div>
              <p className="font-medium text-gray-500">Contenu bientôt disponible</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const content = chapitreContent[slug] ?? {};

  return (
    <ChapterView
      titre={chapitre!.titre}
      niveau="deuxieme-secondaire"
      niveauLabel={`${niveauLabel} › ${matiere.titre}`}
      coursContent={content.cours}
      exercicesContent={content.exercices}
      quizContent={content.quiz}
    />
  );
}
