import Image from "next/image";
import SpotifyStatus from "./SpotifyStatus";
import SocialMediaLinks from "./SocialMediaLinks";
import Copyright from "./Copyright";
import { ASSETS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative max-w-5xl mx-auto w-full mb-3 flex flex-col rounded-2xl px-8 saturate-100 backdrop-blur-[10px] overflow-hidden bg-linear-to-t from-white/30 via-white/10 to-white/0 dark:from-black/30 dark:via-black/10 dark:to-black/0 shadow-xs">
      {/* Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between w-full md:gap-0">
        {/* Left side: Spotify Logo and Status */}
        <div className="flex items-center gap-2">
          <a
            href={process.env.Spotify_URL!}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Image
              src={ASSETS.spotifyIcon}
              alt="Spotify Logo"
              width={20}
              height={20}
              className="h-6 w-6"
            />
          </a>
          <SpotifyStatus />
        </div>

        {/* Right side: Social Media Links */}
        <SocialMediaLinks />
      </div>
      <div className="relative flex justify-center items-center">
        <Copyright />
      </div>
    </footer>
  );
}
