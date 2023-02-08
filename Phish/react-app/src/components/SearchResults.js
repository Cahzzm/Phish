
import { NavLink, useLocation } from 'react-router-dom';
import './SearchResults.css'

const SearchResults = () => {
    const location = useLocation();

    const searchResults = location.state.searchResults;
    const searchInput = location.state.searchInput

    return (
        <main className="">
            {searchResults.length > 0 && <div style={{ 'height': '73px' }} />}
            <div>
                <div className='products-results-container'>
                    {searchResults.length ?
                        searchResults.map((product) => {
                            return (
                                <div className='product-container'>
                                    <NavLink
                                        key={product.id}
                                        to={`/products/${product.id}`}
                                        className="">
                                        <div className='product-image-container'>
                                            <img
                                                className='product-image'
                                                src={product?.productImage}
                                                alt='preview' />
                                        </div>
                                    </NavLink>
                                    <div className='product-details'>
                                        <NavLink
                                            key={product.id}
                                            to={`/products/${product.id}`}
                                            className="product-name-link">
                                            {product.name}
                                        </NavLink>
                                        <div className='product-price'>
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>
                            );
                        }) :

                        <div className='no-search-results'>
                            <div className='no-results-text'>
                                <div className='oops oops-no-results'>
                                    We couldn't find that.
                                </div>
                                <span>
                                    There are no results for “
                                    <span style={{ 'font-weight': 'bold' }}>{`${searchInput}`}</span>
                                    ”.
                                </span>
                                <div className='continue-shopping-div'>
                                    <NavLink
                                        className='continue-shopping-link'
                                        to='/'>
                                        Continue Shopping
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    }
                    <div style={{ 'height': '94px' }} />
                </div>
            </div>
        </main>
    );
};

export default SearchResults;
