import { CryptographyVisualizer } from "@/components/visualizer/cryptography-suite/cryptography-visualizer";

export const metadata = {
  title: "HMAC & Digital Signatures Visualizer | Cryptography Studio",
  description: "Message authentication codes, tamper detection, private key signing and public verification.",
};

export default function HmacSignaturesPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <CryptographyVisualizer initialModule="hmac-signatures" />
    </div>
  );
}
