import { BTC, DOGE, ETH, USDC, PEPE } from "@img/token"

export const vaultLists = [
  {
    id: 1,
    title: "ETH",
    bg: "bg-eth",
    hoverBg: "bg-hover-eth",
    risk: "high",
    badge: ['void 1'],
    icon: ETH
  },
  {
    id: 2,
    title: "BTC",
    bg: "bg-btc",
    hoverBg: "bg-hover-btc",
    risk: "low",
    badge: ['void 1'],
    icon: BTC
  },
  {
    id: 3,
    title: "PEPE",
    bg: "bg-pepe",
    hoverBg: "bg-hover-pepe",
    icon: PEPE,
    risk: "medium",
    badge: ['upcomming'],
    backedByIcon: USDC,
    disabled: true,
  },
  {
    id: 4,
    title: "USDC",
    bg: "bg-usdc",
    hoverBg: "bg-hover-usdc",
    icon: USDC,
    risk: "high",
    badge: ['void 1'],
    backedByIcon: USDC
  },
  {
    id: 5,
    title: "Doge",
    bg: "bg-doge",
    hoverBg: "bg-hover-doge",
    icon: DOGE,
    risk: "low",
    badge: ['upcomming'],
    backedByIcon: USDC,
    disabled: true,
  }
]
