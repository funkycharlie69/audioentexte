import { ReunionsHero } from "@/components/reunions-hero"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"
import { UtmCapture } from "@/components/utm-capture"

export default function ReunionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <UtmCapture />
      <ReunionsHero />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
