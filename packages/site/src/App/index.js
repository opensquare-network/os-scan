import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from "@pages/Home";
import styled from "styled-components"
import Header from "@pages/Header";
import Footer from "@pages/Footer";
import "@services/socket"

export const Wrapper = styled.div`
  min-height: calc(100vh - 108px);
`;

function App() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
