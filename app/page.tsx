import Header from "@/components/shared/header";
import HeroPostInput from "@/components/shared/hero-post-input";
import PostFeed from "@/components/shared/post-feed";
import SidebarLeft from "@/components/shared/sidebar-left";
import SidebarRight from "@/components/shared/sidebar-right";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] lg:px-20 md:px-10 px-5">
      <Header />
      <main className="w-full flex-1 mt-6 pb-20">
        {/* XL Layout (3 columns) */}
        <div className="hidden xl:grid xl:grid-cols-[300px_1fr_350px] gap-10">
          <SidebarLeft />
          <section className="flex flex-col gap-6">
            <HeroPostInput />
            <PostFeed />
          </section>
          <SidebarRight />
        </div>

        {/* LG Layout (2 columns: content + right sidebar) */}
        <div className="hidden lg:grid xl:hidden grid-cols-[1fr_300px] gap-10">
          <section className="flex flex-col gap-6">
            <HeroPostInput />
            <PostFeed />
          </section>
          <SidebarRight />
        </div>

        {/* Mobile + Tablet (<lg): stacked layout */}
        <div className="flex flex-col gap-6 lg:hidden">
          <HeroPostInput />
          <PostFeed />
          <SidebarLeft />
          <SidebarRight />
        </div>
      </main>
    </section>
  );
}
