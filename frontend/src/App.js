import React, { Suspense } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container} from 'react-bootstrap'
import './app.css'
import Header from './components/header'
import HomeScreen from './screens/HomeScreen'
import StoreScreen from './screens/StoreScreen'
import AboutScreen from './screens/AboutScreen'
import TestScreen from './screens/TestScreen'
import ProductScreen from './screens/ProductScreen'
import TestProductScreen from './screens/TestProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import { Trans, useTranslation } from "react-i18next";

function App() {
  return (
    <div className =  "App">
      <Trans i18nKey="">
        To get started, edit <code>src/App.js</code> and save to reload.
      </Trans>
    <Suspense fallback={(<div>Loading</div>)}>
    <Router>
      <main className = "py-3">
        <Container>
          <Route path = '/' component = {HomeScreen} exact/>
          <Route path = '/store' component = {StoreScreen} />
          <Route path = '/about' component = {AboutScreen} />
          <Route path = '/test' component = {TestScreen} />
          <Route path = '/products/:id' component = {ProductScreen} />
          <Route path = '/login' component = {LoginScreen} />
          <Route path = '/testproduct/:id' component = {TestProductScreen} />
          <Route path = '/cart/:id?' component = {CartScreen} />
        </Container>
      </main>
      <Header/>
    </Router>
    </Suspense>
    </div>
  );
}

export default App;
