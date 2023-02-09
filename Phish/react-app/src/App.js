import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Products from './components/Products';
import ProductDetails from './components/SingleProduct';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
import Footer from './components/Footer/Footer';
import OrderHistory from './components/OrderHistory';
import ResourceNotFound from './components/404';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/signin' exact={true}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
              <h1 style={{fontFamily: 'sans-serif', fontWeight:900}}>phish</h1>
              <span style={{fontFamily: 'sans-serif'}}>A totally legit site to buy your favorite items!</span>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '50px', margin: '20px'}}>
              {/* <div style={{width: '100%'}}> */}
              <LoginForm />
              {/* </div> */}
              <SignUpForm />
            </div>
          </div>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <Products />
        </Route>
        <Route path='/products/new' exact={true}>
          <CreateProduct />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <ProductDetails />
        </Route>
        <Route path='/products/:productId/edit' exact={true}>
          <EditProduct />
        </Route>
        <Route path='/cart' exact={true}>
          <Cart />
        </Route>
        <Route path='/history' exact={true}>
          <OrderHistory />
        </Route>
        <Route>
          <ResourceNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
