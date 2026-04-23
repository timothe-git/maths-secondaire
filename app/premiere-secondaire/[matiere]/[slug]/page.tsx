import { matieresPremiere } from "@/lib/chapitres";
import ChapterView from "@/components/ChapterView";
import { notFound } from "next/navigation";
import CoursQuadrilateres from "@/components/content/quadrilateres/CoursContent";
import QuizQuadrilateres from "@/components/content/quadrilateres/QuizContent";
import ConstructionsContent from "@/components/content/constructions/ConstructionsContent";

type Props = {
  params: Promise<{ matiere: string; slug: string }>;
};

// Content for chapitres (with tabs)
const chapitreContent: Record<
  string,
  { cours?: React.ReactNode; exercices?: React.ReactNode; quiz?: React.ReactNode }
> = {
  quadrilateres: {
    cours: <CoursQuadrilateres />,
    quiz: <QuizQuadrilateres />,
  },
};

// Content for ressources (standalone, no tabs)
const ressourceContent: Record<string, React.ReactNode> = {
  "constructions-geometriques": <ConstructionsContent />,
};

export default async function SlugPage({ params }: Props) {
  const { matiere: matiereSlug, slug } = await params;
  const matiere = matieresPremiere.find((m) => m.slug === matiereSlug);

  if (!matiere) notFound();

  const chapitre = matiere.chapitres.find((c) => c.slug === slug);
  const ressource = matiere.ressources.find((r) => r.slug === slug);

  if (!chapitre && !ressource) notFound();

  const niveauLabel = "1ère Secondaire";
  const breadcrumb = `Mathématiques › ${niveauLabel} › ${matiere.titre}`;

  // ── Ressource : standalone, sans onglets ───────────────────────────────────
  if (ressource) {
    const content = ressourceContent[slug];
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500 mb-2">{breadcrumb}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{ressource.titre}</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {content ?? (
            <div className="text-center py-16 p-8">
              <div className="text-5xl mb-4">📐</div>
              <p className="font-medium text-gray-500">Contenu bientôt disponible</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Chapitre : avec onglets ────────────────────────────────────────────────
  const content = chapitreContent[slug] ?? {};

  return (
    <ChapterView
      titre={chapitre!.titre}
      niveau="premiere-secondaire"
      niveauLabel={`${niveauLabel} › ${matiere.titre}`}
      coursContent={content.cours}
      exercicesContent={content.exercices}
      quizContent={content.quiz}
    />
  );
}
