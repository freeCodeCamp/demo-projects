import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Home from "./components/home/home";
import MovieDetail from "./components/movieDetail/movieDetail";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import "./App.scss";

function App(){
    return(
        <div className="app">
            <Router>
                <Header />
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/movie/:imdbID" component={MovieDetail} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;