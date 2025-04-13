import Header from "@/components/shared/header";
import HeroPostInput from "@/components/shared/hero-post-input";
import PostFeed from "@/components/shared/post-feed";
import SidebarLeft from "@/components/shared/sidebar-left";
import SidebarRight from "@/components/shared/sidebar-right";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] lg:px-20 md:px-10 px-5">
      <Header />
      <main className="w-full flex-1 grid grid-cols-1 xl:grid-cols-[350px_1fr_400px] gap-10 mt-6">
        <SidebarLeft />
        <section className="flex flex-col gap-6">
          <HeroPostInput />
          <PostFeed />
        </section>
        <SidebarRight />
      </main>
    </section>
  );
}
