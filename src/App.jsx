import Header from "./components/Header/Header"
import Exchange from "./pages/Exchange/Exchange"
import Dashboard from "./pages/Dashboard/Dashboard"
import VaultPage from "./pages/VaultPage/VaultPage"
import DetailVaultPage from "./pages/DetailVaultPage/index"
import Document from "./pages/Document/Document"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListVault from "./pages/VaultPage/ListVault"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import FaucetPage from "./pages/FaucetPage/FaucetPage"

import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { sepolia, goerli } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

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
    <WagmiConfig config={config}>
      <FullApp />
    </WagmiConfig>
  )
}

export default App
