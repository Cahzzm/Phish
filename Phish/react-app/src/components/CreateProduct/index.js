import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'


const CreateProduct = () => {
    // const dispatch = useDispatch()

    const [productName, setProductName] = useState()

    return (
        <main>
            <form>
                <label>
                    <input
                        type='text'
                        placeholder='Name'
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    >
                    Name
                    </input>
                </label>
            </form>
        </main>
    )
}


export default CreateProduct
