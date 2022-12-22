import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../store/product'
import { NavLink } from 'react-router-dom'



const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.allProducts)
    const allProducts = Object.values(products)

    // console.log(allProducts)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])

    console.log('this is products',products)

    return (
        <main>
            <ul>
                {allProducts.map(product => (
                    <li key={product.id}>
                        <NavLink to={`products/${product.id}`}>
                            {product.name}
                        </NavLink>
                        <p>
                            {product.description}
                        </p>
                        <p>
                            {product.price}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    )
}



export default Products
