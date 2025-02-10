function Card({ product, dispatch, counter, items }) {
  const count = items
    .filter((item) =>
      item.id !== product.id ? item.quantity + 1 : item.quantity
    )
    .map((el) => (product.id === el.id ? el.quantity : product.quantity));
  const selected = items
    .filter((item) => (item.id === product.id ? item : product))
    .map((el) => el.category)
    .includes(product.category);
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img
            src={product.image.desktop}
            alt={product.category}
            className={`product-img ${selected ? "active" : ""}`}
          />
          {counter !== product.id ? (
            <button
              className="btn add-to-cart"
              onClick={() => {
                dispatch({ type: "addToCart", payload: product });
              }}
            >
              <img
                src="../images/icon-add-to-cart.svg"
                alt="icon-add-to-cart"
                className="svg-img"
              />
              <span className="cart-text">Add to Cart</span>
            </button>
          ) : (
            <div className="btn counter">
              <button
                className="dec"
                onClick={() => {
                  dispatch({ type: "dec", payload: product });
                  dispatch({ type: "decTotal", payload: product });
                }}
              >
                <img
                  src="../images/icon-decrement-quantity.svg"
                  alt="icon-decrement"
                  className="icon-quantity"
                />
              </button>
              <span>{count}</span>
              <button
                className="inc"
                onClick={() => {
                  dispatch({ type: "inc", payload: product });
                  dispatch({ type: "total", payload: product });
                }}
              >
                <img
                  src="../images/icon-increment-quantity.svg"
                  alt="icon-increment"
                  className="icon-quantity"
                />
              </button>
            </div>
          )}
        </div>
        <span className="prod-category">{product.category}</span>
        <p className="prod-name">{product.name}</p>
        <span className="prod-price">${product.price.toFixed(2)}</span>
      </div>
    </>
  );
}

export default Card;
