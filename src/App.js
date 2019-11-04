import React from "react";
import { Home } from "./pages/Home";
import { CV } from "./pages/CV";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Post } from "./pages/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/about"></Route>
          <Route path="/cv" component={CV}/>
          <Route path="/post/:postName" component={Post} />
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
