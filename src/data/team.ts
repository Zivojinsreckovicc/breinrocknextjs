/**
 * Team members shown in the "Meet the team" carousel on /about.
 * Order matches the legacy about page slides (leadership first, then by team).
 */
export type TeamMember = {
  image: string;
  name: string;
  role?: string;
};

export const team: TeamMember[] = [
  // Slide 1
  { image: "/imgs/team/row1-1.webp", name: "Zoran Radovanovic", role: "CEO / Founder" },
  { image: "/imgs/team/row3-4.webp", name: "Ivan Mladenovic", role: "Group Deputy CEO / Director UAE" },
  { image: "/imgs/team/row2-1.webp", name: "Miljana Delic", role: "Group Deputy CEO / Head Compliance" },
  // Slide 2
  { image: "/imgs/team/row4-4.webp", name: "Andrew Thomas", role: "Director Breinrock UK" },
  { image: "/imgs/team/jeandaniel.webp", name: "Jean Daniel Coendoz", role: "Director of Business Development Switzerland" },
  { image: "/imgs/team/row4-3.webp", name: "Bojana Simic", role: "Head of Risk Management / Director Canada" },
  { image: "/imgs/team/row1-4.webp", name: "Stefanos Nicolas", role: "Head of Happiness Department" },
  // Slide 3
  { image: "/imgs/team/row1-3.webp", name: "Tatyana Doncheva", role: "VP of Operations" },
  { image: "/imgs/team/row2-2.webp", name: "Lana Radmanovic", role: "Head of Internal Control" },
  { image: "/imgs/team/row2-4.webp", name: "Khader Sbeitani", role: "Head of Marketing" },
  { image: "/imgs/team/row2-3.webp", name: "Ksenia Krytsun", role: "Head of Onboarding Department" },
  // Slide 4
  { image: "/imgs/team/row1-2.webp", name: "Yiota Saulescu", role: "Relationship Manager" },
  { image: "/imgs/team/anastasia.webp", name: "Anastasia Havekes", role: "Relationship Manager" },
  { image: "/imgs/team/angela.webp", name: "Angela Catan", role: "Relationship Manager" },
  { image: "/imgs/team/row3-3.webp", name: "Ivana Nikic", role: "Deputy Head of Payments" },
];
