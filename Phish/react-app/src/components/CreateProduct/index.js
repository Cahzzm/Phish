import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createProductThunk } from '../../store/all_products'
import './CreateProduct.css'


const CreateProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newProduct = await dispatch (
            createProductThunk({
                name,
                description,
                price,
                preview_img_url: imgUrl
            })
        )

        // console.log('this is the new product',newProduct)
        if (newProduct) {
            newProduct.errors ? setErrors(newProduct.errors) : history.push(`/products/${newProduct.id}`)
        }
    }


    // useEffect(() => {
    //     const errs = []
    //     if(name.length < 3 || name.length >= 25) errs.push("Name must be between 3 and 25 characters")
    //     if(description.length < 10 || name.length < 200) errs.push("Description must be between 10 and 200 characters")
    //     if(price <= 0 || price > 9999) errs.push('Make the people spend some money but not too much!')
    //     if(imgUrl.length === 0) errs.push('Please provide an image url for your product')
    //     setErrors(errs)
    // }, [name, description, price, imgUrl])


    return (
        <main className='product-form-main'>
            <form  className='product-add-form' onSubmit={handleSubmit}>
                <div className='product-form-details-container'>
                    <div className='product-form-header'>
                        Listing Details
                    </div>
                    <div className='errors-create-form'>
                        {errors.map(error => (
                            <span key={error}>
                                {error}
                            </span>
                        ))}
                    </div>
                    <div className='product-form-name-container'>
                        <label>
                            Name
                        </label>
                            <input
                                type='text'
                                placeholder='Be clear, concise, and descriptive of the product being sold'
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
                                placeholder='Add details about your product to increase sales'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                    </div>
                    <div className='product-form-name-container'>
                        <label>
                            Image
                        </label>
                            <input
                                type='url'
                                placeholder='Image URL'
                                value={imgUrl}
                                onChange={e => setImgUrl(e.target.value)}
                            />
                    </div>
                    <div className='product-form-price-container'>
                        <label>
                            Price
                        </label>
                            <input
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                    </div>
                </div>
                <div className='product-form-btn-container'>
                    <button className='create-product-btn' type='submit' onSubmit={handleSubmit}>
                        Add to Listings
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


export default CreateProduct
