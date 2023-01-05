const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT';
const UPDATE_SINGLE_PRODUCT = 'products/UPDATE';

export const loadSingleProduct = product => {
  return {
    type: LOAD_SINGLE_PRODUCT,
    product
  };
};

export const updateSingleProduct = updatedProduct => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    updatedProduct
  };
};


export const getSingleProductThunk = productId => async dispatch => {
  const response = await fetch(`/api/products/${productId}`);

  if (response.ok) {
    const product = await response.json();
    console.log(product)
    dispatch(loadSingleProduct(product));
    return product;
  }
};

export const putSingleProductThunk = (product, productId) => async dispatch => {
  const { name, description, price } = product;
  const response = await fetch(`/api/products/${productId}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateSingleProduct(data));
    return data;
  }
  const data = await response.json();
  return data;
};

export const postProductImageThunk = (productId, url) => async dispatch => {
  const response = await fetch(`/api/images/${productId}/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const data = await response.json()
  return data;
};

export const deleteProductImageThunk = productImageId => async dispatch => {
  const response = await fetch(`/api/images/${productImageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const deletedMsg = await response.json();
    return deletedMsg;
  }
};

export const putProductImageThunk = (productImageId, url) => async dispatch => {
  const response = await fetch(`/api/images/${productImageId}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productImageId, url })
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const data = await response.json()
  return data;
};


export const getProductById = id => state => state.products[id];


const initialState = {
  singleProduct: {}
};

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SINGLE_PRODUCT:
      console.log('this is action.product', action)
      return {
        ...state,
        singleProduct: action.product
      };
    case UPDATE_SINGLE_PRODUCT:
      return {
        ...state,
        [action.updatedProduct.id]: { ...action.updatedProduct }
      };
    default:
      return state;
  }
};

export default singleProductReducer;
