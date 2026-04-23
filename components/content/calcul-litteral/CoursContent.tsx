import React from "react";

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-gray-800 mt-6 mb-2">{children}</h3>;
}

type InfoBoxProps = {
  type: "definition" | "regle" | "attention" | "astuce";
  title?: string;
  children: React.ReactNode;
};

const boxStyles = {
  definition: { bg: "bg-blue-50", border: "border-blue-200", icon: "📘", titleColor: "text-blue-700", label: "Définition" },
  regle:      { bg: "bg-emerald-50", border: "border-emerald-200", icon: "✅", titleColor: "text-emerald-700", label: "Règle" },
  attention:  { bg: "bg-amber-50", border: "border-amber-200", icon: "⚠️", titleColor: "text-amber-700", label: "Attention" },
  astuce:     { bg: "bg-violet-50", border: "border-violet-200", icon: "💡", titleColor: "text-violet-700", label: "Astuce" },
};

function InfoBox({ type, title, children }: InfoBoxProps) {
  const s = boxStyles[type];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-4 my-3`}>
      <p className={`font-semibold text-sm mb-1 ${s.titleColor}`}>
        {s.icon} {title ?? s.label}
      </p>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

function ExBox({ children, label = "Exemple" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
      <div className="space-y-1 text-sm text-gray-800">{children}</div>
    </div>
  );
}

function FormulaCard({
  formula,
  color = "blue",
  label,
  sub,
}: {
  formula: React.ReactNode;
  color?: "blue" | "emerald" | "violet" | "orange" | "rose";
  label?: string;
  sub?: string;
}) {
  const colors = {
    blue:    "from-blue-50 to-blue-100 border-blue-200",
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200",
    violet:  "from-violet-50 to-violet-100 border-violet-200",
    orange:  "from-orange-50 to-orange-100 border-orange-200",
    rose:    "from-rose-50 to-rose-100 border-rose-200",
  };
  const text = {
    blue: "text-blue-900", emerald: "text-emerald-900",
    violet: "text-violet-900", orange: "text-orange-900", rose: "text-rose-900",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl px-6 py-5 my-4 text-center`}>
      {label && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>}
      <div className={`text-lg font-bold font-mono ${text[color]}`}>{formula}</div>
      {sub && <p className="text-xs text-gray-500 mt-2 italic">{sub}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CoursCalculLitteral() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <p className="text-sm text-gray-500 mb-6">
        Le calcul littéral consiste à manipuler des expressions contenant des lettres, appelées{" "}
        <strong>variables</strong>. C&apos;est le langage universel des mathématiques.
      </p>

      {/* ── 1. Expression littérale ── */}
      <SectionTitle>1. L&apos;expression littérale</SectionTitle>

      <InfoBox type="definition">
        <p>
          Une <strong>expression littérale</strong> est une expression mathématique qui contient
          une ou plusieurs lettres (variables). Ces lettres peuvent représenter n&apos;importe
          quel nombre.
        </p>
      </InfoBox>

      <p className="text-sm text-gray-700 mt-3 mb-2">
        Chaque terme d&apos;une expression littérale se décompose en deux parties :
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-sky-600 uppercase tracking-wide mb-1">Coefficient numérique</p>
          <p className="text-sm text-gray-700">La partie <strong>chiffre</strong> qui multiplie la variable</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-1">Partie littérale</p>
          <p className="text-sm text-gray-700">La partie <strong>lettre(s)</strong> du terme</p>
        </div>
      </div>

      <ExBox label="Décomposition d'un terme">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-base font-bold text-gray-900">3<em>x</em></span>
            <span className="text-gray-400">→</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-medium">coefficient : 3</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-medium">partie littérale : x</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-base font-bold text-gray-900">−5<em>ab</em></span>
            <span className="text-gray-400">→</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-medium">coefficient : −5</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-medium">partie littérale : ab</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-base font-bold text-gray-900"><em>x</em><sup>2</sup></span>
            <span className="text-gray-400">→</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-medium">coefficient : 1</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-medium">partie littérale : x²</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-base font-bold text-gray-900">−<em>y</em></span>
            <span className="text-gray-400">→</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-medium">coefficient : −1</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-medium">partie littérale : y</span>
          </div>
        </div>
      </ExBox>

      <InfoBox type="attention">
        <p>
          Quand il n&apos;y a pas de chiffre devant une lettre, le coefficient est <strong>1</strong> (ou{" "}
          <strong>−1</strong> si le signe est négatif). Ainsi, <em>x</em> = 1·<em>x</em> et
          −<em>x</em> = −1·<em>x</em>.
        </p>
      </InfoBox>

      {/* ── 2. Addition et soustraction ── */}
      <SectionTitle>2. Addition et soustraction</SectionTitle>

      <InfoBox type="definition" title="📘 Termes semblables">
        <p>
          Deux termes sont <strong>semblables</strong> s&apos;ils ont exactement la même partie
          littérale. On peut additionner ou soustraire uniquement des termes semblables, en
          additionnant ou soustrayant leurs coefficients.
        </p>
      </InfoBox>

      <ExBox>
        <p><strong>3<em>x</em> + 5<em>x</em> = 8<em>x</em></strong> — même partie littérale (<em>x</em>), on additionne les coefficients : 3 + 5 = 8</p>
        <p><strong>4<em>a</em><sup>2</sup> − <em>a</em><sup>2</sup> = 3<em>a</em><sup>2</sup></strong> — coefficients : 4 − 1 = 3</p>
        <p><strong>7<em>x</em> − 3<em>x</em> + 2<em>x</em> = 6<em>x</em></strong> — on additionne/soustrait dans l&apos;ordre</p>
      </ExBox>

      <InfoBox type="attention">
        <p>
          <strong>2<em>x</em> + 3<em>y</em></strong> ne peut pas être simplifié ! Les parties
          littérales sont différentes (<em>x</em> ≠ <em>y</em>), ce ne sont pas des termes
          semblables.
        </p>
      </InfoBox>

      <ExBox label="Exemple complet — réduire l'expression">
        <p className="font-mono">5<em>x</em><sup>2</sup> + 3<em>x</em> − 2<em>x</em><sup>2</sup> + <em>x</em> − 4</p>
        <p className="text-gray-400 text-xs mt-1">On regroupe les termes semblables :</p>
        <p className="font-mono">(5<em>x</em><sup>2</sup> − 2<em>x</em><sup>2</sup>) + (3<em>x</em> + <em>x</em>) − 4</p>
        <p className="font-mono font-bold">= 3<em>x</em><sup>2</sup> + 4<em>x</em> − 4</p>
      </ExBox>

      {/* ── 3. Multiplication ── */}
      <SectionTitle>3. Multiplication</SectionTitle>

      <InfoBox type="regle">
        <p>Pour multiplier deux termes littéraux :</p>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li>On <strong>multiplie les coefficients</strong> entre eux.</li>
          <li>On <strong>additionne les exposants</strong> des variables identiques.</li>
        </ul>
      </InfoBox>

      <ExBox>
        <p><strong>3<em>x</em> × 4<em>x</em> = 12<em>x</em><sup>2</sup></strong> — coefficients : 3×4 = 12 ; exposants de <em>x</em> : 1+1 = 2</p>
        <p><strong>2<em>a</em> × 5<em>b</em> = 10<em>ab</em></strong> — les variables sont différentes, on les écrit côte à côte</p>
        <p><strong>(−3<em>x</em><sup>2</sup>) × 2<em>x</em> = −6<em>x</em><sup>3</sup></strong> — coefficients : −3×2 = −6 ; exposants : 2+1 = 3</p>
        <p><strong>4<em>x</em> × (−<em>x</em>) = −4<em>x</em><sup>2</sup></strong> — attention au signe !</p>
      </ExBox>

      {/* ── 4. Distributivité simple ── */}
      <SectionTitle>4. La distributivité simple</SectionTitle>

      <p className="text-sm text-gray-700 mb-3">
        <em>Distribuer</em>, c&apos;est supprimer les parenthèses en multipliant chaque terme à
        l&apos;intérieur par le facteur à l&apos;extérieur.
      </p>

      <FormulaCard
        color="blue"
        label="Distributivité simple"
        formula={<><em>k</em>(<em>a</em> + <em>b</em>) = <em>ka</em> + <em>kb</em></>}
        sub="k multiplie chaque terme à l'intérieur de la parenthèse"
      />

      <ExBox>
        <p><strong>3(2<em>x</em> + 4)</strong> = 3·2<em>x</em> + 3·4 = <strong>6<em>x</em> + 12</strong></p>
        <p><strong>−2(3<em>x</em> − 5)</strong> = −2·3<em>x</em> + (−2)·(−5) = <strong>−6<em>x</em> + 10</strong></p>
        <p><strong>5<em>x</em>(2<em>x</em> − 3)</strong> = 5<em>x</em>·2<em>x</em> + 5<em>x</em>·(−3) = <strong>10<em>x</em><sup>2</sup> − 15<em>x</em></strong></p>
      </ExBox>

      <InfoBox type="attention">
        <p>
          Avec un signe <strong>négatif</strong> devant la parenthèse, tous les signes à
          l&apos;intérieur <strong>changent</strong> :
        </p>
        <p className="font-mono mt-1">−2(3<em>x</em> − 5) = −6<em>x</em> <span className="text-red-600 font-bold">+</span> 10</p>
        <p className="text-xs mt-1">Le − et le − donnent un + : (−2)×(−5) = +10</p>
      </InfoBox>

      {/* ── 5. Effet d'un + ou − devant une parenthèse ── */}
      <SectionTitle>5. Effet d&apos;un + ou − devant une parenthèse</SectionTitle>

      <p className="text-sm text-gray-700 mb-3">
        Cas particulier de la distributivité simple avec <em>k</em> = 1 ou <em>k</em> = −1 :
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-emerald-700 mb-2">Un + devant la parenthèse</p>
          <p className="font-mono text-sm">+(<em>a</em> + <em>b</em>) = <em>a</em> + <em>b</em></p>
          <p className="text-xs text-gray-500 mt-1">Les signes ne changent pas.</p>
          <div className="mt-3 pt-3 border-t border-emerald-200 font-mono text-sm space-y-1">
            <p>+(3<em>x</em> − 2) = 3<em>x</em> − 2</p>
            <p>+(−4 + <em>y</em>) = −4 + <em>y</em></p>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-rose-700 mb-2">Un − devant la parenthèse</p>
          <p className="font-mono text-sm">−(<em>a</em> + <em>b</em>) = −<em>a</em> − <em>b</em></p>
          <p className="text-xs text-gray-500 mt-1">Tous les signes s&apos;inversent.</p>
          <div className="mt-3 pt-3 border-t border-rose-200 font-mono text-sm space-y-1">
            <p>−(3<em>x</em> − 2) = −3<em>x</em> + 2</p>
            <p>−(−4 + <em>y</em>) = 4 − <em>y</em></p>
          </div>
        </div>
      </div>

      <ExBox label="Exemple — développer et réduire">
        <p className="font-mono">2(3<em>x</em> + 1) − (4<em>x</em> − 5)</p>
        <p className="text-gray-400 text-xs">= 6<em>x</em> + 2 − 4<em>x</em> + 5 &nbsp;&nbsp;&nbsp;← attention : −(4x−5) = −4x+5</p>
        <p className="font-mono font-bold">= 2<em>x</em> + 7</p>
      </ExBox>

      {/* ── 6. Double distributivité ── */}
      <SectionTitle>6. La double distributivité</SectionTitle>

      <p className="text-sm text-gray-700 mb-3">
        Pour multiplier deux expressions entre parenthèses, chaque terme du premier facteur
        multiplie chaque terme du second.
      </p>

      <FormulaCard
        color="emerald"
        label="Double distributivité"
        formula={<>(<em>a</em>+<em>b</em>)(<em>c</em>+<em>d</em>) = <em>ac</em> + <em>ad</em> + <em>bc</em> + <em>bd</em></>}
        sub="4 multiplications : chaque terme de la 1ère parenthèse × chaque terme de la 2ème"
      />

      <SubTitle>Méthode visuelle</SubTitle>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 my-3">
        <p className="text-sm text-gray-600 mb-3">Pour (<em>a</em>+<em>b</em>)(<em>c</em>+<em>d</em>), on effectue les 4 produits :</p>
        <div className="grid grid-cols-2 gap-2 max-w-xs">
          <div className="bg-blue-100 rounded-lg p-2 text-center text-xs font-mono font-semibold text-blue-800"><em>a</em> × <em>c</em> = <em>ac</em></div>
          <div className="bg-orange-100 rounded-lg p-2 text-center text-xs font-mono font-semibold text-orange-800"><em>a</em> × <em>d</em> = <em>ad</em></div>
          <div className="bg-emerald-100 rounded-lg p-2 text-center text-xs font-mono font-semibold text-emerald-800"><em>b</em> × <em>c</em> = <em>bc</em></div>
          <div className="bg-violet-100 rounded-lg p-2 text-center text-xs font-mono font-semibold text-violet-800"><em>b</em> × <em>d</em> = <em>bd</em></div>
        </div>
      </div>

      <ExBox>
        <p className="font-mono">(2<em>x</em> + 3)(<em>x</em> + 4)</p>
        <p className="text-xs text-gray-500">= 2<em>x</em>·<em>x</em> + 2<em>x</em>·4 + 3·<em>x</em> + 3·4</p>
        <p className="text-xs text-gray-500">= 2<em>x</em><sup>2</sup> + 8<em>x</em> + 3<em>x</em> + 12</p>
        <p className="font-mono font-bold">= 2<em>x</em><sup>2</sup> + 11<em>x</em> + 12</p>
      </ExBox>

      <ExBox label="Autre exemple">
        <p className="font-mono">(3<em>x</em> − 2)(2<em>x</em> + 1)</p>
        <p className="text-xs text-gray-500">= 3<em>x</em>·2<em>x</em> + 3<em>x</em>·1 + (−2)·2<em>x</em> + (−2)·1</p>
        <p className="text-xs text-gray-500">= 6<em>x</em><sup>2</sup> + 3<em>x</em> − 4<em>x</em> − 2</p>
        <p className="font-mono font-bold">= 6<em>x</em><sup>2</sup> − <em>x</em> − 2</p>
      </ExBox>

      {/* ── 7. Produits remarquables ── */}
      <SectionTitle>7. Les produits remarquables ⭐</SectionTitle>

      <p className="text-sm text-gray-700 mb-4">
        Les <strong>produits remarquables</strong> sont trois formules qui apparaissent très
        souvent en mathématiques. Il est indispensable de les connaître par cœur car elles
        permettent de développer (et factoriser) très rapidement des expressions.
      </p>

      {/* 7a. Carré d'une somme */}
      <SubTitle>7a. Le carré d&apos;une somme</SubTitle>

      <FormulaCard
        color="blue"
        label="Carré d'une somme"
        formula={<>(<em>a</em> + <em>b</em>)<sup>2</sup> = <em>a</em><sup>2</sup> + 2<em>ab</em> + <em>b</em><sup>2</sup></>}
        sub="le premier au carré + 2 fois le produit des deux termes + le deuxième au carré"
      />

      <SubTitle>Preuve par double distributivité :</SubTitle>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-3 text-sm">
        <p className="font-mono">(<em>a</em> + <em>b</em>)<sup>2</sup></p>
        <p className="font-mono text-gray-500">= (<em>a</em> + <em>b</em>)(<em>a</em> + <em>b</em>)</p>
        <p className="font-mono text-gray-500">= <em>a</em>² + <em>ab</em> + <em>ba</em> + <em>b</em>²</p>
        <p className="font-mono font-bold text-blue-800">= <em>a</em>² + 2<em>ab</em> + <em>b</em>²</p>
      </div>

      <ExBox>
        <p>(<em>x</em> + 3)<sup>2</sup> = <em>x</em><sup>2</sup> + 2·<em>x</em>·3 + 3<sup>2</sup> = <strong><em>x</em><sup>2</sup> + 6<em>x</em> + 9</strong></p>
        <p>(2<em>x</em> + 5)<sup>2</sup> = (2<em>x</em>)<sup>2</sup> + 2·2<em>x</em>·5 + 5<sup>2</sup> = <strong>4<em>x</em><sup>2</sup> + 20<em>x</em> + 25</strong></p>
        <p>(<em>a</em> + 1)<sup>2</sup> = <em>a</em><sup>2</sup> + 2<em>a</em> + 1</p>
      </ExBox>

      <InfoBox type="attention" title="⚠️ Erreur classique">
        <p>(<em>a</em> + <em>b</em>)<sup>2</sup> ≠ <em>a</em><sup>2</sup> + <em>b</em><sup>2</sup></p>
        <p className="mt-1">Il ne faut <strong>jamais oublier le terme 2<em>ab</em></strong> au milieu !</p>
        <p className="font-mono mt-1">(<em>x</em> + 3)<sup>2</sup> ≠ <em>x</em><sup>2</sup> + 9 &nbsp; (FAUX)</p>
        <p className="font-mono">(<em>x</em> + 3)<sup>2</sup> = <em>x</em><sup>2</sup> + 6<em>x</em> + 9 &nbsp; (CORRECT)</p>
      </InfoBox>

      <InfoBox type="astuce">
        <p>Vérification numérique : prenons <em>a</em> = 2 et <em>b</em> = 3.</p>
        <p className="font-mono mt-1">(2 + 3)<sup>2</sup> = 5<sup>2</sup> = 25</p>
        <p className="font-mono">2<sup>2</sup> + 2·2·3 + 3<sup>2</sup> = 4 + 12 + 9 = 25 ✓</p>
      </InfoBox>

      {/* 7b. Carré d'une différence */}
      <SubTitle>7b. Le carré d&apos;une différence</SubTitle>

      <FormulaCard
        color="violet"
        label="Carré d'une différence"
        formula={<>(<em>a</em> − <em>b</em>)<sup>2</sup> = <em>a</em><sup>2</sup> − 2<em>ab</em> + <em>b</em><sup>2</sup></>}
        sub="le premier au carré − 2 fois le produit des deux termes + le deuxième au carré"
      />

      <SubTitle>Preuve :</SubTitle>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-3 text-sm">
        <p className="font-mono">(<em>a</em> − <em>b</em>)<sup>2</sup></p>
        <p className="font-mono text-gray-500">= (<em>a</em> − <em>b</em>)(<em>a</em> − <em>b</em>)</p>
        <p className="font-mono text-gray-500">= <em>a</em>² − <em>ab</em> − <em>ba</em> + <em>b</em>²</p>
        <p className="font-mono font-bold text-violet-800">= <em>a</em>² − 2<em>ab</em> + <em>b</em>²</p>
      </div>

      <ExBox>
        <p>(<em>x</em> − 4)<sup>2</sup> = <em>x</em><sup>2</sup> − 2·<em>x</em>·4 + 4<sup>2</sup> = <strong><em>x</em><sup>2</sup> − 8<em>x</em> + 16</strong></p>
        <p>(3<em>x</em> − 2)<sup>2</sup> = (3<em>x</em>)<sup>2</sup> − 2·3<em>x</em>·2 + 2<sup>2</sup> = <strong>9<em>x</em><sup>2</sup> − 12<em>x</em> + 4</strong></p>
        <p>(1 − <em>a</em>)<sup>2</sup> = 1 − 2<em>a</em> + <em>a</em><sup>2</sup></p>
      </ExBox>

      <InfoBox type="astuce">
        <p>Remarque : le <strong>dernier terme est toujours positif</strong>, même dans le carré d&apos;une différence, car <em>b</em>² ≥ 0 toujours.</p>
        <p className="font-mono mt-1">(<em>x</em> − 5)<sup>2</sup> = <em>x</em><sup>2</sup> − 10<em>x</em> <span className="text-emerald-600 font-bold">+ 25</span> &nbsp; (pas −25 !)</p>
      </InfoBox>

      {/* 7c. Produit de binômes conjugués */}
      <SubTitle>7c. Le produit de binômes conjugués</SubTitle>

      <p className="text-sm text-gray-700 mb-3">
        On appelle <strong>binômes conjugués</strong> deux expressions de la forme (<em>a</em>+<em>b</em>)
        et (<em>a</em>−<em>b</em>) : elles sont identiques sauf pour le signe central.
      </p>

      <FormulaCard
        color="orange"
        label="Produit de binômes conjugués (différence de carrés)"
        formula={<>(<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>) = <em>a</em><sup>2</sup> − <em>b</em><sup>2</sup></>}
        sub="le résultat est simplement la différence des carrés — le terme en ab disparaît !"
      />

      <SubTitle>Preuve :</SubTitle>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-3 text-sm">
        <p className="font-mono">(<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>)</p>
        <p className="font-mono text-gray-500">= <em>a</em>² − <em>ab</em> + <em>ba</em> − <em>b</em>²</p>
        <p className="font-mono text-gray-400">= <em>a</em>² <span className="line-through">− <em>ab</em> + <em>ab</em></span> − <em>b</em>² &nbsp; ← les termes en <em>ab</em> s&apos;annulent</p>
        <p className="font-mono font-bold text-orange-800">= <em>a</em>² − <em>b</em>²</p>
      </div>

      <ExBox>
        <p>(<em>x</em> + 5)(<em>x</em> − 5) = <em>x</em><sup>2</sup> − 5<sup>2</sup> = <strong><em>x</em><sup>2</sup> − 25</strong></p>
        <p>(2<em>x</em> + 3)(2<em>x</em> − 3) = (2<em>x</em>)<sup>2</sup> − 3<sup>2</sup> = <strong>4<em>x</em><sup>2</sup> − 9</strong></p>
        <p>(<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>) avec <em>a</em> = 10, <em>b</em> = 1 : (11)(9) = 99 = 10² − 1² = 100 − 1 = 99 ✓</p>
      </ExBox>

      <InfoBox type="astuce" title="💡 Application concrète">
        <p>Cette formule permet de calculer rapidement des produits :</p>
        <p className="font-mono mt-1">41 × 39 = (40 + 1)(40 − 1) = 40² − 1² = 1600 − 1 = <strong>1599</strong></p>
        <p className="font-mono">99 × 101 = (100 − 1)(100 + 1) = 100² − 1² = <strong>9999</strong></p>
      </InfoBox>

      {/* Récapitulatif */}
      <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-base font-bold text-slate-800 mb-4">📋 Récapitulatif des produits remarquables</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="shrink-0 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">1</span>
            <p className="font-mono text-sm">(<em>a</em> + <em>b</em>)<sup>2</sup> = <em>a</em><sup>2</sup> + 2<em>ab</em> + <em>b</em><sup>2</sup></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 bg-violet-100 text-violet-700 rounded-full px-2 py-0.5 text-xs font-bold">2</span>
            <p className="font-mono text-sm">(<em>a</em> − <em>b</em>)<sup>2</sup> = <em>a</em><sup>2</sup> − 2<em>ab</em> + <em>b</em><sup>2</sup></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 text-xs font-bold">3</span>
            <p className="font-mono text-sm">(<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>) = <em>a</em><sup>2</sup> − <em>b</em><sup>2</sup></p>
          </div>
        </div>
      </div>
    </div>
  );
}
