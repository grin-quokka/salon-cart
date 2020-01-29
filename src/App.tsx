import React, { Component } from "react";
import Cart from "./Cart";
import AddToCart from "./AddToCart";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { RouteComponentProps } from "react-router";

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
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true, menu: null, selectItem: [] };
  }

  async componentDidMount() {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_API_KEY}`
    });

    try {
      const { data } = await api.get("/");
      this.setState({ ...this.state, loading: false, menu: data });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  handleItemSelect = (
    itemArr: {
      [itemKey: string]: { count: number; name: string; price: number };
    }[]
  ) => {
    this.setState({ ...this.state, selectItem: itemArr });
  };

  render() {
    return this.state.loading ? (
      <div>로딩중</div>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Cart selectItem={this.state.selectItem} menu={this.state.menu} />
            )}
          />
          (
          <Route
            path="/addtocart/item"
            exact
            // tslint:disable-next-line: react-this-binding-issue
            render={(routeProps: RouteComponentProps) => (
              <AddToCart
                menu={this.state.menu}
                mode={"item"}
                selectItem={this.state.selectItem}
                handleItemSelect={this.handleItemSelect}
                history={routeProps.history}
              />
            )}
          />
          )
          <Route path="/addtocart/discount" exact component={AddToCart} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
