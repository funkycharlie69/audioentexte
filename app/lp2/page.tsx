
import { UtmCapture } from "@/components/utm-capture";
import Fold from "@/components/tailwind/fold";
import Logos from "@/components/tailwind/logos";
import { Grid } from "lucide-react";   
import GridFeatures from "@/components/tailwind/grid-features";
import Stack from "@/components/tailwind/stack";
// import { ProsUseCasesSection } from "@/components/pro-use-case-section";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <UtmCapture />
        <Fold />
        <Logos />
        <GridFeatures />
        <Stack />
      </main>
    </>
  )
}
