import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from "@pages/Home";
import styled from "styled-components"
import Header from "@pages/Header";
import Footer from "@pages/Footer";
import "@services/socket"
import BlockChain from "@pages/BlockChain";
import Bounties from "@pages/BountyList";
import BlockDetail from "@pages/BlockDetail";
import AccountDetail from "@pages/AccountDetail";
import ExtrinsicDetail from "@pages/ExtrinsicDetail";
import BlockList from "@pages/BlockList";
import ExtrinsicList from "@pages/ExtrinsicList";
import EventList from "@pages/EventList";
import EventDetail from "@pages/EventDetail";
import BountyDetail from "@pages/BountyDetail";
import AccountList from "@pages/AccountList";

export const Wrapper = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1140px) {
    width: 1128px;
    margin: 0 auto;
  }
  
  @media screen and (max-width: 1140px) {
    width: 100%;
    padding: 0 16px;
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
          <Route exact path="/bounties/:bountyId" component={BountyDetail} />
          <Route exact path="/bounties/:bountyId/hunters" component={BountyDetail} />
          <Route path="/blocks/:heightOrHash" component={BlockDetail} />
          <Route path="/blocks" component={BlockList} />
          <Route path="/extrinsics/:hash" component={ExtrinsicDetail} />
          <Route path="/extrinsics" component={ExtrinsicList} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/events" component={EventList} />
          <Route path="/accounts/:address" component={AccountDetail} />
          <Route path="/accounts" component={AccountList} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
