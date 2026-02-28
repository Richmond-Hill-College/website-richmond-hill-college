/**
 * Team and leadership for /about-us/team.
 * Extend with more entries as needed; optional slug can be used for future /about-us/team/[slug].
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Optional: link to dedicated page (e.g. message from the president). */
  href?: string;
  /** Optional: short bio or one-liner for card. */
  bio?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Soheila Hafezi",
    role: "President",
    href: "/message-from-the-president",
    bio: "President of Richmond Hill College. Leading our mission to empower internationally educated learners through Global Bridge Programs.",
  },
];
