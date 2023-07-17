import { BTC, DOGE, ETH, USDC, PEPE } from "@img/token"

export const vaultLists = [
  {
    id: 1,
    title: "ETH",
    bg: "bg-eth",
    hoverBg: "bg-hover-eth",
    risk: "medium",
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [1, 10, 12, 100] },
    badge: ["ETH void"],
    icon: ETH,
    information: {
      totalYield: '50,39%',
      utilization: '40%',
      totalDeposit: '4,155.41',
      totalReserve: '4,155.41 ETH',
      openInterest: '$3,259,618.00',
    }
  },
  {
    id: 2,
    title: "BTC",
    bg: "bg-btc",
    hoverBg: "bg-hover-btc",
    risk: "low",
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [1, 20, 90, 100] },
    badge: ["BTC void"],
    icon: BTC,
    information: {
      totalYield: '50,39%',
      utilization: '40%',
      totalDeposit: '4,155.41',
      totalReserve: '4,155.41 ETH',
      openInterest: '$3,259,618.00',
    }
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
    disabled: true,
    information: {
      totalYield: '50,39%',
      utilization: '40%',
      totalDeposit: '4,155.41',
      totalReserve: '4,155.41 ETH',
      openInterest: '$3,259,618.00',
    }
  },
  {
    id: 4,
    title: "USDC",
    bg: "bg-usdc",
    hoverBg: "bg-hover-usdc",
    icon: USDC,
    risk: "low",
    dataLineChart: { label: ["Jun", "Jul", "Aug", "Sep"], dataSet: [10, 100, 10, 100] },
    badge: ["USDC void"],
    backedByIcon: USDC,
    information: {
      totalYield: '50,39%',
      utilization: '40%',
      totalDeposit: '4,155.41',
      totalReserve: '4,155.41 ETH',
      openInterest: '$3,259,618.00',
    }
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
    disabled: true,
    information: {
      totalYield: '100%',
      utilization: '100%',
      totalDeposit: '4,155.41',
      totalReserve: '4,155.41 ETH',
      openInterest: '$3,259,618.00',
    }
  }
]
