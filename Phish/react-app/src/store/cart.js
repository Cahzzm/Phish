const LOAD_CART = 'carts/LOAD_CART';
const PURCHASE_CART = 'carts/PURCHASE_CART';
const LOAD_HISTORY = 'carts/HISTORY'


export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart
  }
}

export const loadCartHistory = (carts) => {
  return {
    type: LOAD_HISTORY,
    carts
  }
}

export const purchaseCart = (cart) => {
  return {
    type: PURCHASE_CART,
    cart
  }
}


export const getCartThunk = () => async dispatch => {
  const response = await fetch(`/api/carts/`);

  if (response.ok) {
    const cart = await response.json();
    dispatch(loadCart(cart));
    return cart;
  }
}


export const getCartHistoryThunk = () => async dispatch => {
  const response = await fetch(`/api/carts/history`);

  if (response.ok) {
    const carts = await response.json();
    dispatch(loadCartHistory(carts));
    return carts;
  }
}


export const purchaseCartThunk = (total, cartId) => async dispatch => {
  const response = await fetch(`/api/carts/checkout/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "total": total })
  })

  if (response.ok) {
    const cart = await response.json();
    console.log('============purchase thunk===================', cart)
    dispatch(purchaseCart(cart));
    return cart
  }
}

export const getCartById = (id) => (state) => state.cart[id];

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...action.cart, 'orderHistroy': state.orderHistory }
    case PURCHASE_CART:
      return { [action.cart.id]: action.cart }
    case LOAD_HISTORY:
        return { ...state, 'orderHistory': action.carts.OrderHistory };
    default:
      return state;
  };
};

export default cartReducer;
