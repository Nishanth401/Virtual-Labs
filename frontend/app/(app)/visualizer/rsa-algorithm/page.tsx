import { CryptographyVisualizer } from "@/components/visualizer/cryptography-suite/cryptography-visualizer";

export const metadata = {
  title: "RSA Public-Key Algorithm Visualizer | Cryptography Studio",
  description: "Asymmetric public key cryptography, Euler totient, modular exponentiation, and key generation.",
};

export default function RsaAlgorithmPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <CryptographyVisualizer initialModule="rsa-algorithm" />
    </div>
  );
}
