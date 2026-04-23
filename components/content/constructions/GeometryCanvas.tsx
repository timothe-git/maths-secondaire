import {
  midpoint,
  perpendicularBisectorPoints,
  angleBisectorPoints,
  type ConstructionType,
} from "@/lib/geometry";

const W = 480;
const H = 380;
const cx = W / 2;
const cy = H / 2;
const SCALE = 60;

function s(x: number, y: number) {
  return { sx: cx + x * SCALE, sy: cy - y * SCALE };
}

const GRID_LINES = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

type Props = {
  type: ConstructionType;
  visibles: string[];
};

export default function GeometryCanvas({ type, visibles }: Props) {
  const show = (key: string) => visibles.includes(key);

  // ── Médiatrice ──────────────────────────────────────────────────────────────
  if (type === "mediatrice") {
    const A = { x: -2, y: 0 };
    const B = { x: 2, y: 0 };
    const R = 2.6;
    const { M, P1, P2 } = perpendicularBisectorPoints(A, B);

    const sA = s(A.x, A.y);
    const sB = s(B.x, B.y);
    const sM = s(M.x, M.y);
    const sP1 = s(P1.x, P1.y);
    const sP2 = s(P2.x, P2.y);
    const sI1 = s(M.x, Math.sqrt(R * R - (B.x - M.x) ** 2));
    const sI2 = s(M.x, -Math.sqrt(R * R - (B.x - M.x) ** 2));

    return (
      <svg width={W} height={H} style={{ display: "block", maxWidth: "100%", height: "auto" }}>
        {/* Canvas background */}
        <rect width={W} height={H} fill="#F8FAFF" rx="0" />

        {/* Grid */}
        <g opacity="0.3">
          {GRID_LINES.map((i) => {
            const { sx } = s(i, 0);
            const { sy } = s(0, i);
            return (
              <g key={i}>
                <line x1={sx} y1={0} x2={sx} y2={H} stroke="#94A3B8" strokeWidth="1" />
                <line x1={0} y1={sy} x2={W} y2={sy} stroke="#94A3B8" strokeWidth="1" />
              </g>
            );
          })}
        </g>

        {/* Axes */}
        <line x1={0} y1={cy} x2={W} y2={cy} stroke="#64748B" strokeWidth="1.5" opacity="0.4" />
        <line x1={cx} y1={0} x2={cx} y2={H} stroke="#64748B" strokeWidth="1.5" opacity="0.4" />

        {/* Arc depuis A */}
        {show("arc_A") && (
          <circle
            cx={sA.sx} cy={sA.sy} r={R * SCALE}
            fill="none" stroke="#3B82F6" strokeWidth="1.8"
            strokeDasharray="7 4" opacity="0.75"
          />
        )}

        {/* Arc depuis B */}
        {show("arc_B") && (
          <circle
            cx={sB.sx} cy={sB.sy} r={R * SCALE}
            fill="none" stroke="#EC4899" strokeWidth="1.8"
            strokeDasharray="7 4" opacity="0.75"
          />
        )}

        {/* Médiatrice */}
        {show("mediatrice") && (
          <line
            x1={sP1.sx} y1={sP1.sy} x2={sP2.sx} y2={sP2.sy}
            stroke="#059669" strokeWidth="2.5"
          />
        )}

        {/* Segment AB */}
        {show("segment") && (
          <line
            x1={sA.sx} y1={sA.sy} x2={sB.sx} y2={sB.sy}
            stroke="#374151" strokeWidth="2.5"
          />
        )}

        {/* Angle droit en M */}
        {show("midpoint") && (
          <rect
            x={sM.sx - 7} y={sM.sy - 7} width={14} height={14}
            fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.9"
          />
        )}

        {/* Points d'intersection P et Q */}
        {show("intersect_pts") && (
          <>
            <circle cx={sI1.sx} cy={sI1.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx={sI2.sx} cy={sI2.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
            <text x={sI1.sx + 9} y={sI1.sy - 6} fill="#B45309" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">P</text>
            <text x={sI2.sx + 9} y={sI2.sy + 15} fill="#B45309" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">Q</text>
          </>
        )}

        {/* Points A et B */}
        {show("points_AB") && (
          <>
            <circle cx={sA.sx} cy={sA.sy} r="5" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
            <circle cx={sB.sx} cy={sB.sy} r="5" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
          </>
        )}

        {/* Milieu M */}
        {show("midpoint") && (
          <circle cx={sM.sx} cy={sM.sy} r="4" fill="#059669" />
        )}

        {/* Labels A et B */}
        {show("labels_AB") && (
          <>
            <text x={sA.sx - 20} y={sA.sy + 6} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">A</text>
            <text x={sB.sx + 10} y={sB.sy + 6} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">B</text>
          </>
        )}

        {/* Label M */}
        {show("midpoint") && (
          <text x={sM.sx + 9} y={sM.sy - 9} fill="#059669" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">M</text>
        )}
      </svg>
    );
  }

  // ── Bissectrice ─────────────────────────────────────────────────────────────
  if (type === "bissectrice") {
    const O = { x: 0, y: 0 };
    const angleA = (Math.PI / 180) * 55;
    const angleB = (Math.PI / 180) * 5;
    const rayLen = 3;
    const rO = 1.4;

    const A = { x: Math.cos(angleA) * rayLen, y: Math.sin(angleA) * rayLen };
    const B = { x: Math.cos(angleB) * rayLen, y: Math.sin(angleB) * rayLen };
    const Mpt = { x: Math.cos(angleA) * rO, y: Math.sin(angleA) * rO };
    const N = { x: Math.cos(angleB) * rO, y: Math.sin(angleB) * rO };

    const { P1, P2 } = angleBisectorPoints(O, A, B);

    const rMN = 1.0;
    const midMN = midpoint(Mpt, N);
    const lenMN = Math.sqrt((N.x - Mpt.x) ** 2 + (N.y - Mpt.y) ** 2) || 1;
    const bisDir = {
      x: (midMN.x - O.x) / (Math.sqrt(midMN.x ** 2 + midMN.y ** 2) || 1),
      y: (midMN.y - O.y) / (Math.sqrt(midMN.x ** 2 + midMN.y ** 2) || 1),
    };
    const interDist = Math.sqrt(Math.max(0, rMN ** 2 - (lenMN / 2) ** 2));
    const P = {
      x: midMN.x + bisDir.x * interDist,
      y: midMN.y + bisDir.y * interDist,
    };

    const sO = s(O.x, O.y);
    const sA = s(A.x, A.y);
    const sB = s(B.x, B.y);
    const sM = s(Mpt.x, Mpt.y);
    const sN = s(N.x, N.y);
    const sP = s(P.x, P.y);
    const sP1 = s(P1.x, P1.y);
    const sP2 = s(P2.x, P2.y);

    // Arc sector from O
    const startA = -angleA;
    const startB = -angleB;
    const arcX1 = sO.sx + rO * SCALE * Math.cos(startB);
    const arcY1 = sO.sy + rO * SCALE * Math.sin(startB);
    const arcX2 = sO.sx + rO * SCALE * Math.cos(startA);
    const arcY2 = sO.sy + rO * SCALE * Math.sin(startA);

    return (
      <svg width={W} height={H} style={{ display: "block", maxWidth: "100%", height: "auto" }}>
        {/* Canvas background */}
        <rect width={W} height={H} fill="#F8FAFF" rx="0" />

        {/* Grid */}
        <g opacity="0.25">
          {GRID_LINES.map((i) => {
            const { sx } = s(i, 0);
            const { sy } = s(0, i);
            return (
              <g key={i}>
                <line x1={sx} y1={0} x2={sx} y2={H} stroke="#94A3B8" strokeWidth="1" />
                <line x1={0} y1={sy} x2={W} y2={sy} stroke="#94A3B8" strokeWidth="1" />
              </g>
            );
          })}
        </g>

        {/* Arc centré en O */}
        {show("arc_O") && (
          <path
            d={`M ${arcX1} ${arcY1} A ${rO * SCALE} ${rO * SCALE} 0 0 0 ${arcX2} ${arcY2}`}
            fill="none" stroke="#3B82F6" strokeWidth="1.8"
            strokeDasharray="6 3" opacity="0.8"
          />
        )}

        {/* Rayons OA et OB */}
        {show("rays") && (
          <>
            <line x1={sO.sx} y1={sO.sy} x2={sA.sx} y2={sA.sy} stroke="#374151" strokeWidth="2.5" />
            <line x1={sO.sx} y1={sO.sy} x2={sB.sx} y2={sB.sy} stroke="#374151" strokeWidth="2.5" />
          </>
        )}

        {/* Bissectrice */}
        {show("bissectrice") && (
          <line
            x1={sP1.sx} y1={sP1.sy} x2={sP2.sx} y2={sP2.sy}
            stroke="#7C3AED" strokeWidth="2.5"
          />
        )}

        {/* Arcs depuis M et N */}
        {show("arc_M") && (
          <circle cx={sM.sx} cy={sM.sy} r={rMN * SCALE} fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.7" />
        )}
        {show("arc_N") && (
          <circle cx={sN.sx} cy={sN.sy} r={rMN * SCALE} fill="none" stroke="#EC4899" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.7" />
        )}

        {/* Points M et N */}
        {show("points_MN") && (
          <>
            <circle cx={sM.sx} cy={sM.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx={sN.sx} cy={sN.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
            <text x={sM.sx - 18} y={sM.sy - 7} fill="#B45309" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">M</text>
            <text x={sN.sx + 9} y={sN.sy + 15} fill="#B45309" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">N</text>
          </>
        )}

        {/* Point P */}
        {show("point_P") && (
          <>
            <circle cx={sP.sx} cy={sP.sy} r="5" fill="#7C3AED" stroke="#A78BFA" strokeWidth="1.5" />
            <text x={sP.sx + 10} y={sP.sy - 5} fill="#6D28D9" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">P</text>
          </>
        )}

        {/* Point O */}
        {show("point_O") && (
          <circle cx={sO.sx} cy={sO.sy} r="5" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
        )}

        {/* Labels A, B, O */}
        {show("labels") && (
          <>
            <text x={sA.sx + 9} y={sA.sy - 5} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">A</text>
            <text x={sB.sx + 9} y={sB.sy + 15} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">B</text>
            <text x={sO.sx - 20} y={sO.sy + 6} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">O</text>
          </>
        )}
      </svg>
    );
  }

  // ── Angle 60° ───────────────────────────────────────────────────────────────
  if (type === "angle60") {
    const O = { x: -1.5, y: -1.0 };
    const r = 2.0;
    const A = { x: O.x + r, y: O.y };
    const B = { x: O.x + r * 0.5, y: O.y + r * Math.sqrt(3) / 2 };

    const sO = s(O.x, O.y);
    const sA = s(A.x, A.y);
    const sB = s(B.x, B.y);
    const rayAEnd = s(O.x + r * 1.5, O.y);
    const rayBEnd = s(O.x + r * 1.5 * 0.5, O.y + r * 1.5 * Math.sqrt(3) / 2);

    // Arc from O: from direction of A (0°) to direction of B (60° in math = -60° in screen)
    const arcO_sx = sO.sx + r * SCALE;
    const arcO_sy = sO.sy;
    const arcO_ex = sO.sx + r * SCALE * 0.5;
    const arcO_ey = sO.sy - r * SCALE * Math.sqrt(3) / 2;

    // Angle mark arc (small, 30° midpoint label)
    const rMark = 0.45;
    const markSx = sO.sx + rMark * SCALE;
    const markSy = sO.sy;
    const markEx = sO.sx + rMark * SCALE * 0.5;
    const markEy = sO.sy - rMark * SCALE * Math.sqrt(3) / 2;

    return (
      <svg width={W} height={H} style={{ display: "block", maxWidth: "100%", height: "auto" }}>
        <rect width={W} height={H} fill="#F8FAFF" rx="0" />

        <g opacity="0.25">
          {GRID_LINES.map((i) => {
            const { sx } = s(i, 0);
            const { sy } = s(0, i);
            return (
              <g key={i}>
                <line x1={sx} y1={0} x2={sx} y2={H} stroke="#94A3B8" strokeWidth="1" />
                <line x1={0} y1={sy} x2={W} y2={sy} stroke="#94A3B8" strokeWidth="1" />
              </g>
            );
          })}
        </g>

        {/* Arc centré en O */}
        {show("arc_O") && (
          <path
            d={`M ${arcO_sx} ${arcO_sy} A ${r * SCALE} ${r * SCALE} 0 0 0 ${arcO_ex} ${arcO_ey}`}
            fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.8"
          />
        )}

        {/* Arc centré en A */}
        {show("arc_A") && (
          <circle
            cx={sA.sx} cy={sA.sy} r={r * SCALE}
            fill="none" stroke="#EC4899" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.7"
          />
        )}

        {/* Demi-droite [OB */}
        {show("ray_OB") && (
          <line x1={sO.sx} y1={sO.sy} x2={rayBEnd.sx} y2={rayBEnd.sy} stroke="#0284C7" strokeWidth="2.5" />
        )}

        {/* Demi-droite [OA */}
        {show("ray_OA") && (
          <line x1={sO.sx} y1={sO.sy} x2={rayAEnd.sx} y2={rayAEnd.sy} stroke="#374151" strokeWidth="2.5" />
        )}

        {/* Marque d'angle 60° */}
        {show("angle_mark") && (
          <>
            <path
              d={`M ${markSx} ${markSy} A ${rMark * SCALE} ${rMark * SCALE} 0 0 0 ${markEx} ${markEy}`}
              fill="none" stroke="#0284C7" strokeWidth="2" opacity="0.9"
            />
            <text
              x={sO.sx + 0.75 * SCALE * 0.866}
              y={sO.sy - 0.75 * SCALE * 0.5 + 6}
              fill="#0284C7" fontSize="12" fontFamily="Georgia, serif"
            >60°</text>
          </>
        )}

        {/* Point O */}
        {show("point_O") && (
          <circle cx={sO.sx} cy={sO.sy} r="5" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
        )}

        {/* Point A */}
        {show("point_A") && (
          <circle cx={sA.sx} cy={sA.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
        )}

        {/* Point B */}
        {show("point_B") && (
          <circle cx={sB.sx} cy={sB.sy} r="5" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
        )}

        {/* Label O */}
        {show("label_O") && (
          <text x={sO.sx - 20} y={sO.sy + 6} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">O</text>
        )}

        {/* Label A */}
        {show("label_A") && (
          <text x={rayAEnd.sx + 8} y={rayAEnd.sy + 6} fill="#1F2937" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">A</text>
        )}

        {/* Label B */}
        {show("label_B") && (
          <text x={sB.sx + 10} y={sB.sy - 5} fill="#B45309" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">B</text>
        )}
      </svg>
    );
  }

  return null;
}
