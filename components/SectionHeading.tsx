import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ title, children }: SectionHeadingProps) {
  return (
    <div className="mb-6 tablet:mb-8">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl">{title}</h2>
      {children && <div className="mt-2 text-slate-600 tablet:mt-3">{children}</div>}
    </div>
  );
}
