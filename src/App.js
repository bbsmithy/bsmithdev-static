import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { CV } from "./pages/CV";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Post } from "./pages/Post";
import { Work } from "./pages/Work";
import { DevkeepMDEditor } from "./pages/DevkeepMDEditor";

function App() {

  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(()=>{
    if(window.location.pathname === '/devkeep-md-editor'){
      setHideNavbar(true)
    }else{
      setHideNavbar(false)
    }
  }, [])
  

  return (
    <div className="App">
      <Router>
        {!hideNavbar && <Navbar />}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/about"></Route>
          <Route path="/cv" component={CV}/>
          <Route path="/post/:postName" component={Post} />
          <Route path="/devkeep-md-editor" component={DevkeepMDEditor} />
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
