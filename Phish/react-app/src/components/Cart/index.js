import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartThunk } from "../../store/cart"




const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    if(!cart || !cart.cartItems) {
        return (
            <main className="shopping-cart-main">
                <div className="cart-items-container">
                    
                </div>
            </main>
        )
    }


}



export default Cart
