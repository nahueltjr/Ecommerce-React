import React from 'react';
import "./ProductCards.css"
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductsCard = ({product}) => {

    const products = useSelector(state => state.Products)

    return (
        <article className='Product_card' key={product.id}>
            <div className='Product_img'>
                <Link to={`/products/${product.id}`} >
                    <img src={product.productImgs?.[0]} alt="" className='Img_main'/>
                    <img src={product.productImgs?.[1]} alt="" className='Img_hover'/>
                </Link>
            </div>
            <Link to={`/products/${product.id}`} className='Title'>
                <h3>{product.title}</h3>
            </Link>
            <div className='Product_det'>
                <div className='Price'>
                    <p>{product.price}$</p>
                </div>
            <Link to={`/products/${product.id}`}>
                <div className='Product_add_btn'>
                    <AiOutlineShoppingCart/>
                </div>
             </Link>
            </div>             
        </article>
    );
};

export default ProductsCard;