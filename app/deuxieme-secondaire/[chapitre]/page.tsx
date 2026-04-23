import { chapitresDeuxieme } from "@/lib/chapitres";
import ChapterView from "@/components/ChapterView";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ chapitre: string }>;
};

export default async function ChapitreDeuxiemeSecondairePage({ params }: Props) {
  const { chapitre: slug } = await params;
  const chapitre = chapitresDeuxieme.find((c) => c.slug === slug);

  if (!chapitre) notFound();

  return (
    <ChapterView
      titre={chapitre.titre}
      niveau="deuxieme-secondaire"
      niveauLabel="2ème Secondaire"
    />
  );
}
