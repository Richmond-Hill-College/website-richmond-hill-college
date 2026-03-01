import Link from "next/link";

export const metadata = {
  title: "Richmond Hill College | Gestion des soins de santé et de la technologie",
  description:
    "Le Collège Richmond Hill de gestion des soins de santé et de la technologie propose des cours en ligne, hybrides et en personne. Débloquer le potentiel, construire l'avenir.",
};

export default function FrenchHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 tablet:px-8 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl tablet:text-5xl">
          Richmond Hill College
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Gestion des soins de santé et de la technologie — Version française.
        </p>
        <p className="mt-6 text-slate-500">
          Le contenu complet en français sera bientôt disponible. En attendant, visitez la version anglaise.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          style={{
            backgroundColor: "#f6520a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          }}
        >
          English version
        </Link>
      </div>
    </div>
  );
}
