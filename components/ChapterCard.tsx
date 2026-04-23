import Link from "next/link";
import type { Chapitre } from "@/lib/chapitres";

type Props = {
  chapitre: Chapitre;
  niveau: "premiere-secondaire" | "deuxieme-secondaire";
};

export default function ChapterCard({ chapitre, niveau }: Props) {
  return (
    <Link href={`/${niveau}/${chapitre.slug}`} className="group">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all h-full flex flex-col">
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
          {chapitre.titre}
        </h3>
        <p className="text-sm text-gray-500 flex-1">{chapitre.description}</p>
        <div className="mt-4 flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            Cours
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
            Exercices
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">
            Quiz
          </span>
        </div>
      </div>
    </Link>
  );
}
