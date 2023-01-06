
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { getCartThunk } from "../../store/cart"
import { editCartItemThunk, removeCartItemThunk } from "../../store/cart_item"
import { purchaseCartThunk } from "../../store/cart"
import './Cart.css'


const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const cartItems = useSelector(state => state.cart.cartItems)
    // const [quantity, setQuantity] = useState(1)
    // const singleProductImage = Object?.values(cartItems?.product)
    const cartItemsArr = Object.values(cartItems || {})
    // console.log('this is cart', cart)
    // console.log('this is cartItems', cartItems)
    // console.log('this is the image', singleProductImage)

    const getTotal = (cartItemsArr) => {
        let total = 0
        for (let i = 0; i < cartItemsArr.length; i++) {
            let cartItem = cartItemsArr[i]
            total += cartItem.product.price
        }
        return total
    }

    console.log('this is cartitems array', cartItemsArr)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    if(!cart) {
        return (
            <main className="shopping-cart-main">
                <div className="cart-items-container">
                    <div className="items-container">
                        <div className="items-in-cart-title">
                            <p>Items In Cart</p>
                        </div>
                        <div className="items-in-cart">
                            <img id='shopping-cart-cart' alt="" src="https://res.cloudinary.com/drybvuzux/image/upload/v1672795199/phish-shopping-cart_bqp9cr.svg"></img>
                            <p className="your-cart-is-empty">Your cart is empty!</p>
                            <NavLink to='/'>
                                <button className="continu-shopping-btn">
                                    Continue Shopping
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="order-summary-container">
                        <div className="order-summary-title">
                            <p>Order Summary</p>
                        </div>
                        <div className="order-summary">
                            <div className="item-total">
                                <span>Item Total</span>
                                <span>$0.00</span>
                            </div>
                            <div className="shipping">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="order-total">
                                <span>Order Total</span>
                                <span>$0.00</span>
                            </div>
                            <div className="money-back-guarantee">
                                <span>Money Back Guarantee</span>
                                <img id='money-back-box' src="https://res.cloudinary.com/drybvuzux/image/upload/v1672878516/money-back_m3exdb.svg" alt=""></img>
                            </div>
                            <div className="money-back-gurantee-body">
                                <span>We've got your back. Get a full refund if any of your items don’t arrive.Learn More</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    } else {
        return (
            <main className="shopping-cart-main">
            <div className="cart-items-container">
                <div className="items-container">
                    <div className="items-in-cart-title">
                        <p>Items In Cart</p>
                    </div>
                    <div className="items-in-cart">
                        {Object?.values(cartItems || {})?.map(cartItem => (
                            <div className='cart-item-card' key={cartItem.product.id}>
                                    <NavLink to={`/products/${cartItem.product.id}`}>
                                    <div className="cart-item-details">
                                        <img id='cart-item-image' alt="" src={cartItem.product.productImages[cartItem.product.id].url}></img>
                                        <div className="product-cart-details">
                                        <span style={{fontWeight: 700}}>
                                            {cartItem.product.name}
                                        </span>
                                        <span>
                                            ${cartItem.product.price}
                                        </span>
                                        </div>
                                    </div>
                                    </NavLink>
                                        {/* <span>
                                            Quantity:
                                            <select
                                            id="quantity-select"
                                            type="select"
                                            value={cartItem.quantity}
                                            onChange={async (e) => {
                                                setQuantity(e.target.value)
                                                await dispatch(editCartItemThunk(cartItem, quantity))
                                                await dispatch(getCartThunk())
                                            }}
                                            >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </span> */}
                                    <div className="remove-btn-container">
                                        <button className="remove-cartItem-btn" onClick={async (e) => {
                                            e.preventDefault()
                                            await dispatch(removeCartItemThunk(cartItem.id))
                                            dispatch(getCartThunk())
                                        }}>
                                            Remove
                                        </button>
                                        </div>
                                </div>
                        ))}
                    </div>
                        <NavLink to='/'>
                            <button className="continu-shopping-btn">
                                Continue Shopping
                            </button>
                        </NavLink>
                </div>
                <div className="order-summary-container">
                    <div className="order-summary-title">
                        <p>Order Summary</p>
                    </div>
                    <div className="order-summary">
                        <div className="item-total">
                            <span>Item Total</span>
                            <span>${getTotal(cartItemsArr)}</span>
                        </div>
                        <div className="shipping">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="order-total">
                            <span>Order Total</span>
                            <span>${getTotal(cartItemsArr)}</span>
                        </div>
                        <div className="seperator-checkout-container">
                            <div className="order-seperator"></div>
                            <div className="checkout-btn">
                                <button
                                onClick={() => {
                                    dispatch(purchaseCartThunk())
                                }}
                                id="checkout-button">Checkout</button>
                            </div>
                            <div className="order-seperator"></div>
                        </div>
                        <div className="money-back-guarantee">
                            <span>Money Back Guarantee</span>
                            <img id='money-back-box' src="https://res.cloudinary.com/drybvuzux/image/upload/v1672878516/money-back_m3exdb.svg" alt=""></img>
                        </div>
                        <div className="money-back-gurantee-body">
                            <span>We've got your back. Get a full refund if any of your items don’t arrive</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        )
    }


}



export default Cart
