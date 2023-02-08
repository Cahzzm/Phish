
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductsThunk } from '../store/all_products';
// import SearchResults from './SearchResults';
import UserDropdown from './UserDropdown';
import './SearchResults.css'

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)
  const products = useSelector(state => state.products.allProducts)
  const productsArr = Object.values(products)

  const [searchInput, setSearchInput] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [productsArrState, setProductsArrState] = useState(productsArr)

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])

  useEffect(() => {
    if (!showDropdown) {
      return
    }
    const closeDropdown = () => {
      setShowDropdown(false)
    }

    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener("click", closeDropdown);
  }, [showDropdown])

  const displayDropdown = () => {
    if (showDropdown) return
    else setShowDropdown(true)
  }

  const updateSearchInputAndDropdown = (e) => {
    setSearchInput(e.target.value)
    setProductsArrState(productsArr.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const fetchSearchResults = async (e) => {
    e.preventDefault()

    if (!searchInput) return null

    else {
      const search = await fetch(`/api/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchInput })
      })
      const res = await search.json();
      const searchResults = res?.products;
      console.log('products found?', searchResults);

      history.push({
        state: {
          searchResults: searchResults,
          searchInput: searchInput
        },
        pathname: '/search'
      })


      setShowDropdown(false)
      setSearchInput("")
    }
  }

  return (
    <div className='navbar-container'>
      <div className='phish-home-button'>
          <NavLink to='/' exact={true}>
            phish
          </NavLink>
      </div>
      <div className='search-container'>
        <form onSubmit={fetchSearchResults} className="search-message-form-form">
          <div>

          </div>
        <input
            onClick={displayDropdown}
            className='search-message-form-input-container'
            // type="submit"
            maxLength={40}
            value={searchInput}
            onChange={updateSearchInputAndDropdown}
            placeholder={`Search`}
          >
          </input>
          <i class="fa-solid fa-magnifying-glass"/>
        </form>
        {showDropdown && (
          <div className='search-dropdown'>
            {
              productsArrState.map(product => {
                return (
                  <div
                    key={product.id}
                    onClick={() => history.push(`/products/${product.id}`)}
                    className='search-result'>
                    {product.name}
                    <img className='search-image' src={product.productImages[product.id]?.url} alt=''>
                    </img>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
      <div className='right-side-navbar'>
        {!sessionUser &&
          <NavLink className='sell-with-phish' to='/signin' exact={true} style={{color:'rgb(0, 144, 217)', marginRight:'10px'}}>
            Sign In
          </NavLink>
        }
          {sessionUser &&
          <>
              <UserDropdown></UserDropdown>
              {/* <NavLink className='sell-with-phish' to='/products/new' exact={true}>
                Sell With Phish
              </NavLink> */}
              <NavLink to='/cart' exact={true}>
                  <img id='phish-shopping-cart' alt='' src='https://res.cloudinary.com/drybvuzux/image/upload/v1672795199/phish-shopping-cart_bqp9cr.svg'></img>
              </NavLink>
          </>
          }
         {/* {sessionUser &&
          <LogoutButton />
         } */}
      </div>
    </div>
  );
}

export default NavBar;
