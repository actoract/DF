import React, { Suspense } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container} from 'react-bootstrap'
import './app.css'
import Footer from './components/footer'
import Header from './components/header'
import MainScreen from './screens/MainScreen'
import StoreScreen from './screens/StoreScreen'
import AboutScreen from './screens/AboutScreen'
import TestScreen from './screens/TestScreen'
import ProductScreen from './screens/ProductScreen'
import TestProductScreen from './screens/TestProductScreen'
import UserCartScreen from './screens/UserCartScreen'
import LoginScreen from './screens/LoginScreen'
import RegScreen from './screens/RegScreen'
import UserScreen from './screens/UserScreen'
import UsersScreen from './screens/UsersScreen'
import AddressScreen from './screens/AddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import FinishOrderScreen from './screens/FinishOrderScreen'
import ManageProdScreen from './screens/ManageProdScreen'
import ManageTestProdScreen from './screens/ManageTestProdScreen'
import OrdersScreen from './screens/OrdersScreen'
import OrdersScreen_Admin from './screens/OrdersScreen_Admin'
import EditScreen from './screens/EditScreen'
import EditTestScreen from './screens/EditTestScreen'
import './i18n';
import { Trans, useTranslation } from "react-i18next";

function App() {
  useEffect(() => {
    fetch("https://weardropbackend.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[]);
  return (
    <Router>
    <Header/>
      <main className = "py-3">
        <Container className="flexParent">
          <Route path = '/' component = {AboutScreen} exact/>
          <Route path = '/deliveryaddress' component = {AddressScreen}/>
          <Route path = '/payment' component = {PaymentMethodScreen}/>
          <Route path = '/order/:id' component = {OrdersScreen}/>
          <Route path = '/ordersadmin' component = {OrdersScreen_Admin}/>
          <Route path = '/finishorder' component = {FinishOrderScreen}/>
          <Route path = '/product/:id/edit' component = {EditScreen} />
          <Route path = '/testproducts/:id' component = {TestProductScreen} />
          <Route path = '/testproduct/:id/edit' component = {EditTestScreen} />
          <Route path = '/store' component = {StoreScreen} />
          <Route path = '/about' component = {AboutScreen} />
          <Route path = '/test' component = {TestScreen} />
          <Route path = '/managetestproducts' component = {ManageTestProdScreen} />
          <Route path = '/manageproducts' component = {ManageProdScreen} />
          <Route path = '/products/:id' component = {ProductScreen} />
          <Route path = '/login' component = {LoginScreen} />
          <Route path = '/usersadmin' component = {UsersScreen} />
          <Route path = '/register' component = {RegScreen} />
          <Route path = '/profile' component = {UserScreen} />
          <Route path = '/cart/:id?' component = {UserCartScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
