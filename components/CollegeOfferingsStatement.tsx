import { COLLEGE_OFFERINGS, RHC_GLOBAL_BRIDGE_URL } from "@/lib/college-offerings";

type Props = { locale?: "en" | "fr"; className?: string };

export function CollegeOfferingsStatement({ locale = "en", className }: Props) {
  const [before, after] = COLLEGE_OFFERINGS[locale].split("RHC Global Bridge");
  return (
    <p className={className}>
      {before}<a href={RHC_GLOBAL_BRIDGE_URL} className="font-semibold underline underline-offset-2">RHC Global Bridge</a>{after}
    </p>
  );
}
