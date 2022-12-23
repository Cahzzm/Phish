import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneProductThunk } from '../../store/product'
// import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'


const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.singleProduct)

    console.log('this is product', product)


    useEffect(() => {
        dispatch(getOneProductThunk(productId))
    }, [productId, dispatch])


    return (
        <main>
            <div>
                {product.name}
                {/* {product.productImage} */}
            </div>
        </main>
    )
}



export default ProductDetails
