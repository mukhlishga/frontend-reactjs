import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../src/Nav/Nav";
import Home from "./Home/Home";
import Nilai from "./Nilai/Nilai"
import { NilaiProvider } from "./Nilai/NilaiContext";

const Routes = () => {
  return (
    <>
      <Router>

        <NilaiProvider>
            
            <Nav/>
            
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/score" exact component={Nilai}></Route>
            </Switch>

        </NilaiProvider>
        
      </Router>
    </>
  )
}

export default Routes