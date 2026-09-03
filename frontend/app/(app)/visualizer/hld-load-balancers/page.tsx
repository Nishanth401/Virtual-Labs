import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Load Balancers & API Gateways | System Design Studio",
  description: "Interactive L4 vs L7 load balancer and consistent hashing ring visualizer.",
};

export default function HldLoadBalancersPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="load-balancer" />
    </div>
  );
}
