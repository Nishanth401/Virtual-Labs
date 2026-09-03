import { CompanyTracks } from "@/components/prep-suite/company-tracks";

export const metadata = {
  title: "Targeted Company Preparation Tracks | Virtual Labs",
  description: "Curated engineering tracks for Google, Amazon, Meta, and Microsoft featuring round breakdowns, topic weightings, and practice checklists.",
};

export default function CompanyTracksPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <CompanyTracks />
    </div>
  );
}
