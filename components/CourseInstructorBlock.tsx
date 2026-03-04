"use client";

import { useState } from "react";
import Image from "next/image";

export type CourseInstructor = {
  name: string;
  role: string;
  image?: string;
};

type Props = {
  instructor: CourseInstructor;
  /** French labels when true. */
  localeFr?: boolean;
};

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-semibold text-slate-600 ring-2 ring-slate-200/60"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function CourseInstructorBlock({ instructor, localeFr }: Props) {
  const [imageError, setImageError] = useState(false);
  const showImage = instructor.image && !imageError;
  const label = localeFr ? "Organisateur et instructeur" : "Organizer & Instructor";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
      <div className="flex items-center gap-3">
        {showImage ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-2 ring-slate-200/60">
            <Image
              src={instructor.image!}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <InitialsAvatar name={instructor.name} />
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="font-semibold text-slate-900">{instructor.name}</p>
        </div>
      </div>
    </div>
  );
}
