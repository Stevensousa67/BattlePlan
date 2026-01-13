"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

export default function NavbarLinks({ className, onLinkClick }: NavbarLinksProps) {
  return (
    <ul className={className}>
      {NAV_LINKS.map(({ name, href, target, rel }) => (
        <li
          key={name}
          className="relative group cursor-pointer text-md font-medium text-muted-foreground hover:text-foreground"
        >
          <Link href={href} target={target} rel={rel} onClick={onLinkClick} className="block">
            {name}
          </Link>
          <span className="absolute left-0 -bottom-1.25 w-0 h-1 rounded-xl bg-red-400 transition-all duration-300 group-hover:w-full" />
        </li>
      ))}
    </ul>
  );
}
