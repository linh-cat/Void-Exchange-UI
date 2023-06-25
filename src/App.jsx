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
import { sepolia, baseGoerli, arbitrum, mainnet } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"

import StakingPage from "./pages/StakingPage/StakingPage"
import DocumentPage from "./pages/DocumentPage/DocumentPage"
import MarketPage from "./pages/MarketPage/MarketPage"
import { ExchangeContextProvider } from "src/contexts/ExchangeContext"
import BgApp from "@components/BgApp/BgApp"

const baseGoerliExtended = {
  ...baseGoerli,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: "1376988"
    }
  }
}

// TODO: refactor later
const { chains, publicClient } = configureChains(
  [mainnet, arbitrum, baseGoerliExtended, sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === baseGoerli.id) {
          return {
            http: "https://base-goerli.blastapi.io/7732b118-e54f-46ca-a10b-d226670d03dc",
            webSocket: "wss://base-goerli.blastapi.io/7732b118-e54f-46ca-a10b-d226670d03dc"
          }
        }
      }
    }),
    // baseGoerliProvider,
    alchemyProvider({ apiKey: "N2823S8lfRKCAyMO9rfYMg0Am36_qZSc" })
  ]
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
    }),
    new CoinbaseWalletConnector({ chains, options: { appName: "Coin Base" } })
  ],
  publicClient
})

const FullApp = () => {
  return (
    <Router>
      <BgApp />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="trade"
          element={
            <div className="vh-full-screen">
              <ExchangeContextProvider>
                <Exchange />
              </ExchangeContextProvider>
            </div>
          }
        />
        <Route path="document" element={<DocumentPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="faucet" element={<FaucetPage />} />
        <Route path="staking" element={<StakingPage />} />
        <Route path="market" element={<MarketPage />} />
        <Route path="vault" element={<VaultPage />}>
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
          className: "card shadow",
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
