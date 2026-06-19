/**
 * Open positions. Add roles here — the careers page renders them as an
 * expandable list. `applyHref` defaults to an email application; swap for an
 * ATS link when one exists.
 */
export type JobOpening = {
  id: string;
  title: string;
  type: string;
  department: string;
  location: string;
  description: string;
  applyHref: string;
};

export const jobOpenings: JobOpening[] = [
  {
    id: "python-support-engineer",
    title: "Python Support Engineer",
    type: "Full-time",
    department: "Engineering",
    location: "Limassol, Cyprus",
    description:
      "Join our growing fintech team in Limassol as a Python Engineer combining software engineering with internal technical support — solving practical business problems, automating workflows, and building tools that improve efficiency across the company.",
    applyHref:
      "mailto:welcome@breinrock.com?subject=Application%20%E2%80%94%20Python%20Support%20Engineer",
  },
];
