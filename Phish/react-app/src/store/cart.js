const LOAD_CART = 'carts/LOAD_CART';
const PURCHASE_CART = 'carts/PURCHASE_CART';


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
  const response = await fetch(`/api/carts/`);
  if (response.ok) {
    // console.log('====================')
    const cart = await response.json();
    dispatch(loadCart(cart));
    return cart;
  }
}


export const purchaseCartThunk = (cart) => async dispatch => {
  const response = await fetch('/api/carts/checkout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    const cart = await response.json();
    dispatch(purchaseCart(cart));
  }
}

export const getCartById = (id) => (state) => state.cart[id];

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      // return { ...action.cart, 'orderHistory': state.orderHistory };
      console.log(action)
      return action.cart
    case PURCHASE_CART:
      const newState = {...state}
      delete newState[action.cart]
      return newState
    default:
      return state;
  };
};

export default cartReducer;
