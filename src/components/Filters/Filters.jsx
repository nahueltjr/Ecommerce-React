import React, { useEffect, useState } from 'react';
import "./Filters.css"
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { filterCategoriesThunk } from '../../store/slices/products.slice'
import { getProductsThunk } from '../../store/slices/products.slice';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { setProducts } from '../../store/slices/products.slice';

const Filters = ({setObjFilterPrice, setShowFilterMobile}) => {

    const dispatch = useDispatch()
    const[categories, setCategories] = useState([])
    
    useEffect(()=>{
    axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
    .then(res => setCategories(res.data.data.categories))
    },[])

    function CustomToggle({ children }) {
        return (
          <button
            type="button"
            style={{ backgroundColor: 'transparent', border:"none"}}
          >
            {children}
          </button>
        );
      }

      const {handleSubmit, register} = useForm()
      
      const submit = data => {
          setObjFilterPrice(data)
      }

    return (
        <Accordion defaultActiveKey={["0","1"]} alwaysOpen>
            <Card>
                <Card.Header>
                <CustomToggle eventKey="0">Categories</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <ul>
                 <li onClick={()=>{
                  dispatch(setProducts([]))
                  dispatch(getProductsThunk())
                  setShowFilterMobile(false)
                  }}>All products</li>
                    {
                        categories.map(category=>(
                        <li key={category.id} onClick={()=>{
                          dispatch(setProducts([]))
                          dispatch(filterCategoriesThunk(category.id))
                          setShowFilterMobile(false)
                        }}>{category.name}</li>
                        ))
                    }
                </ul> 
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <CustomToggle eventKey="1">Price</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <form onSubmit={handleSubmit(submit)}>
                        <ul>
                          <li>
                            <label htmlFor="fromPrice">From</label>
                            <input className='Price_input' type="number" id='fromPrice' {...register("input1")} placeholder="0"/>
                          </li>
                          <li>
                            <label htmlFor="toPrice">To</label>
                            <input className='Price_input' type="number" id="toPrice" {...register("input2")} placeholder="0"/>
                          </li>
                        </ul>
                        <button onClick={()=>setShowFilterMobile(false)} className='FilterPrice_btn'>Filter Price</button>
                    </form>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default Filters;