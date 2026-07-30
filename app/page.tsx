import { StoreProvider } from "@/components/store-provider";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Catalog } from "@/components/sections/catalog";
import { Benefits } from "@/components/sections/benefits";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Lifestyle } from "@/components/sections/lifestyle";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
  return (
    <StoreProvider>
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Benefits />
        <HowItWorks />
        <Lifestyle />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFloat />
      <Toaster position="bottom-center" />
    </StoreProvider>
  );
}
