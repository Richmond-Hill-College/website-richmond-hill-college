import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Richmond Hill College of Healthcare and Technology Management. How we collect, use, and protect your personal information.",
  path: "privacy-policy",
});

const lastUpdated = "February 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
      <p className="mt-4 text-lg text-slate-600">
        Richmond Hill College of Healthcare and Technology Management (&quot;we,&quot; &quot;us,&quot; or
        &quot;the College&quot;) is committed to protecting your privacy. This Privacy Policy
        describes how we collect, use, disclose, and safeguard your personal information when
        you use our website, services, and programs.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
        <p className="mt-2 text-slate-600">
          We may collect information you provide directly (e.g., name, email, phone, address,
          program interests, and communications), information collected automatically (e.g., IP
          address, device type, browser, pages visited), and information from cookies and
          similar technologies. We use this information to operate our services, communicate
          with you, improve our offerings, and comply with legal obligations.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Information</h2>
        <p className="mt-2 text-slate-600">
          We use your information to provide, maintain, and improve our programs and website;
          to process registrations, applications, and payments; to send administrative and
          promotional communications (where permitted); to respond to inquiries and support
          requests; to analyze usage and trends; and to comply with applicable laws and
          regulations.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">3. Cookies and Tracking</h2>
        <p className="mt-2 text-slate-600">
          Our website may use cookies and similar technologies to enhance your experience,
          remember preferences, and understand how the site is used. You may adjust your
          browser settings to limit or block cookies; some features may not function fully if
          you do so.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">4. Sharing and Disclosure</h2>
        <p className="mt-2 text-slate-600">
          We do not sell your personal information. We may share your information with service
          providers who assist our operations (under confidentiality obligations), with
          regulators or law enforcement when required by law, or in connection with a merger,
          sale, or transfer of assets, subject to applicable notice and consent requirements.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">5. Data Retention and Security</h2>
        <p className="mt-2 text-slate-600">
          We retain your information only as long as necessary for the purposes described in
          this policy or as required by law. We implement reasonable technical and
          organizational measures to protect your data; however, no method of transmission or
          storage over the Internet is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">6. Your Rights</h2>
        <p className="mt-2 text-slate-600">
          Depending on your location, you may have rights to access, correct, delete, or
          restrict processing of your personal information, or to object to certain uses. To
          exercise these rights or ask questions about our practices, contact us using the
          details below. We will respond in accordance with applicable law.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">7. Third-Party Links</h2>
        <p className="mt-2 text-slate-600">
          Our website may contain links to third-party sites. We are not responsible for the
          privacy practices of those sites. We encourage you to read their privacy policies
          before providing any personal information.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">8. Changes to This Policy</h2>
        <p className="mt-2 text-slate-600">
          We may update this Privacy Policy from time to time. We will post the revised
          version on this page and update the &quot;Last updated&quot; date. Continued use of our
          services after changes constitutes acceptance of the updated policy. We encourage
          you to review this page periodically.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">9. Contact Us</h2>
        <p className="mt-2 text-slate-600">
          For privacy-related questions or requests, contact us at:
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
          href="/terms-of-service"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Terms of Service
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
