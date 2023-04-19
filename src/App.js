import Header from "./components/Header/Header";
import SEO from "./components/common/SEO";
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
  projectId: "d09d60e40e1cb9712966ffa8781485ec",
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const FullApp = () => {
  return (
    <Switch>
      <Route exact path="/trade"></Route>
    </Switch>
  );
};

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <SEO>
          <Header />
          <FullApp />
          <Footer />
        </SEO>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
