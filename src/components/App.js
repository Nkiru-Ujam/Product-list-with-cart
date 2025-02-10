import { useEffect, useReducer } from "react";
import Main from "./Main";
import Card from "./Card";
import Cart from "./Cart";
import Header from "./Header";
import Confirm from "./Confirm";

const initialState = {
  products: [],
  status: "loading",
  items: [],
  counter: "",
  confirmed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, products: action.payload, status: "ready" };

    case "addToCart":
      const newItems = {
        ...action.payload,
        quantity: 1,
        totalPrice: action.payload.price,
      };

      return {
        ...state,

        items: !state.items.some((p) => p.id === action.payload.id)
          ? [...state.items, newItems]
          : state.items,

        counter: action.payload.id,
      };

    case "inc":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };

    case "dec":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity:
                  item.quantity === 1 ? item.quantity : item.quantity - 1,
              }
            : item
        ),
      };

    case "total": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, totalPrice: item.price * item.quantity }
            : item
        ),
      };
    }

    case "decTotal": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, totalPrice: item.price / item.quantity }
            : item
        ),
      };
    }

    case "delBtn":
      return {
        ...state,
        items: state.items.filter((item) =>
          item.category !== action.payload.category ? item : null
        ),
        counter: null,
      };

    case "confirmed":
      return {
        ...state,
        confirmed: true,
      };

    case "start":
      return {
        ...state,
        counter: "",
        items: [],
        confirmed: false,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [{ status, products, items, counter, confirmed }, dispatch] =
    useReducer(reducer, initialState);
  const newQuantity = items.map((item) => item.quantity);
  const totalPrice = items.map((item) => item.totalPrice);
  const overallTotal = totalPrice.reduce((acc, cur) => acc + cur, 0);

  useEffect(
    function () {
      async function getProducts() {
        try {
          const res = await fetch("http://localhost:8000/products");
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          console.error(err);
        }
      }

      getProducts();
    },
    [dispatch]
  );
  return (
    <>
      <div className="App">
        <div className="items">
          <div>
            <Header>
              <h1>Desserts</h1>
            </Header>

            <Main>
              {status === "loading" && <p>Loading...</p>}
              {status === "ready" &&
                products.map((product) => (
                  <Card
                    product={product}
                    key={product.category}
                    dispatch={dispatch}
                    counter={counter}
                    newQuantity={newQuantity}
                    items={items}
                  />
                ))}
            </Main>
          </div>
          <Cart
            items={items}
            dispatch={dispatch}
            newQuantity={newQuantity}
            overallTotal={overallTotal}
            confirmed={confirmed}
          />
        </div>
      </div>
      {confirmed && (
        <Confirm
          items={items}
          overallTotal={overallTotal}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default App;
