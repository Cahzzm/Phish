

const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL_PRODUCTS'
const LOAD_ONE_PRODUCT = 'products/LOAD_ONE_PRODUCT'


const loadAllProducts = products => ({
    type: LOAD_ALL_PRODUCTS,
    products
})

const loadOneProduct = product => ({
    type: LOAD_ONE_PRODUCT,
    product
})


export const getProductsThunk = () => async dispatch => {
    const response = await fetch(`/api/products`)

    if(response.ok) {
        const allProducts = await response.json()
        dispatch(loadAllProducts(allProducts))
        return allProducts
    }
}

export const getOneProductThunk = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`)

    if(response.ok) {
        const product = await response.json()
        dispatch(loadOneProduct(product))
    }
}


const initialState = {
    allProducts: {},
    singleProduct: {}
}


const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PRODUCTS: {
            const allProductsState = {}
            console.log('-----------------',action.products)
            action.products.products.forEach(product => (
                allProductsState[product.id] = product
            ))
            return {
                ...state,
                allProducts: allProductsState,
                singleProduct: {}
            }
        }

        case LOAD_ONE_PRODUCT: {
            return {
                ...state,
                singleProduct: action.product.product
            }
        }

        default:
            return state
    }
}


export default productsReducer
