import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description:
    "Get support from Richmond Hill College. FAQ, contact options, and resources for students and visitors.",
  path: "support",
});

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Support
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        We are here to help. Find answers to common questions, contact options, and
        resources below.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
        <p className="mt-2 text-slate-600">
          Many questions about our programs, courses, conferences, and registration are
          answered in our FAQ. Check there first for quick answers.
        </p>
        <Link
          href="/faq"
          className="mt-4 inline-flex items-center text-slate-800 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Visit FAQ →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
        <p className="mt-2 text-slate-600">
          For program inquiries, registration help, or general questions, use our contact
          form or reach us by phone or email. We aim to respond within business days;
          response times may vary during peak periods.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center text-slate-800 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
          >
            Contact form →
          </Link>
        </div>
        <address className="mt-4 not-italic text-slate-600">
          <p><strong>Richmond Hill College of Healthcare and Technology Management</strong></p>
          <p>1 Sala Drive, Richmond Hill, Ontario, Canada</p>
          <p>
            Phone:{" "}
            <a href="tel:+18553286065" className="text-slate-800 underline hover:text-slate-900">
              Toll-Free +1 855 (328) 6065
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 underline hover:text-slate-900">
              info@richmondhillcollege.ca
            </a>
          </p>
        </address>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Account and Course Access</h2>
        <p className="mt-2 text-slate-600">
          If you have an account with us, you can manage your profile and access your
          courses from the account page. For login or access issues, contact us with your
          registered email so we can assist.
        </p>
        <Link
          href="/my-account"
          className="mt-4 inline-flex items-center text-slate-800 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          My Account →
        </Link>
      </section>

      <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Support disclaimer</h2>
        <p className="mt-2 text-sm text-slate-600">
          Support is provided on a best-effort basis. We do not guarantee a specific
          response time or outcome. For formal complaints or disputes, please refer to our{" "}
          <Link href="/terms-of-service" className="text-slate-800 underline hover:text-slate-900">
            Terms of Service
          </Link>
          . By using our support channels, you agree to communicate in a respectful manner;
          we reserve the right to decline or discontinue support in cases of abuse or
          violation of our terms.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
        <Link
          href="/privacy-policy"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Terms of Service
        </Link>
        <Link
          href="/contact"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
