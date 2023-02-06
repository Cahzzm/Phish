import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../store/all_products'
import { NavLink } from 'react-router-dom'
import './Products.css'



const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts)

    // console.log('this is products in all products', Object.values(products)[0].productImages[1].url)

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch]);



    return (
        <main className='main-all-products'>
            <div className='all-products-container'>
                {Object.values(products).map(product => (
                    <div key={product.id} className='single-product-card'>
                        <NavLink to={`products/${product.id}`}>
                        <img id='product-image-home' alt='' src={Object.values(product.productImages)[0]?.url}>
                        </img>
                        <p className='product-name'>
                            {product.name}
                        </p>
                        {/* <p>
                            {product.description}
                        </p> */}
                        <p className='product-price'>
                            ${product.price}
                        </p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </main>
    )
}



export default Products
