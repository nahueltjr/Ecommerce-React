import React from 'react';
import "./ProductCards.css"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductsCard = ({product}) => {

    return (
        <motion.article
        initial={{scale:0, opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{ delay: 0.2 , easeInOut: [0.17, 0.67, 0.83, 0.67] }}
        className='Product_card' key={product.id}>
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
        </motion.article>
    );
};

export default ProductsCard;