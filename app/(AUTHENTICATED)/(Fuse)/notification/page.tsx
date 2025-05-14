import Header from "@/components/shared/header";
import NotificationCard, {
  NotificationType,
} from "@/components/shared/notification-card";
import HomeLeft from "@/components/shared/sidebar/home/home-left";
import HomeRight from "@/components/shared/sidebar/home/home-right";

export default function NotificationPage() {
  // 🔧 Swap out with your real data fetch
  const notifications: NotificationType[] = [
    {
      id: "1",
      message: "Alice Smith started following you.",
      timestamp: "2h ago",
      unread: true,
      href: "/profile/alice-smith",
    },
    {
      id: "2",
      message: "Your article “Next.js Deep Dive” just got 5 new comments.",
      timestamp: "5h ago",
      unread: true,
      href: "/articles/nextjs-deep-dive#comments",
    },
    {
      id: "3",
      message: "Your download “VPS Setup Guide” is ready.",
      timestamp: "1d ago",
      unread: false,
      href: "/downloads",
    },
    {
      id: "4",
      message: "Forum topic “React vs Vue” has 10 new posts.",
      timestamp: "2d ago",
      unread: false,
      href: "/forum/react-vs-vue",
    },
    {
      id: "5",
      message: "Your subscription expires in 3 days.",
      timestamp: "5d ago",
      unread: false,
      href: "/account/billing",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] lg:px-20 md:px-10 px-5">
      <Header />
      <main className="w-full flex-1 mt-6 pb-20">
        {/* XL: three-column */}
        <div className="hidden xl:grid xl:grid-cols-[280px_1fr_280px] gap-5">
          <HomeLeft />
          <section className="flex flex-col gap-6">
            {notifications.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </section>
          <HomeRight />
        </div>

        {/* LG: two-column */}
        <div className="hidden lg:grid xl:hidden grid-cols-[1fr_300px] gap-10">
          <section className="flex flex-col gap-6">
            {notifications.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </section>
          <HomeRight />
        </div>

        {/* <lg: stacked */}
        <div className="flex flex-col gap-6 lg:hidden">
          {notifications.map((n) => (
            <NotificationCard key={n.id} {...n} />
          ))}
        </div>
      </main>
    </section>
  );
}
