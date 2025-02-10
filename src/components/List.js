function List({ item, dispatch, newQuantity, index }) {
  const totalPrice = newQuantity[index] * item.price;
  return (
    <li className="list">
      <div style={{ width: "100%" }}>
        <div>
          <p className="item-name">{item.name}</p>
        </div>
        <div className="item-details">
          <span className="item-quantity">{item.quantity}x</span>
          <span className="item-price">@{item.price.toFixed(2)}</span>
          <span className="item-totalPrice">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={() => dispatch({ type: "delBtn", payload: item })}
      >
        <img src="../images/icon-remove-item.svg" alt="remove-item" />
      </button>
    </li>
  );
}

export default List;
