import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from "@pages/Home";
import styled from "styled-components"
import Header from "@pages/Header";
import Footer from "@pages/Footer";
import "@services/socket"
import BlockChain from "@pages/BlockChain";
import Bounties from "@pages/Bounties";
import BlockDetail from "@pages/BlockDetail";
import AccountDetail from "@pages/AccountDetail";
import ExtrinsicDetail from "@pages/ExtrinsicDetail";

export const Wrapper = styled.div`
  min-height: calc(100vh - 108px);
  
    @media screen and (min-width: 1140px) {
      width: 1128px;
      margin: 0 auto;
    }
    
    @media screen and (max-width: 1140px) {
      width: 100%;
    }
`;

function App() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blockchain" component={BlockChain} />
          <Route exact path="/bounties" component={Bounties} />
          <Route path="/blocks/:heightOrHash" component={BlockDetail} />
          <Route path="/extrinsics/:index" component={ExtrinsicDetail} />
          <Route path="/accounts/:address" component={AccountDetail} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
