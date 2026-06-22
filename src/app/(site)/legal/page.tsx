import {
  WebsitePolicyPage,
  buildWebsitePolicyMetadata,
} from "@/components/policy/WebsitePolicyPage";

const SLUG = "legal";

export const generateMetadata = () => buildWebsitePolicyMetadata(SLUG);

export default function Page() {
  return <WebsitePolicyPage slug={SLUG} />;
}
