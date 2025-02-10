function Confirm({ items, overallTotal, dispatch }) {
  return (
    <div className="confirm">
      <div className="confirm-cont">
        <img src="../images/icon-order-confirmed.svg" alt="confirm-image" />
        <h2>Order Confirmed</h2>
        <span>We hope you enjoy your food!</span>

        <ul>
          {items.map((item) => (
            <li className="confirm-list" key={item.category}>
              <div className="confirm-item">
                <div>
                  <img src={item.image.thumbnail} alt={item.category} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <p className="item-name">{item.name}</p>
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-price" style={{ paddingLeft: "10px" }}>
                    @${item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="item-totalPrice">${item.totalPrice.toFixed(2)}</p>
            </li>
          ))}

          <div className="total">
            <span>Order Total</span> <p>${overallTotal.toFixed(2)}</p>
          </div>
        </ul>
        <button
          className="confirm-btn"
          onClick={() => dispatch({ type: "start" })}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default Confirm;
