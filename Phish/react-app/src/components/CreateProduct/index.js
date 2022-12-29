import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createProductThunk } from '../../store/product'


const CreateProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    // const [errorValidations, setErrorValidations] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newProduct = await dispatch (
            createProductThunk({
            name,
            description,
            price
            })
        )



        history.push(`/products/${newProduct?.id}`)
    }


    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price
                    <input
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                <button type='submit'>
                    Add to Listings
                </button>
                <Link exact to='/'>
                    Cancel
                </Link>
            </form>
        </main>
    )
}


export default CreateProduct
