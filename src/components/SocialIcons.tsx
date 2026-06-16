import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiX,
  SiYoutube,
  SiSpotify,
  SiApplemusic,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa6";
import type { IconType } from "react-icons";

const SOCIAL_LINKS: { name: string; href: string; Icon: IconType }[] = [
  { name: "Instagram", href: "https://www.instagram.com/mackcarpmusic/", Icon: SiInstagram },
  { name: "Facebook", href: "https://www.facebook.com/mackcarpmusic", Icon: SiFacebook },
  { name: "TikTok", href: "https://www.tiktok.com/@mackcarpmusic?lang=en", Icon: SiTiktok },
  { name: "X", href: "https://twitter.com/mackcarpmusic", Icon: SiX },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCl94YL0Os0pta5M5-RP2aLQ", Icon: SiYoutube },
  { name: "Spotify", href: "https://open.spotify.com/artist/1gYlQ5LjfQz9QPaCApCsDZ", Icon: SiSpotify },
  { name: "Apple Music", href: "https://music.apple.com/us/artist/mackenzie-carpenter/1545066309", Icon: SiApplemusic },
  { name: "Amazon Music", href: "https://music.amazon.com/artists/B08QRYW4B1/mackenzie-carpenter", Icon: FaAmazon },
];

export default function SocialIcons({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="text-blush transition-colors hover:text-ivory"
        >
          <link.Icon size={size} aria-hidden="true" />
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      ))}
    </div>
  );
}
