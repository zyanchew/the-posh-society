"use client"

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import SocialCTA from "@/components/SocialMedia";
import EmailSubscribe from "@/components/EmailSubscribe";

export default function HomePage() {
return (
<section>
<div className="container mx-auto space-y-5">
    <Hero />
    <FAQ />
      <div className="mx-auto w-full max-w-md text-center">
        <SocialCTA />
        <EmailSubscribe />
      </div>
</div>
</section>
);
}