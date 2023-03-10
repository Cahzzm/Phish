const CREATE_CART_ITEM = "cart_items/Create";
const UPDATE_CART_ITEM = "cart_items/UPDATE";
const DELETE_CART_ITEM = "cart_items/DELETE";


export const createCartItem = (cartItem) => {
    return {
        type: CREATE_CART_ITEM,
        cartItem,
    };
};

export const updateCartItem = (cartItem) => {
    return {
        type: UPDATE_CART_ITEM,
        cartItem,
    };
};

export const deleteCartItem = (cartItemId) => {
    return {
        type: DELETE_CART_ITEM,
        cartItemId,
    };
};

export const postCartItemThunk = (productId) => async (dispatch) => {
    const response = await fetch("/api/carts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
    });

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(createCartItem(cartItem));
        return cartItem;
    }
};

export const editCartItemThunk = (cartItem, quantity) => async dispatch => {
    const response = await fetch(`/api/carts/${cartItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'quantity': quantity })
    });

    if (response.ok) {
        const updatedCartItem = await response.json();
        dispatch(updateCartItem(updatedCartItem));
        return updatedCartItem;
    };
};

export const removeCartItemThunk = (cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartItemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const deletedMessage = await response.json();
        dispatch(deleteCartItem(cartItemId));
        return deletedMessage;
    }
};

const initialState = {};

const cartItemsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case CREATE_CART_ITEM:
            return {
                ...state,
                [action.cartItem.id]: { ...action.cartItem },
            };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                [action.cartItem.id]: { ...action.cartItem },
            };
        case DELETE_CART_ITEM:
            delete newState[action.cartItemId];
            return newState;
        default:
            return state;
    }
};

export default cartItemsReducer;
