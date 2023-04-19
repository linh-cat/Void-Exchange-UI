import Header from './components/Header/Header';
import SEO from './components/common/SEO';
import { Switch, Route, HashRouter as Router, Redirect, useLocation, useHistory } from "react-router-dom";
import Exchange from './pages/Exchange/Exchange';
import Footer from './components/Footer/Footer';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
  projectId: 'd09d60e40e1cb9712966ffa8781485ec'
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const FullApp = () => {
  return (
    <Switch>
      <Route exact path="/trade">
        <Exchange />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
