const LOAD_CART = 'carts/LOAD';
const PURCHASE_CART = 'carts/PURCHASE';


export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart
  }
}

export const purchaseCart = (cart) => {
  return {
    type: PURCHASE_CART,
    cart
  }
}


export const getCartThunk = () => async dispatch => {
  const response = await fetch(`/api/carts`);

  if (response.ok) {
    const cart = await response.json();
    dispatch(loadCart(cart));
    return cart;
  }
}


export const purchaseCartThunk = (total) => async dispatch => {
  const response = await fetch('/api/carts', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "total": total })
  })

  if (response.ok) {
    const cart = await response.json();
    dispatch(purchaseCart(cart));
    return cart;
  }
}

export const getCartById = (id) => (state) => state.cart[id];

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...action.cart, 'orderHistory': state.orderHistory };
    case PURCHASE_CART:
      return { [action.cart.id]: action.cart };
    default:
      return state;
  };
};

export default cartReducer;