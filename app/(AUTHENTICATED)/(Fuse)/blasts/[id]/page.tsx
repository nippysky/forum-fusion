import React from "react";
import Header from "@/components/shared/header";
import HomeLeft from "@/components/shared/sidebar/home/home-left";
import HomeRight from "@/components/shared/sidebar/home/home-right";

import BackButton from "@/components/shared/back-button";
import BlastDetails from "@/components/blasts/blast-details";

export default function IndividualBlast() {
  return (
    <section className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] lg:px-20 md:px-10 px-5">
      <Header />
      <main className="w-full flex-1 mt-6 pb-20">
        {/* XL Layout (3 columns) */}
        <div className="hidden xl:grid xl:grid-cols-[280px_1fr_280px] gap-5">
          <HomeLeft />
          <section className="flex flex-col gap-6">
            <BackButton />
            <BlastDetails />
          </section>
          <HomeRight />
        </div>

        {/* LG Layout (2 columns: content + right sidebar) */}
        <div className="hidden lg:grid xl:hidden grid-cols-[1fr_300px] gap-10">
          <section className="flex flex-col gap-6">
            <BackButton />
            <BlastDetails />
          </section>
          <HomeRight />
        </div>

        {/* Mobile + Tablet (<lg): stacked layout */}
        <div className="flex flex-col gap-6 lg:hidden">
          <BackButton />
          <BlastDetails />
        </div>
      </main>
    </section>
  );
}
