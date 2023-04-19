import "./Footer.css";
import twitterIcon from "../../img/ic_twitter.svg";
import discordIcon from "../../img/ic_discord.svg";
import telegramIcon from "../../img/ic_telegram.svg";
import githubIcon from "../../img/ic_github.svg";
import substackIcon from "../../img/ic_substack.svg";

export const FOOTER_LINKS = {
  home: [
    { text: "Terms and Conditions", link: "/terms-and-conditions" },
    { text: "Referral Terms", link: "/referral-terms" },
    {
      text: "Media Kit",
      link: "https://gmxio.gitbook.io/gmx/media-kit",
      external: true,
    },
    // { text: "Jobs", link: "/jobs", isAppLink: true },
  ],
  app: [
    {
      text: "Media Kit",
      link: "https://gmxio.gitbook.io/gmx/media-kit",
      external: true,
    },
    // { text: "Jobs", link: "/jobs" },
  ],
};

export function getFooterLinks(isHome) {
  return FOOTER_LINKS[isHome ? "home" : "app"];
}

export const SOCIAL_LINKS = [
  { link: "https://twitter.com/GMX_IO", name: "Twitter", icon: twitterIcon },
  { link: "https://gmxio.substack.com/", name: "Substack", icon: substackIcon },
  { link: "https://github.com/gmx-io", name: "Github", icon: githubIcon },
  { link: "https://t.me/GMX_IO", name: "Telegram", icon: telegramIcon },
  {
    link: "https://discord.com/invite/ymN38YefH9",
    name: "Discord",
    icon: discordIcon,
  },
];