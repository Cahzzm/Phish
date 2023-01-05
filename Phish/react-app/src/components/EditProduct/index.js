import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { putSingleProductThunk } from '../../store/single_product'
import './EditProduct.css'


const EditProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productDetails = useSelector(state => state.product.singleProduct)
    const productImages = productDetails.productImages
    const singleProductImage = Object?.values(productImages || {})[0]?.url
    const [name, setName] = useState(productDetails.name)
    const [description, setDescription] = useState(productDetails.description)
    const [price, setPrice] = useState(productDetails.price)
    const [imgUrl, setImgUrl] = useState(singleProductImage)
    const [errors, setErrors] = useState([])

    console.log(productDetails)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newProduct = {
                name,
                description,
                price,
            }

        let editedProduct = await dispatch(putSingleProductThunk(newProduct, productDetails?.id))

        // console.log('this is the new product',newProduct)
        if (editedProduct) {
            editedProduct.errors ? setErrors(editedProduct.errors) : history.push(`/products/${editedProduct.id}`)
        }
    }


    return (
        <main className='product-form-main'>
            <form  className='product-add-form' onSubmit={handleSubmit}>
                <div className='product-form-details-container'>
                    <div className='product-form-header'>
                        Listing Details
                    </div>
                    <div className='product-form-name-container'>
                        <label>
                            Name
                        </label>
                            <input
                                type='text'
                                placeholder={productDetails.name}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                    </div>
                    <div className='product-form-description-container'>
                        <label>
                            Description
                        </label>
                            <textarea
                                type='textarea'
                                placeholder={productDetails.name}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                    </div>
                    {/* <div className='product-form-name-container'>
                        <label>
                            Image
                        </label>
                            <input
                                type='url'
                                placeholder=''
                                value={imgUrl}
                                onChange={e => setImgUrl(e.target.value)}
                            />
                    </div> */}
                    <div className='product-form-price-container'>
                        <label>
                            Price
                        </label>
                            <input
                                type='number'
                                placeholder={productDetails.price}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                    </div>
                </div>
                <div className='product-form-btn-container'>
                    <button className='create-product-btn' type='submit' onSubmit={handleSubmit}>
                        Edit Listing
                    </button>
                </div>
            </form>
                    <div className='product-form-cancel'>
                        <Link exact to='/'>
                            Cancel
                        </Link>
                    </div>
        </main>
    )
}


export default EditProduct
