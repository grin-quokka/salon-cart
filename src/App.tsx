import React, { Component } from "react";
import Cart from "./cart/Cart";
import AddToCart from "./addtocart/AddToCart";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { AppState } from "./interface";

export default class App extends Component<any, AppState> {
  state: AppState = {
    loading: true,
    menu: null,
    selectItem: [],
    selectDiscount: []
  };

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
    arr: AppState["selectItem"] | AppState["selectDiscount"],
    arrName: string
  ) => {
    this.setState({ ...this.state, [arrName]: [...arr] });
  };

  hadleItemEdit = (itemKey: string, count: number) => {
    const temp = [...this.state.selectItem];
    temp.some((ele, index) => {
      if (itemKey in ele) {
        temp[index][itemKey].count = count;
        return true;
      }

      return false;
    });
    this.setState({ ...this.state, selectItem: temp });
  };

  handleItemRemove = (itemKey: string) => {
    const temp = [...this.state.selectItem];
    temp.some((ele, index) => {
      if (itemKey in ele) {
        temp.splice(index, 1);
        return true;
      }

      return false;
    });

    const tempDis = [...this.state.selectDiscount];
    tempDis.forEach(ele => {
      const { items } = Object.values(ele)[0];
      if (items.includes(itemKey)) {
        items.splice(items.indexOf(itemKey), 1);
      }
    });

    this.setState({ ...this.state, selectItem: temp, selectDiscount: tempDis });
  };

  handleDisEdit = (
    disKey: string,
    discountsObj: { name: string; rate: number; items: string[] }
  ) => {
    const discountArr = [...this.state.selectDiscount];

    discountArr.some((ele, index) => {
      if (Object.keys(ele)[0] === disKey) {
        discountArr.splice(index, 1, { [disKey]: discountsObj });
        return true;
      }

      return false;
    });

    this.setState({
      ...this.state,
      selectDiscount: discountArr
    });
  };

  handleDisRemove = (disKey: string) => {
    const discountArr = [...this.state.selectDiscount];

    discountArr.some((ele, index) => {
      if (Object.keys(ele)[0] === disKey) {
        discountArr.splice(index, 1);
        return true;
      }

      return false;
    });

    this.setState({
      ...this.state,
      selectDiscount: discountArr
    });
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
            // tslint:disable-next-line: react-this-binding-issue
            component={() => (
              <Cart
                selectItem={this.state.selectItem}
                hadleItemEdit={this.hadleItemEdit}
                handleItemRemove={this.handleItemRemove}
                selectDiscount={this.state.selectDiscount}
                handleDisEdit={this.handleDisEdit}
                handleDisRemove={this.handleDisRemove}
                currency={this.state.menu?.currency_code}
              />
            )}
          />
          (
          <Route
            path="/addtocart/:mode"
            exact
            // tslint:disable-next-line: react-this-binding-issue
            render={(routeProps: RouteComponentProps<{ mode: string }>) => (
              <AddToCart
                menu={this.state.menu}
                selectItem={this.state.selectItem}
                handleItemSelect={this.handleItemSelect}
                history={routeProps.history}
                location={routeProps.location}
                match={routeProps.match}
                selectDiscount={this.state.selectDiscount}
              />
            )}
          />
          )
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
