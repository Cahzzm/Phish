
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { getCartThunk } from "../../store/cart"
import { removeCartItemThunk } from "../../store/cart_item"
import './Cart.css'


const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const cartItems = useSelector(state => state.cart.cartItems)

    console.log('this is cart', cart)
    console.log('this is cartItems', cartItems)


    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    if(!cart || !cartItems) {
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
                        {Object.values(cartItems).map(cartItem => (
                            <div>
                                <img alt="" src={cartItem.product.productImages.url}></img>
                                <span>
                                    {cartItem.product.name}
                                </span>
                                <button onClick={async (e) => {
                                    e.preventDefault()
                                    await dispatch(removeCartItemThunk(cartItem.id))
                                    dispatch(getCartThunk())
                                }}>
                                    remove
                                </button>
                            </div>
                        ))}
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
    }


}



export default Cart
