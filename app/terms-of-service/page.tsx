import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Richmond Hill College of Healthcare and Technology Management. Rules and conditions for using our website and services.",
  path: "terms-of-service",
});

const lastUpdated = "February 2025";

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
      <p className="mt-4 text-lg text-slate-600">
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website,
        programs, and services offered by Richmond Hill College of Healthcare and Technology
        Management (&quot;College,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using
        our services, you agree to be bound by these Terms.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
        <p className="mt-2 text-slate-600">
          By using our website or services, you confirm that you have read, understood, and
          agree to these Terms and our Privacy Policy. If you do not agree, you must not use
          our services. We may update these Terms from time to time; continued use after
          changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">2. Description of Services</h2>
        <p className="mt-2 text-slate-600">
          We provide educational programs, courses, conferences, and related services in
          healthcare and technology management. Service descriptions on our website are for
          general information and may be updated. We do not guarantee that any particular
          program, course, or feature will remain available indefinitely.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">3. Eligibility and Accounts</h2>
        <p className="mt-2 text-slate-600">
          You must be at least the age of majority in your jurisdiction and able to form a
          binding contract to use our services. You are responsible for maintaining the
          confidentiality of your account credentials and for all activity under your
          account. You must provide accurate and complete information and notify us promptly
          of any unauthorized use.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">4. Fees, Payment, and Refunds</h2>
        <p className="mt-2 text-slate-600">
          Fees for programs and services are as stated at the time of registration or
          purchase. You agree to pay all applicable fees. Refund and cancellation policies
          are as specified for each program or product; we are not obligated to provide
          refunds except as expressly stated in those policies or required by law.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">5. Intellectual Property</h2>
        <p className="mt-2 text-slate-600">
          All content on our website and in our materials—including text, graphics, logos,
          course materials, and software—is owned by or licensed to the College and is
          protected by copyright and other intellectual property laws. You may not copy,
          modify, distribute, or create derivative works without our prior written consent,
          except for personal, non-commercial use as permitted by law.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">6. Acceptable Use</h2>
        <p className="mt-2 text-slate-600">
          You agree to use our services only for lawful purposes and in accordance with these
          Terms. You must not: use the services in any way that violates applicable laws;
          attempt to gain unauthorized access to our systems or other users&apos; accounts;
          transmit malware or harmful code; harass, abuse, or harm others; or use our
          services to send spam or unsolicited communications. We may suspend or terminate
          access for violations.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">7. Disclaimers</h2>
        <p className="mt-2 text-slate-600">
          Our website and services are provided &quot;as is&quot; and &quot;as available&quot; without
          warranties of any kind, either express or implied, including but not limited to
          implied warranties of merchantability, fitness for a particular purpose, or
          non-infringement. We do not warrant that the services will be uninterrupted,
          error-free, or free of harmful components. Completion of our programs does not
          guarantee any particular employment, certification outcome, or regulatory
          recognition; you are responsible for verifying requirements in your jurisdiction.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">8. Limitation of Liability</h2>
        <p className="mt-2 text-slate-600">
          To the maximum extent permitted by applicable law, the College, its officers,
          directors, employees, and agents shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or for any loss of profits, data, or
          goodwill, arising out of or in connection with your use of our services. Our total
          liability for any claims arising from or related to these Terms or the services
          shall not exceed the amount you paid to us in the twelve (12) months preceding the
          claim. Some jurisdictions do not allow the exclusion or limitation of certain
          damages; in such jurisdictions, our liability will be limited to the fullest
          extent permitted by law.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">9. Indemnification</h2>
        <p className="mt-2 text-slate-600">
          You agree to indemnify, defend, and hold harmless the College and its officers,
          directors, employees, agents, and affiliates from and against any and all claims,
          damages, losses, costs, and expenses (including reasonable legal fees) arising out
          of or related to your use of the services, your violation of these Terms, or your
          violation of any rights of another party.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">10. Termination</h2>
        <p className="mt-2 text-slate-600">
          We may suspend or terminate your access to our services at any time, with or
          without cause or notice. You may stop using our services at any time. Upon
          termination, your right to use the services ceases immediately. Provisions that
          by their nature should survive (including disclaimers, limitation of liability, and
          indemnification) will survive termination.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">11. Governing Law and Disputes</h2>
        <p className="mt-2 text-slate-600">
          These Terms are governed by the laws of the Province of Ontario and the federal
          laws of Canada applicable therein, without regard to conflict of law principles.
          Any dispute arising from or relating to these Terms or the services shall be
          subject to the exclusive jurisdiction of the courts of the Province of Ontario.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">12. General</h2>
        <p className="mt-2 text-slate-600">
          If any provision of these Terms is held to be invalid or unenforceable, the
          remaining provisions will remain in effect. Our failure to enforce any right or
          provision does not constitute a waiver. These Terms, together with our Privacy
          Policy and any program-specific terms, constitute the entire agreement between you
          and the College regarding the services.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">13. Contact</h2>
        <p className="mt-2 text-slate-600">
          For questions about these Terms, please contact us:
        </p>
        <address className="mt-2 not-italic text-slate-600">
          <p>Richmond Hill College of Healthcare and Technology Management</p>
          <p>1 Sala Drive, Richmond Hill, Ontario, Canada</p>
          <p>
            Email:{" "}
            <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 underline hover:text-slate-900">
              info@richmondhillcollege.ca
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+18553286065" className="text-slate-800 underline hover:text-slate-900">
              Toll-Free +1 855 (328) 6065
            </a>
          </p>
        </address>
      </section>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
        <Link
          href="/privacy-policy"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Privacy Policy
        </Link>
        <Link
          href="/support"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Support
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
