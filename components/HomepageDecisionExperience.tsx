"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  GraduationCap,
  HeartPulse,
  Languages,
  Laptop,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Locale = "en" | "fr";
type Learner = "international" | "career-change" | "upskill";
type Interest = "healthcare" | "technology" | "business";
type Format = "online" | "hybrid" | "in-person";

const copy = {
  en: {
    eyebrow: "Your 60-second pathway finder",
    title: "Start with your goal. Leave with a clear next step.",
    intro:
      "Answer three quick questions and we’ll point you to the most relevant place to begin. No account or personal information required.",
    steps: ["Your background", "Career direction", "Learning format"],
    learnerQuestion: "Which best describes you?",
    learners: {
      international: ["Internationally educated", "I want to translate prior education or experience into a Canadian pathway."],
      "career-change": ["Changing careers", "I want focused training for a new professional direction."],
      upskill: ["Building new skills", "I want practical skills that strengthen my current career."],
    },
    interestQuestion: "Where do you want to grow?",
    interests: {
      healthcare: ["Healthcare & human services", "Patient-facing, administrative and support pathways."],
      technology: ["Technology & AI", "Digital, AI and workplace technology skills."],
      business: ["Business & leadership", "Management, service and professional skills."],
    },
    formatQuestion: "How do you prefer to learn?",
    formats: {
      online: ["Online", "Learn from anywhere."],
      hybrid: ["Hybrid", "Combine online and in-person learning."],
      "in-person": ["In person", "Learn face to face in Richmond Hill."],
    },
    back: "Back",
    restart: "Start again",
    resultEyebrow: "Your recommended starting point",
    resultTitle: "A focused pathway, based on your answers",
    resultPrefix: "Start with",
    resultSuffix: "and filter for",
    resultFormat: "delivery. An advisor can confirm current availability, requirements and the right next step for your background.",
    browse: "View recommended options",
    advisor: "Talk to an advisor",
    privacy: "Your answers stay in this browser and are not submitted.",
    proofTitle: "Clear information before you commit",
    proofIntro:
      "We want every learner to understand the offering, delivery format and next step before registering.",
    proof: [
      ["28", "current course options"],
      ["EN / FR", "bilingual website guidance"],
      ["3 formats", "online, hybrid and in person"],
    ],
    statusTitle: "Program-status transparency",
    status:
      "Richmond Hill College is currently pursuing registration and program approvals under Ontario’s career-college legislation. Current course pages identify the available learning option and direct you to the appropriate registration platform. Contact us before registering if you need confirmation of a program’s status or credential.",
    statusLink: "Read our institutional information",
    journeyEyebrow: "A simpler admissions journey",
    journeyTitle: "Know what happens next",
    journey: [
      ["Explore", "Use the pathway finder and compare current course options."],
      ["Confirm", "Ask an advisor about fit, requirements, schedule and program status."],
      ["Register", "Continue to the official registration platform only when you are ready."],
    ],
  },
  fr: {
    eyebrow: "Votre outil d’orientation en 60 secondes",
    title: "Partez de votre objectif. Repartez avec une prochaine étape claire.",
    intro:
      "Répondez à trois questions rapides et nous vous indiquerons le meilleur point de départ. Aucun compte ni renseignement personnel requis.",
    steps: ["Votre parcours", "Domaine visé", "Mode d’apprentissage"],
    learnerQuestion: "Quelle situation vous décrit le mieux?",
    learners: {
      international: ["Formé à l’étranger", "Je veux adapter mes études ou mon expérience à un parcours canadien."],
      "career-change": ["En réorientation", "Je cherche une formation ciblée pour changer de voie professionnelle."],
      upskill: ["En perfectionnement", "Je veux acquérir des compétences pratiques pour progresser."],
    },
    interestQuestion: "Dans quel domaine souhaitez-vous progresser?",
    interests: {
      healthcare: ["Santé et services à la personne", "Parcours cliniques, administratifs et de soutien."],
      technology: ["Technologie et IA", "Compétences numériques, en IA et technologies de travail."],
      business: ["Affaires et leadership", "Gestion, services et compétences professionnelles."],
    },
    formatQuestion: "Comment préférez-vous apprendre?",
    formats: {
      online: ["En ligne", "Apprenez où que vous soyez."],
      hybrid: ["Hybride", "Combinez l’apprentissage en ligne et en personne."],
      "in-person": ["En personne", "Apprenez sur place à Richmond Hill."],
    },
    back: "Retour",
    restart: "Recommencer",
    resultEyebrow: "Votre point de départ recommandé",
    resultTitle: "Un parcours ciblé selon vos réponses",
    resultPrefix: "Commencez par",
    resultSuffix: "et filtrez selon le mode",
    resultFormat: "d’apprentissage. Une conseillère ou un conseiller peut confirmer les disponibilités, les exigences et la prochaine étape adaptée à votre parcours.",
    browse: "Voir les options recommandées",
    advisor: "Parler à un conseiller",
    privacy: "Vos réponses restent dans ce navigateur et ne sont pas transmises.",
    proofTitle: "Des renseignements clairs avant de vous engager",
    proofIntro:
      "Chaque personne doit comprendre l’offre, le mode d’apprentissage et la prochaine étape avant de s’inscrire.",
    proof: [
      ["28", "options de cours actuelles"],
      ["FR / EN", "orientation bilingue sur le site"],
      ["3 modes", "en ligne, hybride et en personne"],
    ],
    statusTitle: "Transparence sur le statut des programmes",
    status:
      "Le Collège Richmond Hill poursuit actuellement son inscription et l’approbation de ses programmes conformément à la législation ontarienne sur les collèges d’enseignement professionnel. Les pages de cours présentent les options offertes et dirigent vers la plateforme d’inscription appropriée. Communiquez avec nous avant de vous inscrire si vous devez confirmer le statut ou le titre associé à un programme.",
    statusLink: "Consulter nos renseignements institutionnels",
    journeyEyebrow: "Un parcours d’admission plus simple",
    journeyTitle: "Sachez ce qui vient ensuite",
    journey: [
      ["Explorer", "Utilisez l’outil d’orientation et comparez les options actuelles."],
      ["Confirmer", "Validez l’adéquation, les exigences, l’horaire et le statut avec un conseiller."],
      ["S’inscrire", "Passez à la plateforme officielle seulement lorsque vous êtes prêt."],
    ],
  },
} as const;

const learnerIcons = {
  international: Languages,
  "career-change": BriefcaseBusiness,
  upskill: GraduationCap,
};

const interestIcons = {
  healthcare: HeartPulse,
  technology: Laptop,
  business: Sparkles,
};

const formatIcons = {
  online: Laptop,
  hybrid: Clock3,
  "in-person": MapPin,
};

export function HomepageDecisionExperience({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const prefix = locale === "fr" ? "/fr" : "";
  const [learner, setLearner] = useState<Learner | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [format, setFormat] = useState<Format | null>(null);

  const step = learner === null ? 0 : interest === null ? 1 : format === null ? 2 : 3;
  const recommendation = useMemo(() => {
    if (!learner || !interest || !format) return null;
    const route = learner === "international" ? "/bridging-programs" : "/courses";
    return {
      href: `${prefix}${route}`,
      learner: t.learners[learner][0],
      interest: t.interests[interest][0],
      format: t.formats[format][0].toLocaleLowerCase(locale === "fr" ? "fr-CA" : "en-CA"),
    };
  }, [format, interest, learner, locale, prefix, t]);

  function goBack() {
    if (step === 3) setFormat(null);
    else if (step === 2) setInterest(null);
    else if (step === 1) setLearner(null);
  }

  function restart() {
    setLearner(null);
    setInterest(null);
    setFormat(null);
  }

  return (
    <>
      <section id="pathway-finder" className="relative -mt-1 bg-[#f4f7fb] px-4 py-14 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20" aria-labelledby="pathway-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-rhc-primary">{t.eyebrow}</span>
              <h2 id="pathway-title" className="mt-3 text-3xl font-bold tracking-tight text-rhc-primary-dark sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">{t.intro}</p>
              <div className="mt-7 hidden space-y-3 lg:block" aria-label={locale === "fr" ? "Progression" : "Progress"}>
                {t.steps.map((label, index) => (
                  <div key={label} className={`flex items-center gap-3 text-sm font-semibold ${index <= Math.min(step, 2) ? "text-rhc-primary-dark" : "text-slate-400"}`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${index < step ? "border-rhc-primary bg-rhc-primary text-white" : index === step ? "border-rhc-primary text-rhc-primary" : "border-slate-300"}`}>
                      {index < step ? <Check className="h-4 w-4" aria-hidden /> : index + 1}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(25,38,64,0.09)] sm:p-7 tablet:p-9">
              {step < 3 && (
                <div className="mb-7 flex items-center gap-2 lg:hidden" aria-hidden>
                  {t.steps.map((_, index) => (
                    <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-rhc-primary" : "bg-slate-200"}`} />
                  ))}
                </div>
              )}

              {step === 0 && (
                <ChoiceGrid<Learner>
                  question={t.learnerQuestion}
                  options={t.learners}
                  icons={learnerIcons}
                  onSelect={setLearner}
                />
              )}
              {step === 1 && (
                <ChoiceGrid<Interest>
                  question={t.interestQuestion}
                  options={t.interests}
                  icons={interestIcons}
                  onSelect={setInterest}
                />
              )}
              {step === 2 && (
                <ChoiceGrid<Format>
                  question={t.formatQuestion}
                  options={t.formats}
                  icons={formatIcons}
                  onSelect={setFormat}
                />
              )}
              {step === 3 && recommendation && (
                <div aria-live="polite">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-rhc-primary">{t.resultEyebrow}</span>
                  <h3 className="mt-3 text-2xl font-bold text-rhc-primary-dark sm:text-3xl">{t.resultTitle}</h3>
                  <p className="mt-4 rounded-2xl bg-slate-50 p-5 text-base leading-7 text-slate-700 ring-1 ring-slate-200">
                    {t.resultPrefix} <strong>{recommendation.interest}</strong> {t.resultSuffix} <strong>{recommendation.format}</strong> {t.resultFormat}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href={recommendation.href} className="cta-primary inline-flex min-h-[48px] items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">
                      {t.browse}<ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                    <Link href={`${prefix}/contact`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-rhc-primary-dark transition hover:border-slate-400 hover:bg-slate-50">
                      <MessageCircle className="mr-2 h-4 w-4" aria-hidden />{t.advisor}
                    </Link>
                  </div>
                  <button type="button" onClick={restart} className="mt-5 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline">
                    {t.restart}
                  </button>
                </div>
              )}

              {step > 0 && step < 3 && (
                <button type="button" onClick={goBack} className="mt-6 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline">
                  ← {t.back}
                </button>
              )}
              <p className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />{t.privacy}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-rhc-primary-dark px-4 py-14 text-white sm:px-6 tablet:px-8 tablet:py-16" aria-labelledby="trust-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <h2 id="trust-title" className="text-2xl font-bold sm:text-3xl">{t.proofTitle}</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-300">{t.proofIntro}</p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {t.proof.map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-white/15 bg-white/[0.07] p-5">
                  <dt className="text-2xl font-bold text-white">{value}</dt>
                  <dd className="mt-1 text-sm leading-5 text-slate-300">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 sm:flex sm:items-start sm:gap-4 tablet:p-6">
            <ShieldCheck className="h-6 w-6 shrink-0 text-amber-300" aria-hidden />
            <div className="mt-3 sm:mt-0">
              <h3 className="font-semibold text-white">{t.statusTitle}</h3>
              <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-200">{t.status}</p>
              <Link href={`${prefix}/about-us`} className="mt-3 inline-flex items-center text-sm font-semibold text-amber-200 hover:text-white hover:underline">
                {t.statusLink}<ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 tablet:px-8 tablet:py-20" aria-labelledby="journey-title">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-rhc-primary">{t.journeyEyebrow}</span>
          <h2 id="journey-title" className="mt-3 text-3xl font-bold tracking-tight text-rhc-primary-dark sm:text-4xl">{t.journeyTitle}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {t.journey.map(([title, description], index) => (
              <li key={title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rhc-primary text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-rhc-primary-dark">{title}</h3>
                <p className="mt-2 leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function ChoiceGrid<T extends string>({
  question,
  options,
  icons,
  onSelect,
}: {
  question: string;
  options: Record<T, readonly [string, string]>;
  icons: Record<T, LucideIcon>;
  onSelect: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-bold text-rhc-primary-dark sm:text-3xl">{question}</legend>
      <div className="mt-6 grid gap-3">
        {(Object.entries(options) as [T, readonly [string, string]][]).map(([value, [title, description]]) => {
          const Icon = icons[value] as React.ElementType;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className="group flex min-h-[76px] w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-rhc-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-rhc-primary transition group-hover:bg-rhc-primary group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-rhc-primary-dark">{title}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-600">{description}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-rhc-primary" aria-hidden />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
