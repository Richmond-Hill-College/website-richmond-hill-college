import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contactez le Collège Richmond Hill. Une question ? Écrivez-nous via notre formulaire. 1 Sala Drive, Richmond Hill, Ontario. Sans frais +1 855 (328) 6065.",
  path: "contact",
  locale: "fr",
});

export default function ContactPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">Nous joindre</h1>
      <p className="mt-4 text-lg text-slate-600 tablet:mt-5">
        Vous avez une question ou besoin d&apos;aide ? N&apos;hésitez pas à nous contacter à l&apos;aide du
        formulaire ci-dessous. Nous vous répondrons sous peu.
      </p>

      <div className="mt-10 tablet:mt-14 grid gap-8 tablet:gap-12 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm tablet:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Envoyer un message</h2>
          <ContactForm locale="fr" />
        </div>
        <div>
          <ContactBlock locale="fr" />
        </div>
      </div>
    </div>
  );
}
