import Header from './components/Header/Header';
import SEO from './components/common/SEO';
import { Switch, Route, HashRouter as Router, Redirect, useLocation, useHistory } from "react-router-dom";
import Exchange from './pages/Exchange/Exchange';
import Footer from './components/Footer/Footer';

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
    <SEO>
      <Header />
      <FullApp />
      <Footer />
    </SEO>
  );
}

export default App;
