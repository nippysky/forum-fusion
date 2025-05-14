export const FEED_POSTS = [
    {
      id: 1,
      title: "Bitcoin hits new low after regulation fears spark sell-off",
      tags: ["finance", "bitcoin", "crypto", "test", "testing", "tester", 
        "sample", "example", "demo", "trial", "experiment", "prototype",
        "mockup", "blueprint", "sketch", "draft", "layout", "plan",
      ],
      image: "https://github.com/shadcn.png",
      content:
        "Bitcoin has tumbled from its record high of $58,000 amid growing regulatory concerns and market volatility.",
      author: {
        name: "Pavel Gvay",
        avatar: "https://github.com/shadcn.png",
        profileUrl: "/profile/pavel-gvay",
      },
      likes: 36545,
      comments: 56,
      time: "3 weeks ago",
    },
    {
      id: 2,
      title: "How I built a SaaS in 30 days",
      tags: ["startup", "buildinpublic", "saas"],
      content:
        "From idea to launch in just one month — here’s how I built and scaled my micro-SaaS without VC funding or a team.",
      author: {
        name: "Sara Lin",
        avatar: "https://github.com/shadcn.png",
        profileUrl: "/profile/sara-lin",
      },
      likes: 1820,
      comments: 48,
      time: "1 week ago",
    },
    {
      id: 3,
      title: "Exploring Midjourney for AI art",
      tags: ["ai", "art", "design"],
      image: "https://github.com/shadcn.png",
      content:
        "Midjourney creates stunning AI-generated art, and it’s changing how we think about creativity and authorship.",
      author: {
        name: "Leo Haruki",
        avatar: "https://github.com/shadcn.png",
        profileUrl: "/profile/leo-haruki",
      },
      likes: 6023,
      comments: 73,
      time: "4 days ago",
    },
    {
      id: 4,
      title: "React 19 is here — what’s new?",
      tags: ["react", "webdev", "frontend"],
      content:
        "React 19 introduces significant changes including the new compiler, useEvent hook, and improved server components.",
      author: {
        name: "Kimani Drew",
        avatar: "https://github.com/shadcn.png",
        profileUrl: "/profile/kimani-drew",
      },
      likes: 3201,
      comments: 19,
      time: "2 days ago",
    },
    {
      id: 5,
      title: "Minimalist desk setup 2025 🌿",
      tags: ["workspace", "aesthetic", "tech"],
      image: "https://github.com/shadcn.png",
      content:
        "Here’s my clean, distraction-free workspace designed for deep work and creative flow. Thoughts?",
      author: {
        name: "Aliyah Noor",
        avatar: "https://github.com/shadcn.png",
        profileUrl: "/profile/aliyah-noor",
      },
      likes: 4521,
      comments: 103,
      time: "6 hours ago",
    },
  ];
  
export const WHO_TO_FOLLOW = [
  {
    name: "Product Hunt",
    handle: "@ProductHunt",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Mark Zuckerberg",
    handle: "@MZuckerberg_",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Ryan Hoover",
    handle: "@rrhoover",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Elon Musk",
    handle: "@elonmusk",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Ada Lovelace",
    handle: "@adalovelace",
    avatar: "https://github.com/shadcn.png",
  },
];

export const TOP_POSTS = [
  {
    id: 1,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 2,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 3,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 4,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 5,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
];



interface Reply {
  id: number;
  user: { name: string; avatar: string; handle: string };
  comment: string;
  replies: Reply[]; // recursively refer to yourself
}

interface Blast {
  id: number;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  downs: number;
  author: { name: string; username: string; avatar: string };
  time: string;
  comments: Reply[]; // top-level comments
}

// Now TypeScript knows the exact shape
export const DUMMY_BLAST: Blast = {
  id: 1,
  content:
    "Here's an insightful blast about why TypeScript improves DX without sacrificing JS flexibility.",
  images: [
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
  ],
  tags: [
    "typescript",
    "developer",
    "webdev",
    "testing",
    "We trying",
    "Nothing",
    "and",
    "everything",
  ],
  likes: 230,
  downs: 14,
  author: {
    name: "Sara Lin",
    username: "saralin",
    avatar: "https://github.com/shadcn.png",
  },
  time: "1h ago",
  comments: [
    {
      id: 1,
      user: { name: "John Doe", avatar: "...", handle: "@johndoe" },
      comment: "...",
      replies: [
        {
          id: 3,
          user: {
            name: "Jane Dev",
            avatar: "https://github.com/shadcn.png",
            handle: "@janedev",
          },
          comment: "...",
          replies: [], // empty array is okay, it’s a Reply[]
        },
      ],
    },
    {
      id: 2,
      user: { name: "Alex Code", avatar: "...", handle: "@alexcode" },
      comment: "...",
      replies: [],
    },
  ],
};