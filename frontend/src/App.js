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
import RegScreen from './screens/RegScreen'
import UserScreen from './screens/UserScreen'
import UsersScreen from './screens/UsersScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceorderScreen from './screens/PlaceorderScreen'
import ManageProdScreen from './screens/ManageProdScreen'
import ManageTestProdScreen from './screens/ManageTestProdScreen'
import OrdersScreen from './screens/OrdersScreen'
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
        <Container className="FormCont">
          <Route path = '/' component = {HomeScreen} exact/>
          <Route path = '/shipping' component = {ShippingScreen}/>
          <Route path = '/payment' component = {PaymentScreen}/>
          <Route path = '/order/:id' component = {OrdersScreen}/>
          <Route path = '/placeorder' component = {PlaceorderScreen}/>
          <Route path = '/store' component = {StoreScreen} />
          <Route path = '/about' component = {AboutScreen} />
          <Route path = '/test' component = {TestScreen} />
          <Route path = '/managetestproducts' component = {ManageTestProdScreen} />
          <Route path = '/manageproducts' component = {ManageProdScreen} />
          <Route path = '/products/:id' component = {ProductScreen} />
          <Route path = '/login' component = {LoginScreen} />
          <Route path = '/users' component = {UsersScreen} />
          <Route path = '/register' component = {RegScreen} />
          <Route path = '/profile' component = {UserScreen} />
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
