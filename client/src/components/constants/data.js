import {
  HiArrowsExpand,
  HiGlobeAlt,
  HiTicket,
  HiLockClosed,
  HiOutlineBriefcase,
  HiOutlineViewGridAdd,
  HiOutlineUserCircle,
} from "react-icons/hi";

export const features = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: HiArrowsExpand,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: HiLockClosed,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis.",
    icon: HiGlobeAlt,
  },
  {
    name: "Simple queues.",
    description:
      "Nulla porttitor accumsan tincidunt. Nulla porttitor accumsan tincidunt. Quaerat voluptas autem necessitatibus vitae aut.",
    icon: HiTicket,
  },
];

import { HiOutlineCog8Tooth, HiShieldCheck } from "react-icons/hi2";
import { TbPresentationAnalytics } from "react-icons/tb";

export const links = [
  {
    title: "Add Job",
    icon: HiOutlineViewGridAdd,
    link: ".",
  },
  {
    title: "All Jobs",
    icon: HiOutlineBriefcase,
    link: "all-jobs",
  },
  {
    title: "Statistics",
    icon: TbPresentationAnalytics,
    link: "stats",
  },
  {
    title: "Profile",
    icon: HiOutlineUserCircle,
    link: "profile",
  },
  {
    title: "Settings",
    icon: HiOutlineCog8Tooth,
    link: "settings",
  },
  {
    title: "Admin",
    icon: HiShieldCheck,
    link: "admin",
  },
];
