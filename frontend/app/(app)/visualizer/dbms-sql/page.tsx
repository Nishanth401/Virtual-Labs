import { DBMSSQLVisualizer } from "@/components/visualizer/advanced-suite/dbms-sql-visualizer";

export const metadata = {
  title: "DBMS & SQL Visualizer | Virtual Labs",
  description: "Interactive visualization of B-Tree indexing hierarchies, disk page lookups, and ACID transactional guarantees.",
};

export default function DBMSSQLPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <DBMSSQLVisualizer />
    </div>
  );
}
