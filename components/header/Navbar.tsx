import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import MobileMenuToggle from "./MobileMenuToggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ProfileToggle } from "@/components/ui/user";
import { ASSETS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="fixed w-full top-4 z-40 max-w-5xl left-1/2 -translate-x-1/2">
      <nav className="relative w-full flex h-15 items-center justify-between rounded-full px-8 backdrop-blur-[10px] bg-background/30 shadow-xl border border-foreground/30 animate-in fade-in slide-in-from-top-full duration-300 fill-mode-forwards">
        <Link href="/">
          <Avatar className="w-10 h-10">
            <AvatarImage src={ASSETS.logo} className="dark:invert-white-bg" />
          </Avatar>
        </Link>

        <div className="flex items-center gap-4">
          <NavbarLinks className="hidden md:flex gap-8 text-md" />
          <div className="hidden md:block h-6 w-px bg-gray-400/50" />
          <ModeToggle />
          <ProfileToggle />
          <MobileMenuToggle />
        </div>
      </nav>
    </header>
  );
}
