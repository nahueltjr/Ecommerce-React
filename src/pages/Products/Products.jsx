import React, { useEffect } from 'react'
import "./Products.css"
import ProductsCard from '../../components/ProductCard/ProductCards'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsThunk } from '../../store/slices/products.slice'
import SliderImgs from './SliderImgs'
import {AiOutlineShoppingCart} from "react-icons/ai"

export const Products = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])

  const productsList = useSelector(state => state.Products)

  const {id} =useParams()

  const product = productsList.find(product=> product.id === Number(id))

  const relatedProducts = productsList.filter(p => p.category.name === product.category.name && p.id !== product.id)

  return (
    <section className='Product'>
        
      <div className='Product_detail'>
        <div className="Slider_container">
          { product && <SliderImgs product={product}/> }
        </div>
        <div className='Product_detail_description'>

          <h4>{product?.title}</h4>

          <div className="Price">
            <span>Price</span>
            <span>Quantity</span>
            <p>$ {product?.price}</p>
            <div className="Add_btns">
                <button>-</button>
                <p>1</p>
                <button>+</button>
            </div>
          </div>
          
          <div className="AddCart_btn">
            <button >Add to cart <AiOutlineShoppingCart/></button>
          </div>
          
          <p>{product?.description}</p>
        </div>
      </div>

      <h3>Discover similar products</h3>

      <div className='Related_products'>
        
        {
          relatedProducts.map(rp => (
            <div key={rp.id}>
              <ProductsCard product={rp}/>
            </div>
          ))
        }
      </div>
    </section>
  )
}
