import Header from "./components/Header/Header"
import Exchange from "./pages/Exchange/Exchange"
import Dashboard from "./pages/Dashboard/Dashboard"
import VaultPage from "./pages/VaultPage/VaultPage"
import DetailVaultPage from "./pages/DetailVaultPage/index"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListVault from "./pages/VaultPage/ListVault"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import FaucetPage from "./pages/FaucetPage/FaucetPage"
import { Toaster } from "react-hot-toast"

import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { sepolia, goerli } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import StakingPage from "./pages/StakingPage/StakingPage"
import DocumentPage from "./pages/DocumentPage/DocumentPage"
import MarketPage from "./pages/MarketPage/MarketPage"

const { chains, publicClient } = configureChains(
  [sepolia, goerli],
  [alchemyProvider({ apiKey: "N2823S8lfRKCAyMO9rfYMg0Am36_qZSc" })]
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { name: "MetaMask" } }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    })
  ],
  publicClient
})

const FullApp = () => {
  return (
    <Router>
      <div id="bg">
        <div className="bg">
          <div className="orange-bg"></div>
          <div className="blue-bg"></div>
          <div className="white-bg"></div>
        </div>
      </div>
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
              <DocumentPage />
            </div>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="faucet" element={<FaucetPage />} />
        <Route path="staking" element={<StakingPage />} />
        <Route path="market" element={<MarketPage />} />
        <Route
          path="vault"
          element={
            <div>
              <VaultPage />
            </div>
          }
        >
          <Route path="list" element={<ListVault />} />
          <Route path=":id" element={<DetailVaultPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <WagmiConfig config={config}>
      <FullApp />
      <Toaster
        toastOptions={{
          className: "bg-card shadow",
          style: {
            background: "#1B2028",
            color: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          },
          success: {
            iconTheme: {
              primary: "#28a0f0",
              secondary: "#fff"
            }
          }
        }}
        position="top-center"
      />
    </WagmiConfig>
  )
}

export default App
