const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL_PRODUCTS'


const loadAllProducts = list => ({
    type: LOAD_ALL_PRODUCTS,
    list
})


export const getProductsThunk = () => async dispatch => {
    const response = await fetch(`/api/products`)

    if(response.ok) {
        const allProducts = await response.json()
        dispatch(loadAllProducts(allProducts))
        return allProducts
    }
}
