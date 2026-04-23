// ─── Pure geometry helpers ───────────────────────────────────────────────────

export const midpoint = (A: Point, B: Point): Point => ({
  x: (A.x + B.x) / 2,
  y: (A.y + B.y) / 2,
});

export const perpendicularBisectorPoints = (A: Point, B: Point) => {
  const M = midpoint(A, B);
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const ext = 3;
  return {
    M,
    P1: { x: M.x + nx * ext, y: M.y + ny * ext },
    P2: { x: M.x - nx * ext, y: M.y - ny * ext },
  };
};

export const angleBisectorPoints = (O: Point, A: Point, B: Point) => {
  const lenA = Math.sqrt((A.x - O.x) ** 2 + (A.y - O.y) ** 2) || 1;
  const lenB = Math.sqrt((B.x - O.x) ** 2 + (B.y - O.y) ** 2) || 1;
  const uA = { x: (A.x - O.x) / lenA, y: (A.y - O.y) / lenA };
  const uB = { x: (B.x - O.x) / lenB, y: (B.y - O.y) / lenB };
  const bisDir = { x: uA.x + uB.x, y: uA.y + uB.y };
  const bisLen = Math.sqrt(bisDir.x ** 2 + bisDir.y ** 2) || 1;
  const bis = { x: bisDir.x / bisLen, y: bisDir.y / bisLen };
  return {
    P1: { x: O.x - bis.x * 4, y: O.y - bis.y * 4 },
    P2: { x: O.x + bis.x * 4, y: O.y + bis.y * 4 },
  };
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type Point = { x: number; y: number };

export type ConstructionType = "mediatrice" | "bissectrice" | "angle60";

export const ANGLE60_STEPS: Step[] = [
  {
    id: 0,
    title: "Demi-droite [OA",
    desc: "On trace une demi-droite [OA à partir du sommet O.",
    show: ["ray_OA", "point_O", "label_O", "label_A"],
  },
  {
    id: 1,
    title: "Arc centré en O",
    desc: "On trace un arc de cercle centré en O d'un rayon quelconque. Il coupe la demi-droite [OA en un point A.",
    show: ["ray_OA", "point_O", "label_O", "label_A", "arc_O", "point_A"],
  },
  {
    id: 2,
    title: "Arc centré en A",
    desc: "Sans changer l'ouverture du compas, on trace un arc centré en A. Il coupe le premier arc en un point B.",
    show: ["ray_OA", "point_O", "label_O", "label_A", "arc_O", "point_A", "arc_A", "point_B", "label_B"],
  },
  {
    id: 3,
    title: "Angle de 60°",
    desc: "La demi-droite [OB forme un angle de 60° avec [OA. Le triangle OAB est équilatéral car OA = OB = AB = r.",
    show: ["ray_OA", "point_O", "label_O", "label_A", "arc_O", "point_A", "arc_A", "point_B", "label_B", "ray_OB", "angle_mark"],
  },
];

export type Step = {
  id: number;
  title: string;
  desc: string;
  show: string[];
};

// ─── Step definitions ─────────────────────────────────────────────────────────

export const MEDIATRICE_STEPS: Step[] = [
  {
    id: 0,
    title: "Segment AB",
    desc: "On place deux points A et B dans le plan.",
    show: ["segment", "points_AB", "labels_AB"],
  },
  {
    id: 1,
    title: "Arc depuis A",
    desc: "On trace un arc de cercle centré en A avec un rayon supérieur à la moitié de AB.",
    show: ["segment", "points_AB", "labels_AB", "arc_A"],
  },
  {
    id: 2,
    title: "Arc depuis B",
    desc: "On trace un arc de cercle centré en B avec le même rayon.",
    show: ["segment", "points_AB", "labels_AB", "arc_A", "arc_B"],
  },
  {
    id: 3,
    title: "Points d'intersection",
    desc: "Les deux arcs se croisent en deux points P et Q.",
    show: ["segment", "points_AB", "labels_AB", "arc_A", "arc_B", "intersect_pts"],
  },
  {
    id: 4,
    title: "Tracé de la médiatrice",
    desc: "La droite passant par P et Q est la médiatrice du segment AB. Elle est perpendiculaire à AB et passe par son milieu M.",
    show: [
      "segment", "points_AB", "labels_AB",
      "arc_A", "arc_B", "intersect_pts",
      "mediatrice", "midpoint",
    ],
  },
];

export const BISSECTRICE_STEPS: Step[] = [
  {
    id: 0,
    title: "Angle AOB",
    desc: "On dispose d'un angle AOB avec sommet en O.",
    show: ["rays", "point_O", "labels"],
  },
  {
    id: 1,
    title: "Arc centré en O",
    desc: "On trace un arc de cercle centré en O qui coupe les deux côtés de l'angle en M et N.",
    show: ["rays", "point_O", "labels", "arc_O", "points_MN"],
  },
  {
    id: 2,
    title: "Arcs depuis M et N",
    desc: "On trace des arcs de cercle de même rayon centrés en M et N.",
    show: ["rays", "point_O", "labels", "arc_O", "points_MN", "arc_M", "arc_N"],
  },
  {
    id: 3,
    title: "Point d'intersection P",
    desc: "Les arcs se croisent en un point P à l'intérieur de l'angle.",
    show: [
      "rays", "point_O", "labels",
      "arc_O", "points_MN", "arc_M", "arc_N", "point_P",
    ],
  },
  {
    id: 4,
    title: "Tracé de la bissectrice",
    desc: "La droite (OP) est la bissectrice de l'angle AOB. Elle partage l'angle en deux angles égaux.",
    show: [
      "rays", "point_O", "labels",
      "arc_O", "points_MN", "arc_M", "arc_N", "point_P", "bissectrice",
    ],
  },
];
