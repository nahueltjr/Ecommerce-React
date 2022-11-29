import React, { useEffect, useState } from 'react'
import "./Home.css"
import {BiSearchAlt} from "react-icons/bi"
import {BiFilterAlt} from "react-icons/bi"
import {AiOutlineArrowRight} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { getProductsThunk } from '../../store/slices/products.slice'
import { filterNameProductsThunk } from '../../store/slices/products.slice'
import ProductCards from '../../components/ProductCard/ProductCards'
import Filters from '../../components/Filters/Filters'
import { useSelector } from 'react-redux'

export const Home = () => {

  const[inputSearch, setInputSearch]=useState("")

  const products = useSelector(state => state.Products)
  
  const [showFilterMobile, setShowFilterMobile] = useState(false)

  // const[objFilterPrice, setObjFilterPrice]=useState([])

  const dispatch = useDispatch()
  
    useEffect(()=>{
      dispatch(getProductsThunk())
    },[])
  return (
    <div className='Home'>
      <section className='Products'>
        <div className='Search_bar'>
          <form onSubmit={()=>dispatch(filterNameProductsThunk(inputSearch))}>
            <input type="text" value={inputSearch} onChange={e=>setInputSearch(e.target.value)} placeholder="Search product"/>
            <button><BiSearchAlt/></button>
          </form>
          <button onClick={()=>setShowFilterMobile(true)} className="Filter_btn"><BiFilterAlt/></button>
        </div>

        <div className={`Filters_mobile ${showFilterMobile? "show":""}`}>
          <div className="Close_btn">
            <AiOutlineArrowRight onClick={()=>setShowFilterMobile(false)}/>
          </div>
          <Filters/>
        </div>

        <div className='Products_grid'>
          {
            products?.map(product=>(
               <ProductCards product={product} key={product.id}/> 
            ))
          }
        </div>
      </section>

      <aside>
        <Filters/>
      </aside>
    </div>
  )
}
