import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductThunk } from '../../store/single_product'
// import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import './SingleProduct.css'


const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.singleProduct)

    console.log('this is product', product)


    useEffect(() => {
        dispatch(getSingleProductThunk(productId))
    }, [productId, dispatch])


    return (
        <main className='main-product-details'>
            <div className='product-detail-container'>
                <div className='product-detail-left-container'>
                    <div className='product-detail-image'>
                        <img id='display-img' src='img.com' alt='product'></img>
                    </div>
                    <div className='customer-reviews-container'>
                        Reviews
                    </div>
                    <div className='product-description-container'>
                        Description
                        <br></br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className='product-detail-right-container'>
                    <p>
                        {product.name}
                    </p>
                    <p>
                        {product.description}
                    </p>
                    <p>
                        {product.price}
                    </p>
                </div>
                {/* {product.productImage} */}
            </div>
        </main>
    )
}



export default ProductDetails
