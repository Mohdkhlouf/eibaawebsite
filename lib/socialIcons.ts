import { IconType } from 'react-icons'
import {
    FaDiscord,
    FaFacebook,
    FaGlobe,
    FaInstagram,
    FaLinkedin,
    FaPinterest,
    FaSnapchat,
    FaSoundcloud, FaSpotify,
    FaTelegram,
    FaTiktok,
    FaTwitter,
    FaWhatsapp,
    FaYoutube
} from 'react-icons/fa'
import { FaThreads, FaXTwitter } from 'react-icons/fa6'
export const iconMap: Record<string, IconType> = {
  facebook:   FaFacebook,
  instagram:  FaInstagram,
  telegram:   FaTelegram,
  whatsapp:   FaWhatsapp,
  tiktok:     FaTiktok,
  twitter:    FaTwitter,
  xtwitter:   FaXTwitter,
  youtube:    FaYoutube,
  linkedin:   FaLinkedin,
  snapchat:   FaSnapchat,
  pinterest:  FaPinterest,
  threads:    FaThreads,
  soundcloud: FaSoundcloud,
  spotify:    FaSpotify,
  discord:    FaDiscord,
  website:    FaGlobe,
}
export const SOCIAL_ICONS = Object.entries(iconMap).map(([value, Icon]) => ({
  value,
  Icon,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}))
