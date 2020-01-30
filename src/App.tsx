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
  selectDiscount: {
    [discountKey: string]: { name: string; rate: number; items: string[] };
  }[];
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      menu: null,
      selectItem: [],
      selectDiscount: []
    };
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
    arr: State["selectItem"] | State["selectDiscount"],
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
    this.setState({ ...this.state, selectItem: temp });
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
                menu={this.state.menu}
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
