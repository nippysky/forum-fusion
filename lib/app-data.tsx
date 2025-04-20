import Art from "@/components/svg/Art";
import Culture from "@/components/svg/Culture";
import Entertainment from "@/components/svg/Entertainment";
import Finance from "@/components/svg/Finance";
import FollowersIcon from "@/components/svg/Followers";
import FollowingIcon from "@/components/svg/Following";
import General from "@/components/svg/General";
import NewIcon from "@/components/svg/New";
import PopularIcon from "@/components/svg/Popular";
import Support from "@/components/svg/Support";
import Technology from "@/components/svg/Technology";
import { Component, Flame, House, Telescope } from "lucide-react";

export const HEADER_LINKS = [
  {
    title: "Home",
    href: "/",
    icon: <House size={20} />,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: <Telescope size={20} />,
  },
  {
    title: "Boards",
    href: "/boards",
    icon: <Flame size={20} />,
  },
  {
    title: "Communities",
    href: "/communities",
    icon: <Component size={20} />,
  },
];

export const SIDE_QUICK_LINKS = [
  {
    title: "Newest and Recent",
    description: "Find the latest update",
    icon: <NewIcon />,
  },
  {
    title: "Popular of the day",
    description: "Today's most featured view",
    icon: <PopularIcon />,
  },
  {
    title: "Following",
    description: "From your favorite persons",
    icon: <FollowingIcon />,
  },
  {
    title: "Followers",
    description: "From people who follow you",
    icon: <FollowersIcon />,
  },
];

export const FORUM_CATEGORIES = [
  {
    title: "General",
    description: "Casual discussions, introductions, and everything off-topic.",
    icon: <General />,
  },
  {
    title: "Technology",
    description: "Programming, AI, cybersecurity, and software development.",
    icon: <Technology />,
  },
  {
    title: "Business & Finance",
    description: "Startups, investing, crypto, marketing, and side hustles.",
    icon: <Finance />,
  },
  {
    title: "Creativity",
    description: "For designers, artists, writers, and other creatives.",
    icon: <Art />,
  },
  {
    title: "Entertainment",
    description: "Games, anime, movies, music, sports, and pop culture.",
    icon: <Entertainment />,
  },
  {
    title: "Society & Culture",
    description: "News, politics, education, lifestyle, and global issues.",
    icon: <Culture />,
  },
  {
    title: "Support",
    description: "Help center, bug reports, suggestions, and announcements.",
    icon: <Support />,
  },
];
