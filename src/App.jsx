import Header from "./components/Header/Header"
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, optimism, polygon } from "@wagmi/core/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Exchange from "./pages/Exchange/Exchange"
import Dashboard from "./pages/Dashboard/Dashboard"
import VaultPage from "./pages/VaultPage/VaultPage"
import DetailVaultPage from "./pages/DetailVaultPage/index"
import Document from "./pages/Document/Document"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListVault from "./pages/VaultPage/ListVault"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import FaucetPage from "./pages/FaucetPage/FaucetPage"

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
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Dashboard />
            </div>
          }
        />
        <Route
          path="trade"
          element={
            <div className="vh-full-screen">
              <Exchange />
            </div>
          }
        />
        <Route
          path="document"
          element={
            <div>
              <Document />
            </div>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="faucet" element={<FaucetPage />} />
        <Route
          path="vault"
          element={
            <div>
              <VaultPage />
            </div>
          }
        >
          <Route path="list" element={<ListVault />} />
          <Route path=":vaultId" element={<DetailVaultPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
        <FullApp />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
