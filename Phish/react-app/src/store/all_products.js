const LOAD_PRODUCTS = 'products/LOAD';
const CREATE_PRODUCT = 'products/CREATE';
const DELETE_PRODUCT = 'products/DELETE';


export const loadProducts = products => {
  return {
    type: LOAD_PRODUCTS,
    products
  };
};

export const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  };
};

export const removeProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
  };
};


export const getProductsThunk = () => async dispatch => {
  const response = await fetch('/api/products');

  if (response.ok) {
    const products = await response.json();
    dispatch(loadProducts(products));
    return products;
  }
};

export const createProductThunk = payload => async dispatch => {
  const { name, description, price, preview_img_url } = payload;

  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      description,
      price,
      preview_img_url
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createProduct(data));
    return data;
  }

  const data = await response.json();
  return data;
};

export const deleteProductThunk = productId => async dispatch => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const deletedMsg = await response.json();
    dispatch(removeProduct(productId));
    return deletedMsg;
  }
};


// export const getAllProducts = state => Object.values(state.products);


const initialState = {
  allProducts: {}
};

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      console.log(action.products)
      const allProductsState = {}
      action.products.forEach((product) => (
        allProductsState[product.id] = product
      ))
      return {
        ...state,
        allProducts: allProductsState
      }
    }
    case CREATE_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    default:
      return state;
    case DELETE_PRODUCT:
      const newState = { ...state };
      delete newState[action.productId];
      return newState;
  }
};

export default allProductsReducer;
