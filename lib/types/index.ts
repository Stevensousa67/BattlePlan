export interface SocialMediaItem {
  name: string;
  url: string;
  icon: string;
  isBlack?: boolean;
}

export interface SpotifyStatus {
  isListening: boolean;
  trackName?: string;
  artistName?: string;
  message?: string;
  itemType?: "track" | "episode";
}

export interface NavLinkItem {
  name: string;
  href: string;
  target?: string;
  rel?: string;
  isContactLink?: boolean;
}
