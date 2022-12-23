import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../store/product'
import { NavLink } from 'react-router-dom'
import './Products.css'



const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.allProducts)
    const allProducts = Object.values(products)

    // console.log(allProducts)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])


    return (
        <main className='main-all-products'>
            <div className='all-products-container'>
                {allProducts.map(product => (
                    <div key={product.id} className='single-product-card'>
                        <NavLink to={`products/${product.id}`}>
                            {product.name}
                        <p>
                            {product.description}
                        </p>
                        <p>
                            {product.price}
                        </p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </main>
    )
}



export default Products
