export type Chapitre = {
  slug: string;
  titre: string;
  description: string;
};

export type Ressource = {
  slug: string;
  titre: string;
  description: string;
};

export type Matiere = {
  slug: string;
  titre: string;
  description: string;
  icon: string;
  chapitres: Chapitre[];
  ressources: Ressource[];
};

export const matieresPremiere: Matiere[] = [
  {
    slug: "geometrie",
    titre: "Géométrie",
    description: "Figures géométriques, propriétés et constructions à la règle et au compas.",
    icon: "📐",
    chapitres: [
      {
        slug: "quadrilateres",
        titre: "Les quadrilatères",
        description:
          "Découvre les différents types de quadrilatères et leurs propriétés : trapèzes, parallélogrammes, rectangles, losanges et carrés.",
      },
    ],
    ressources: [
      {
        slug: "constructions-geometriques",
        titre: "Constructions géométriques",
        description:
          "Apprends à tracer la médiatrice et la bissectrice à la règle et au compas, étape par étape.",
      },
    ],
  },
];

export const matieresDeuxieme: Matiere[] = [
  {
    slug: "algebre",
    titre: "Algèbre",
    description: "Expressions littérales, calcul algébrique et produits remarquables.",
    icon: "🔢",
    chapitres: [
      {
        slug: "calcul-litteral",
        titre: "Le calcul littéral",
        description:
          "Apprends à manipuler des expressions avec des lettres : addition, multiplication, distributivité et produits remarquables.",
      },
    ],
    ressources: [],
  },
];
