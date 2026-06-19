import { CheckIcon } from "./icons";
import { landingHeroComparisonRows } from "@/data/home";
import type { HeroCompareRow } from "@/data/home";

type LandingHeroComparisonProps = {
  rows?: HeroCompareRow[];
};

/**
 * Simplified two-column comparison (Feature + Breinrock) for landing hero aside.
 */
export function LandingHeroComparison({
  rows = landingHeroComparisonRows,
}: LandingHeroComparisonProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-arctic-white/10 bg-midnight-frame/50 shadow-xl shadow-black/20 backdrop-blur-sm">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Breinrock feature highlights</caption>
        <thead>
          <tr className="border-b border-arctic-white/10">
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-steel-neutral/60 sm:px-5 sm:py-4 sm:text-sm"
            >
              Feature
            </th>
            <th
              scope="col"
              className="bg-action-blue/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-action-blue sm:px-5 sm:py-4 sm:text-sm"
            >
              Breinrock
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.feature}
              className="border-b border-arctic-white/5 last:border-b-0"
            >
              <th
                scope="row"
                className="px-4 py-3 text-xs font-medium leading-snug text-arctic-white sm:px-5 sm:py-3.5 sm:text-sm"
              >
                {row.feature}
              </th>
              <td className="bg-action-blue/[0.07] px-4 py-3 align-top sm:px-5 sm:py-3.5">
                <span className="flex items-start gap-2 text-xs text-arctic-white sm:text-sm">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-action-blue sm:size-5" />
                  {row.breinrock}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
