import Header from "./components/Header/Header"
import { Switch, Route } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, optimism, polygon } from "@wagmi/core/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Exchange from "./pages/Exchange/Exchange"
import TopInfo from "@components/TopInfo/TopInfo"
import Dashboard from "./pages/Dashboard/Dashboard"
import VaultPage from "./pages/VaultPage/VaultPage"
import DetailVaultPage from "./pages/DetailVaultPage/index"
import Document from "./pages/Document/Document"

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const FullApp = () => {
  return (
    <Switch>
      <Route exact path="/trade">
        <Exchange />
      </Route>
      <Route exact path="/">
        <div className="app-dashboard">
          <Dashboard />
        </div>
      </Route>
      <Route exact path="/document">
        <div className="app-dashboard">
          <Document />
        </div>
      </Route>
      <Route exact path="/vault">
        <div className="app-dashboard">
          <VaultPage />
        </div>
      </Route>
      <Route exact path="/vault/:id">
        <div>
          <DetailVaultPage />
        </div>
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
        <Header />
        <FullApp />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
