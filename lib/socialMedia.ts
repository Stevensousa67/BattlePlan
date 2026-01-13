import type { SocialMediaItem } from "@/lib/types";
import { ASSETS } from "@/lib/constants";

export const socialMedia: SocialMediaItem[] = [
  {
    name: "GitHub",
    url: `${process.env.GitHub_URL}`,
    icon: `${ASSETS.svgBasePath}github.svg`,
    isBlack: true,
  },
  {
    name: "LinkedIn",
    url: `${process.env.LinkedIn_URL}`,
    icon: `${ASSETS.svgBasePath}linkedin.svg`,
    isBlack: true,
  },
  {
    name: "Personal Website",
    url: `${process.env.Personal_Website_URL}`,
    icon: `${ASSETS.svgBasePath}earth.svg`,
    isBlack: true,
  },
  {
    name: "Discord",
    url: `${process.env.Discord_Profile}`,
    icon: `${ASSETS.svgBasePath}discord.svg`,
    isBlack: true,
  },
  {
    name: "Youtube",
    url: `${process.env.Youtube_URL}`,
    icon: `${ASSETS.svgBasePath}youtube.svg`,
    isBlack: true,
  },
];
