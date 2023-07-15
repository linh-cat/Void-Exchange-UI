import { BTC, DOGE, ETH, USDC, PEPE } from "@img/token"

export const vaultLists = [
  {
    id: 1,
    title: "ETH",
    bg: "bg-eth",
    hoverBg: "bg-hover-eth",
    risk: "medium",
    badge: ["void 1"],
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [1, 10, 12, 100] },
    icon: ETH
  },
  {
    id: 2,
    title: "BTC",
    bg: "bg-btc",
    hoverBg: "bg-hover-btc",
    risk: "low",
    badge: ["void 1"],
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [1, 20, 90, 100] },
    icon: BTC
  },
  {
    id: 3,
    title: "PEPE",
    bg: "bg-pepe",
    hoverBg: "bg-hover-pepe",
    icon: PEPE,
    risk: "high",
    badge: ["upcomming"],
    backedByIcon: USDC,
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [30, 20, 10, 100] },
    disabled: true
  },
  {
    id: 4,
    title: "USDC",
    bg: "bg-usdc",
    hoverBg: "bg-hover-usdc",
    icon: USDC,
    risk: "low",
    badge: ["void 1"],
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [10, 100, 10, 100] },
    backedByIcon: USDC
  },
  {
    id: 5,
    title: "Doge",
    bg: "bg-doge",
    hoverBg: "bg-hover-doge",
    icon: DOGE,
    risk: "high",
    badge: ["upcomming"],
    backedByIcon: USDC,
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [1, 30, 2, 80] },
    disabled: true
  }
]
