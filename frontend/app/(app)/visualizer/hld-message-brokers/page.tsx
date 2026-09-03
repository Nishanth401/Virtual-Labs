import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Message Brokers & Kafka Partitions | System Design Studio",
  description: "Interactive Kafka topic partitions and consumer group offset commit visualizer.",
};

export default function HldMessageBrokersPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="kafka" />
    </div>
  );
}
