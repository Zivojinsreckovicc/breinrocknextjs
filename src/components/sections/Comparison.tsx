import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { SectionHeading } from "./SectionHeading";
import { CheckIcon, MinusIcon } from "./icons";
import { comparisonRows as defaultRows } from "@/data/home";
import type { CompareRow } from "@/data/home";
import { SIGN_UP_URL } from "@/constants/links";

type ComparisonProps = {
  rows?: CompareRow[];
  /** Centered sign-up CTA below the table (landing pages). */
  showSignUpCta?: boolean;
};

/**
 * Feature comparison table: Breinrock vs a typical provider. Uses a semantic
 * `table`; on small screens it scrolls horizontally within a rounded card.
 */
export function Comparison({ rows = defaultRows, showSignUpCta = false }: ComparisonProps) {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Compare"
          title={
            <>
              How Breinrock Stands Apart{" "}
              <span className="text-action-blue">From Other Providers</span>
            </>
          }
        />

        <Reveal className="mt-14">
          <div className="overflow-x-auto rounded-2xl border border-arctic-white/10 bg-midnight-frame/60 backdrop-blur-sm">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Comparison of Breinrock features against a typical provider
              </caption>
              <thead>
                <tr className="border-b border-arctic-white/10">
                  <th
                    scope="col"
                    className="px-6 py-5 text-sm font-semibold uppercase tracking-wide text-steel-neutral/60"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="bg-action-blue/10 px-6 py-5 text-sm font-bold uppercase tracking-wide text-action-blue"
                  >
                    Breinrock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-sm font-semibold uppercase tracking-wide text-steel-neutral/60"
                  >
                    Typical Provider
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
                      className="px-6 py-5 text-sm font-medium text-arctic-white"
                    >
                      {row.feature}
                    </th>
                    <td className="bg-action-blue/[0.07] px-6 py-5 align-top">
                      <span className="flex items-start gap-2.5 text-sm text-arctic-white">
                        <CheckIcon className="mt-0.5 size-5 shrink-0 text-action-blue" />
                        {row.breinrock}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className="flex items-start gap-2.5 text-sm text-steel-neutral/50">
                        <MinusIcon className="mt-0.5 size-5 shrink-0 text-steel-neutral/40" />
                        {row.typical ?? "Not offered"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {showSignUpCta && (
          <div className="mt-12 flex justify-center">
            <Button href={SIGN_UP_URL} variant="primary" size="lg">
              Sign up now
              <ArrowRightIcon className="size-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
