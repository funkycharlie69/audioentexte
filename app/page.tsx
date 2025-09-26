
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"
import { UtmCapture } from "@/components/utm-capture";
// import { ProsUseCasesSection } from "@/components/pro-use-case-section";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <UtmCapture />
        <HeroSection />
        {/* <ProsUseCasesSection /> */}
        <FeaturesSection />
        <TestimonialsSection />
        <WaitlistSection />
        <Footer />
      </main>
    </>
  )
}
