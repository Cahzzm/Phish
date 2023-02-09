import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCartHistoryThunk } from '../../store/cart';
import './OrderHistory.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const purchasedCarts = useSelector(state => state.cart.orderHistory)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCartHistoryThunk());
  }, [dispatch]);


  const usDollar = Intl.NumberFormat("en-US");

  if (!purchasedCarts) return null;

  return (
    <>
      <div className="checkout-page">
        <h1 className='checkout-title'>{user.username}'s Order History</h1>
        {purchasedCarts.length ?

          <div className='order-history-grid'>
            {purchasedCarts.map(cart => (
              <div key={cart.id} className="checkout-items-container">
                <div className="checkout-items">
                  {Object.values(cart.cartItems).map((item, idx) => (
                    <div key={idx} className="one-checkout-item">
                      <NavLink to={`/products/${item.product.id}`}>
                        <img
                          className='cart-item-image'
                          src={item.product.productImages[item.product.id].url ? item.product.productImages[item.product.id].url : item.product.productImages[item.product.id].url}
                          alt='cart item'
                        />
                      </NavLink>
                      <div className='checkout-item-title'>
                        {item.product.name}
                      </div>
                      <div className="checkout-item-quantity-and-price">
                        <div className='checkout-item-price'>
                          ${usDollar.format(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="checkout-total-container">
                  <span className="checkout-total">Total: </span>
                  <span className="checkout-price"> ${usDollar.format(cart.total)}</span>
                </div>
              </div>
            ))}
          </div> : <h1 className='empty-message'>No orders found</h1>}
      </div>
    </>
  )
}

export default OrderHistory;
