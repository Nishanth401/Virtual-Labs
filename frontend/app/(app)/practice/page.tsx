import { Metadata } from "next";
import { CodingSheetsView } from "@/components/practice/coding-sheets-view";

export const metadata: Metadata = {
  title: "Master Coding Practice & Interview Roadmaps | Virtual Labs",
  description:
    "Master LeetCode Top Interview 150, LeetCode 75, and Top SQL 50 with company tags, difficulty ratings, revision notes, and multi-platform practice links.",
};

export default function PracticePage() {
  return (
    <div className="container mx-auto py-6">
      <CodingSheetsView />
    </div>
  );
}
