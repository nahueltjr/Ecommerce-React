import React, { useEffect, useState } from 'react'
import "./Home.css"
import {BiSearchAlt} from "react-icons/bi"
import {BiFilterAlt} from "react-icons/bi"
import {AiOutlineArrowRight} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { getProductsThunk } from '../../store/slices/products.slice'
import ProductCards from '../../components/ProductCard/ProductCards'
import Filters from '../../components/Filters/Filters'
import { useSelector } from 'react-redux'

export const Home = () => {

  const products = useSelector(state => state.Products)
  const dispatch = useDispatch()
  const [showFilterMobile, setShowFilterMobile] = useState(false)

  useEffect(()=>{
      dispatch(getProductsThunk())
  },[])

  const[inputSearch, setInputSearch]=useState("")

  const[objFilterPrice, setObjFilterPrice]=useState()
  const [filters, setFilters]=useState()
  
  useEffect(()=>{
    if(objFilterPrice?.input1 || objFilterPrice?.input2){
      const filter = products?.filter(e => {
        const price = Number(e.price)
        const min = objFilterPrice?.input1
        const max = objFilterPrice?.input2
  
        if(min == 0 && max == 0){
          return price > min
        }else if(min && max){
          return min <= price && price <= max
        }else if(min && !max){
          return min <= price
        }else if(!min && max){
          return price <= max
        }
      })
        setFilters(filter)
    }else if(inputSearch){
        const filter = products?.filter( e => e.title.toLowerCase().includes(inputSearch.toLowerCase()))
        setFilters(filter)
    }
  },[inputSearch,objFilterPrice?.input1,objFilterPrice?.input2,products])

  const productsRender = () =>{
    if((inputSearch  || objFilterPrice?.input1 || objFilterPrice?.input2) && filters?.length > 0 ){
      return (filters?.map(product=>(
          <ProductCards product={product} key={product.id}/>))) 
    }else if((inputSearch  || objFilterPrice?.input1 || objFilterPrice?.input2) && filters?.length == 0){
      return(
        <div className='No_products'>
          <h2>No products Found.</h2>
        </div>
      )
    }
    else{
       return (products?.map(product=>(
        <ProductCards product={product} key={product.id}/>)))
    }
  }
  return (
    <div className='Home'>
      <section className='Products'>
        <div className='Search_bar'>
          <div className='Search_bar_input'>
            <input onChange={e=>setInputSearch(e.target.value)} placeholder='Search product' autoComplete='off'/>
            <button><BiSearchAlt/></button>
          </div>
          <button onClick={()=>setShowFilterMobile(true)} className="Filter_btn"><BiFilterAlt/></button>
        </div>

        <div className={`Filters_mobile ${showFilterMobile? "show":""}`}>
          <div className="Close_btn">
            <AiOutlineArrowRight onClick={()=>setShowFilterMobile(false)}/>
          </div>
          <Filters setObjFilterPrice={setObjFilterPrice} setShowFilterMobile={setShowFilterMobile}/>
        </div>

        <div className='Products_grid'>
          {
            productsRender()
          }
        </div> 
      </section>

      <aside>
        <Filters setObjFilterPrice={setObjFilterPrice} setShowFilterMobile={setShowFilterMobile}/>
      </aside>
    </div>
  )
}
