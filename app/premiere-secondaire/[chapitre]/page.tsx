import { chapitresPremiere } from "@/lib/chapitres";
import ChapterView from "@/components/ChapterView";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ chapitre: string }>;
};

export default async function ChapitrePremiereSecondairePage({ params }: Props) {
  const { chapitre: slug } = await params;
  const chapitre = chapitresPremiere.find((c) => c.slug === slug);

  if (!chapitre) notFound();

  return (
    <ChapterView
      titre={chapitre.titre}
      niveau="premiere-secondaire"
      niveauLabel="1ère Secondaire"
    />
  );
}
