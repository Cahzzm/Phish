import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductThunk } from '../../store/single_product'
// import { NavLink } from 'react-router-dom'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import './SingleProduct.css'
import { deleteProductThunk } from '../../store/all_products'
import { editCartItemThunk, postCartItemThunk } from '../../store/cart_item'
import { getCartThunk } from '../../store/cart'


const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart)
    const product = useSelector(state => state?.product?.singleProduct)
    const productImages = product.productImages
    const singleProductImage = Object?.values(productImages || {})[0]?.url
    const productOwner = product?.productOwner

    console.log(cart)

    useEffect(() => {
        dispatch(getSingleProductThunk(productId))
    }, [productId, dispatch])


    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteProductThunk(productId))

        history.push('/')
    }

    return (
        <main className='main-product-details'>
            <div className='product-detail-container'>
                <div className='product-detail-left-container'>
                    <div className='product-detail-image'>
                        <img id='display-img' src={singleProductImage} alt=''></img>
                    </div>
                    <div className='edit-delete-btns'>
                        {user?.id  === productOwner?.id &&
                            <>
                                <Link to={`/products/${productId}/edit`}>Edit</Link>
                                <button id='delete-product' onClick={handleDelete}>Delete</button>
                            </>
                        }
                    </div>
                    {/* <div className='customer-reviews-container'>
                        Reviews
                    </div> */}
                    <div className='product-description-container'>
                        Description
                        <br></br>
                        {product.description}
                    </div>
                </div>
                <div className='product-detail-right-container'>
                    <p>
                        {product?.name}
                    </p>
                    {/* <p>
                        {product?.description}
                    </p> */}
                    <p>
                        ${product?.price}
                    </p>
                    <button className='add-to-cart-btn'
                    onClick={async (e) => {
                        e.preventDefault()
                        await dispatch(postCartItemThunk(productId))
                        history.push('/cart')
                    }}
                    >
                    Add to cart
                    </button>
                </div>
                {/* {product.productImage} */}
            </div>
        </main>
    )
}



export default ProductDetails
