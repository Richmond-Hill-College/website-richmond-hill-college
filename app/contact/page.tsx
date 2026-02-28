import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Richmond Hill College. Have a question? Reach out via our contact form. 1 Sala Drive, Richmond Hill, Ontario. Toll-Free +1 855 (328) 6065.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contact us</h1>
      <p className="mt-4 text-lg text-slate-600">
        Have a question or need assistance? Feel free to reach out to us using the contact
        form below. We will get back to you soon.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
          <ContactForm />
        </div>
        <div>
          <ContactBlock />
        </div>
      </div>
    </div>
  );
}
