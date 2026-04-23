import HierarchyDiagram from "./HierarchyDiagram";

type ShapeCardProps = {
  name: string;
  color: string;
  borderColor: string;
  svgPoints: string;
  svgViewBox?: string;
  properties: string[];
  example?: string;
};

function ShapeCard({ name, color, borderColor, svgPoints, svgViewBox = "0 0 80 60", properties, example }: ShapeCardProps) {
  return (
    <div className={`bg-white rounded-xl border-2 ${borderColor} p-5 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-20 h-14 ${color} rounded-lg flex items-center justify-center`}>
          <svg viewBox={svgViewBox} className="w-16 h-12">
            <polygon
              points={svgPoints}
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              className="text-gray-600"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">{name}</h3>
          <ul className="space-y-1">
            {properties.map((p, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {example && (
            <p className="mt-2 text-xs text-gray-400 italic">{example}</p>
          )}
        </div>
      </div>
    </div>
  );
}

type InfoBoxProps = {
  type: "definition" | "propriete" | "attention";
  children: React.ReactNode;
};

function InfoBox({ type, children }: InfoBoxProps) {
  const styles = {
    definition: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "Définition",
      labelColor: "text-blue-700",
      icon: "📘",
    },
    propriete: {
      bg: "bg-green-50",
      border: "border-green-200",
      label: "Propriété",
      labelColor: "text-green-700",
      icon: "✅",
    },
    attention: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Attention",
      labelColor: "text-amber-700",
      icon: "⚠️",
    },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-4 my-4`}>
      <div className={`flex items-center gap-2 font-semibold text-sm mb-1 ${s.labelColor}`}>
        <span>{s.icon}</span>
        <span>{s.label}</span>
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}

export default function CoursContent() {
  return (
    <div className="p-6 md:p-8 space-y-10">
      {/* Introduction */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Qu&apos;est-ce qu&apos;un quadrilatère ?
        </h2>
        <InfoBox type="definition">
          Un <strong>quadrilatère</strong> est un polygone possédant exactement{" "}
          <strong>4 côtés</strong> et <strong>4 sommets</strong>. La somme de
          ses angles intérieurs vaut toujours <strong>360°</strong>.
        </InfoBox>
        <p className="text-gray-600 text-sm leading-relaxed">
          Il existe de nombreux types de quadrilatères, certains étant des{" "}
          <em>cas particuliers</em> d&apos;autres. Le diagramme ci-dessous
          montre ces liens : plus on descend, plus la figure a de propriétés
          supplémentaires.
        </p>
      </section>

      {/* Hierarchy diagram */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          La famille des quadrilatères
        </h2>
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
          <HierarchyDiagram />
        </div>
      </section>

      {/* Individual shapes */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          Les différents quadrilatères
        </h2>
        <div className="space-y-4">
          <ShapeCard
            name="Le trapèze"
            color="bg-sky-50"
            borderColor="border-sky-200"
            svgPoints="5,50 75,50 62,10 18,10"
            svgViewBox="0 0 80 60"
            properties={[
              "Possède exactement 1 paire de côtés parallèles (appelés les bases)",
              "Les deux autres côtés s'appellent les côtés non-parallèles ou jambes",
            ]}
            example="Exemple : la coupe transversale d'un seau"
          />
          <ShapeCard
            name="Le trapèze isocèle"
            color="bg-sky-50"
            borderColor="border-sky-200"
            svgPoints="5,50 75,50 58,10 22,10"
            svgViewBox="0 0 80 60"
            properties={[
              "C'est un trapèze dont les deux côtés non-parallèles sont égaux",
              "Il a un axe de symétrie",
              "Ses deux diagonales sont égales",
            ]}
          />
          <ShapeCard
            name="Le trapèze rectangle"
            color="bg-sky-50"
            borderColor="border-sky-200"
            svgPoints="5,50 70,50 55,10 5,10"
            svgViewBox="0 0 80 60"
            properties={[
              "C'est un trapèze avec deux angles droits d'un même côté",
              "Un côté non-parallèle est perpendiculaire aux deux bases",
            ]}
          />
          <ShapeCard
            name="Le parallélogramme"
            color="bg-indigo-50"
            borderColor="border-indigo-200"
            svgPoints="14,50 74,50 66,10 6,10"
            svgViewBox="0 0 80 60"
            properties={[
              "Possède 2 paires de côtés parallèles",
              "Les côtés opposés sont égaux",
              "Les angles opposés sont égaux",
              "Les diagonales se coupent en leur milieu",
            ]}
            example="Exemple : une plaque inclinée"
          />
          <ShapeCard
            name="Le rectangle"
            color="bg-violet-50"
            borderColor="border-violet-200"
            svgPoints="5,45 75,45 75,15 5,15"
            svgViewBox="0 0 80 60"
            properties={[
              "C'est un parallélogramme avec 4 angles droits (90°)",
              "Ses diagonales sont égales",
              "Les côtés opposés sont égaux et parallèles",
            ]}
            example="Exemple : une feuille A4, un écran de télévision"
          />
          <ShapeCard
            name="Le losange"
            color="bg-rose-50"
            borderColor="border-rose-200"
            svgPoints="40,52 72,28 40,4 8,28"
            svgViewBox="0 0 80 60"
            properties={[
              "C'est un parallélogramme avec 4 côtés égaux",
              "Ses diagonales sont perpendiculaires entre elles",
              "Ses diagonales sont des axes de symétrie",
            ]}
            example="Exemple : un carreau de jeu de cartes ♦"
          />
          <ShapeCard
            name="Le carré"
            color="bg-emerald-50"
            borderColor="border-emerald-200"
            svgPoints="20,50 60,50 60,10 20,10"
            svgViewBox="0 0 80 60"
            properties={[
              "C'est à la fois un rectangle ET un losange",
              "4 côtés égaux ET 4 angles droits",
              "Il possède 4 axes de symétrie",
              "Ses diagonales sont égales, perpendiculaires et se coupent en leur milieu",
            ]}
            example="Exemple : un Rubik's cube, un carreau de carrelage"
          />
        </div>
      </section>

      {/* Key property */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          À retenir absolument
        </h2>
        <InfoBox type="propriete">
          <p>
            Tout <strong>carré</strong> est un rectangle, mais tout rectangle
            n&apos;est pas un carré.
          </p>
          <p className="mt-1">
            Tout <strong>carré</strong> est un losange, mais tout losange
            n&apos;est pas un carré.
          </p>
          <p className="mt-1">
            Tout <strong>parallélogramme</strong> est un trapèze (cas particulier
            avec 2 paires parallèles).
          </p>
        </InfoBox>
        <InfoBox type="attention">
          La somme des angles intérieurs de <em>tout</em> quadrilatère est{" "}
          <strong>360°</strong>, peu importe sa forme.
        </InfoBox>
      </section>
    </div>
  );
}
