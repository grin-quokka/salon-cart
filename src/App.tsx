import React from "react";
import Cart from "./Cart";
import AddToCart from "./AddToCart";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Cart} />
        <Route path="/addtocart/item" exact component={AddToCart} />
        <Route path="/addtocart/discount" exact component={AddToCart} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
