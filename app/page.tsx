"use client";

import { ApiDocsDrawer } from "@/components/ApiDocsDrawer";
import { ApiSection }    from "@/components/ApiSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer }         from "@/components/Footer";
import { HeroSection }    from "@/components/HeroSection";
import { Navbar }         from "@/components/Navbar";
import { WorkSection }    from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full">
        <HeroSection />
        <ApiSection />
        <WorkSection />
        <ContactSection />
        <Footer />
      </main>
      {/* Global drawer — rendered outside main so it stacks correctly */}
      <ApiDocsDrawer />
    </>
  );
}
