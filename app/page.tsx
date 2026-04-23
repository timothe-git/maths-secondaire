import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cours de Mathématiques
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Des cours clairs, des exercices avec correctifs et des quiz pour
          progresser à ton rythme.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Link href="/premiere-secondaire" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5 text-3xl font-bold text-blue-700">
              1
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
              1ère Secondaire
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Découvre les chapitres de mathématiques de première secondaire.
            </p>
          </div>
        </Link>

        <Link href="/deuxieme-secondaire" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-5 text-3xl font-bold text-violet-700">
              2
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
              2ème Secondaire
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Découvre les chapitres de mathématiques de deuxième secondaire.
            </p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 bg-green-50 border border-green-100">
          <div className="text-3xl mb-3">📖</div>
          <div className="font-semibold text-green-800 mb-1">Cours</div>
          <div className="text-sm text-green-700">
            Théorie claire et structurée avec exemples
          </div>
        </div>
        <div className="rounded-2xl p-6 bg-orange-50 border border-orange-100">
          <div className="text-3xl mb-3">✏️</div>
          <div className="font-semibold text-orange-800 mb-1">Exercices</div>
          <div className="text-sm text-orange-700">
            Pratique avec correctifs détaillés
          </div>
        </div>
        <div className="rounded-2xl p-6 bg-violet-50 border border-violet-100">
          <div className="text-3xl mb-3">🎯</div>
          <div className="font-semibold text-violet-800 mb-1">Quiz</div>
          <div className="text-sm text-violet-700">
            Teste tes connaissances
          </div>
        </div>
      </div>
    </div>
  );
}
