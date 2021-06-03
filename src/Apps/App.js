import React, { Suspense } from 'react';
import './App.css';
import NavMenu from 'Compoment/Header/Menu/NavMenu';
import Header from 'Compoment/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Page from 'RoutesDom/Routes';
import Loading from 'Compoment/Loading/loading';
import Footer from 'Compoment/Footer/Footer';
export default function App() {
  const showPage = (Page) => {
    var result = null;
    if (Page.length > 0) {
      result = Page.map((Page, index) => (
        <Route
          key={index}
          exact={Page.exact}
          path={Page.path}
          render={props => <Page.main {...props} />}
        />
      ))
    }
    return result;
  }


  return (

    <Suspense fallback={<Loading />}>
      <Router>
        <button className="scrollTop">
          <i className="fa fa-angle-up"></i>
        </button>
        <Header />
        <NavMenu />
        <div className="ground-container">
          <div className="main-container">
            <Suspense fallback={<Loading />}>
              <Switch>
                {showPage(Page)}
                <Redirect to="/" from="/" />
              </Switch>
              <Footer />
            </Suspense>
          </div>
        </div>
      </Router>
    </Suspense>

  );
};


