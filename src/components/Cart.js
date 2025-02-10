import List from "./List";

function Cart({ items, dispatch, newQuantity, overallTotal }) {
  const totalQuantity = newQuantity.reduce((acc, cur) => acc + cur, 0);
  return (
    <div className="cart">
      <h3>Your Cart ({totalQuantity})</h3>
      {items.length === 0 ? (
        <>
          <div className="cart-img">
            <img
              src="../images/illustration-empty-cart.svg"
              alt="empty-cart"
              className="illustration"
            />
          </div>
          <p className="empty-text">Your added items will appear here</p>
        </>
      ) : (
        <div>
          <ul>
            {items.map((item, i) => (
              <List
                key={i}
                index={i}
                item={item}
                dispatch={dispatch}
                newQuantity={newQuantity}
              />
            ))}
            <div className="total">
              <span>Order Total</span>
              <p> ${overallTotal.toFixed(2)}</p>
            </div>
            <div className="cart-carbon">
              <img
                src="../images/icon-carbon-neutral.svg"
                alt="icon-carbon-neutral"
                className="carbon-img"
              />
              <p>
                This is a <strong>carbon-neutral</strong> delivery
              </p>
            </div>
          </ul>
          <button
            className="confirm-btn"
            onClick={() => dispatch({ type: "confirmed" })}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
