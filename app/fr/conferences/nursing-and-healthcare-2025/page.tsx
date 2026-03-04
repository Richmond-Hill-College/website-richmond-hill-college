import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soins infirmiers et santé 2025",
  description:
    "Conférence Avancer en soins infirmiers et en santé : un dialogue mondial. Toronto, Canada, 28–30 novembre 2025. Inscription, soumission de résumés, rencontres avec des professionnels de la santé du monde entier.",
  path: "conferences/nursing-and-healthcare-2025",
  locale: "fr",
});

const navItems = [
  { href: "/fr/conferences/nursing-and-healthcare-2025/conference-main-page", label: "Page principale" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/registration", label: "Inscription" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/submit-abstract", label: "Soumettre un résumé" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/invitation-letter", label: "Lettre d'invitation" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/sponsorship", label: "Commandites" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/accommodations", label: "Hébergement" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/program-table", label: "Tableau du programme" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/abstract-proceeding-book", label: "Résumés et actes" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/venue", label: "Lieu" },
  { href: "/fr/conferences/nursing-and-healthcare-2025/contact-1", label: "Contact" },
];

export default function NursingHealthcare2025PageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-6" aria-label="Sections de la conférence">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            {label}
          </Link>
        ))}
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Soins infirmiers et santé 2025
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Conférence Avancer en soins infirmiers et en santé : un dialogue mondial
      </p>
      <p className="mt-1 text-slate-600">Toronto, Canada — 28–30 novembre 2025</p>

      <section className="mt-10" aria-labelledby="welcome-heading">
        <h2 id="welcome-heading" className="text-2xl font-bold text-slate-900">
          Message de bienvenue du président de la conférence
        </h2>
        <p className="mt-4 text-slate-600">
          Chers collègues, distingués invités et acteurs de la santé,
        </p>
        <p className="mt-2 text-slate-600">
          Au nom du Comité d&apos;organisation et du Comité scientifique, j&apos;ai l&apos;honneur et le
          privilège de vous souhaiter la bienvenue à la conférence Avancer en soins infirmiers et
          en santé : un dialogue mondial, qui se tiendra à Toronto, Canada, du 28 au 30 novembre 2025.
        </p>
        <p className="mt-2 text-slate-600">
          Cette conférence réunit infirmières, professionnels de la santé, chercheurs, décideurs et
          leaders du secteur du monde entier, unis par une mission commune : faire avancer l&apos;avenir
          des soins infirmiers et des soins de santé interdisciplinaires par l&apos;innovation, la
          collaboration et la pratique fondée sur les données probantes.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="why-heading">
        <h3 id="why-heading" className="text-xl font-bold text-slate-900">
          Pourquoi cette conférence compte
        </h3>
        <p className="mt-2 text-slate-600">
          À l&apos;ère des avancées technologiques rapides et des défis mondiaux en santé, le rôle
          des soins infirmiers n&apos;a jamais été aussi crucial. Cette conférence vise à favoriser le
          dialogue, l&apos;échange de connaissances et des stratégies concrètes pour relever les défis
          de la profession.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="themes-heading">
        <h3 id="themes-heading" className="text-xl font-bold text-slate-900">
          Thèmes et opportunités
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li><strong className="text-slate-800">Innovations dans la pratique infirmière</strong></li>
          <li><strong className="text-slate-800">Politiques et gestion des soins de santé</strong></li>
          <li><strong className="text-slate-800">Santé mentale et bien-être</strong></li>
          <li><strong className="text-slate-800">Sécurité des patients et qualité des soins</strong></li>
          <li><strong className="text-slate-800">Défis mondiaux en santé</strong></li>
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/fr/conferences/nursing-and-healthcare-2025/registration"
          className="cta-primary rounded-md px-4 py-2 text-sm font-medium"
        >
          S&apos;inscrire
        </Link>
        <Link
          href="/fr/conferences/nursing-and-healthcare-2025/conference-main-page"
          className="inline-block font-medium text-slate-800 hover:underline"
        >
          Plus d&apos;informations
        </Link>
      </div>
    </div>
  );
}
