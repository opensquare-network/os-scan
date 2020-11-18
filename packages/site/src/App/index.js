import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from "../pages/Home";
import styled from "styled-components"

export const Wrapper = styled.div`
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
