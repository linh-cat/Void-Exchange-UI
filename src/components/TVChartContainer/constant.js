// const RED = "#fa3c58";
// const GREEN = "#0ecc83";
// export const DEFAULT_PERIOD = "4h";

// const chartStyleOverrides = ["candleStyle", "hollowCandleStyle", "haStyle"].reduce((acc, cv) => {
//     acc[`mainSeriesProperties.${cv}.drawWick`] = true;
//     acc[`mainSeriesProperties.${cv}.drawBorder`] = false;
//     acc[`mainSeriesProperties.${cv}.upColor`] = GREEN;
//     acc[`mainSeriesProperties.${cv}.downColor`] = RED;
//     acc[`mainSeriesProperties.${cv}.wickUpColor`] = GREEN;
//     acc[`mainSeriesProperties.${cv}.wickDownColor`] = RED;
//     acc[`mainSeriesProperties.${cv}.borderUpColor`] = GREEN;
//     acc[`mainSeriesProperties.${cv}.borderDownColor`] = RED;
//     return acc;
//   }, {});
  
// const chartOverrides = {
//     "paneProperties.background": "#16182e",
//     "paneProperties.backgroundGradientStartColor": "#16182e",
//     "paneProperties.backgroundGradientEndColor": "#16182e",
//     "paneProperties.backgroundType": "solid",
//     "paneProperties.vertGridProperties.color": "rgba(35, 38, 59, 1)",
//     "paneProperties.vertGridProperties.style": 2,
//     "paneProperties.horzGridProperties.color": "rgba(35, 38, 59, 1)",
//     "paneProperties.horzGridProperties.style": 2,
//     "mainSeriesProperties.priceLineColor": "#3a3e5e",
//     "scalesProperties.textColor": "#fff",
//     "scalesProperties.lineColor": "#16182e",
//     ...chartStyleOverrides,
//   };
// export const defaultChartProps = {
//     theme: "Dark",
//     locale: "en",
//     library_path: "/charting_library/",
//     clientId: "tradingview.com",
//     userId: "public_user_id",
//     fullscreen: false,
//     autosize: true,
//     header_widget_dom_node: false,
//     overrides: chartOverrides,
//     enabled_features: enabledFeatures,
//     disabled_features: disabledFeatures,
//     custom_css_url: "/tradingview-chart.css",
//     loading_screen: { backgroundColor: "#16182e", foregroundColor: "#2962ff" },
//     favorites: {
//       intervals: ["5", "15", "60", "240", "1D"],
//     },
//     custom_formatters: {
//       timeFormatter: {
//         format: (date) => formatTVTime(date),
//       },
//       dateFormatter: {
//         format: (date) => formatTVDate(date),
//       },
//     },
//   };
  