import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../store/product'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'


const ProductDetails = () => {
    const { productId } = useParams()
}
