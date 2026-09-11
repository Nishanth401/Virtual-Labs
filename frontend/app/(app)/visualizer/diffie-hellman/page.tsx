import { CryptographyVisualizer } from "@/components/visualizer/cryptography-suite/cryptography-visualizer";

export const metadata = {
  title: "Diffie-Hellman Key Exchange Visualizer | Cryptography Studio",
  description: "Secure public-channel shared secret negotiation via modular exponentiation.",
};

export default function DiffieHellmanPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <CryptographyVisualizer initialModule="diffie-hellman" />
    </div>
  );
}
