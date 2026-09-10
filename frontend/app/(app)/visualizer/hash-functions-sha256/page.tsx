import { CryptographyVisualizer } from "@/components/visualizer/cryptography-suite/cryptography-visualizer";

export const metadata = {
  title: "Cryptographic Hash Functions (SHA-256) | Cryptography Studio",
  description: "Merkle-Damgård structure, avalanche effect, bit compression rounds, and pre-image resistance.",
};

export default function HashFunctionsSha256Page() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <CryptographyVisualizer initialModule="hash-functions" />
    </div>
  );
}
