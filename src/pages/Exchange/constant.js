
export const defaultChartProps = {
  theme: "Dark",
  locale: "en",
  library_path: "/charting_library/",
  clientId: "tradingview.com",
  userId: "public_user_id",
  fullscreen: false,
  autosize: true,
  header_widget_dom_node: false,
  loading_screen: { backgroundColor: "#16182e", foregroundColor: "#2962ff" },
  custom_css_url: "/tradingview-chart.css",
  favorites: {
    intervals: ["5", "15", "60", "240", "1D"]
  }
}
export const POSITIONS = "Positions"
export const ORDERS = "Orders"
export const TRADES = "Trades"

export const optionLabels = {
  position: POSITIONS,
  Order: ORDERS,
  trade: TRADES
}
export const LIST_SECTIONS = [POSITIONS, ORDERS, TRADES]
