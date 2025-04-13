import { RiHomeFill } from "react-icons/ri";
import { BsCalendar2EventFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";

export const HEADER_LINKS = [
  {
    title: "Home",
    href: "/",
    icon: <RiHomeFill size={22} />,
  },
  {
    title: "Events",
    href: "/events",
    icon: <BsCalendar2EventFill size={20} />,
  },
  {
    title: "Communities",
    href: "/communities",
    icon: <HiUserGroup size={22} />,
  },
];
