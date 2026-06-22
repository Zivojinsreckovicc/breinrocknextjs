import {
  WebsitePolicyPage,
  buildWebsitePolicyMetadata,
} from "@/components/policy/WebsitePolicyPage";

const SLUG = "cookie-policy";

export const generateMetadata = () => buildWebsitePolicyMetadata(SLUG);

export default function Page() {
  return <WebsitePolicyPage slug={SLUG} />;
}
