import React, { Component } from "react";
import Cart from "./Cart";
import AddToCart from "./AddToCart";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

interface Props {}
interface State {
  loading: boolean;
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  } | null;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true, menu: null };
  }

  async componentDidMount() {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_API_KEY}`
    });

    try {
      const { data } = await api.get("/");
      this.setState({ loading: false, menu: { ...data } });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return this.state.loading ? (
      <div>로딩중</div>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Cart} />
          (
          <Route
            path="/addtocart/item"
            exact
            component={() => <AddToCart menu={this.state.menu} mode={"item"} />}
          />
          )
          <Route path="/addtocart/discount" exact component={AddToCart} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
