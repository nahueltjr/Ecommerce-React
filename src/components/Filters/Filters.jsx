import React, { useEffect, useState } from 'react';
import "./Filters.css"
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { filterCategoriesThunk } from '../../store/slices/products.slice'
import { getProductsThunk } from '../../store/slices/products.slice';
import { useDispatch } from 'react-redux';

const Filters = ({setObjFilterPrice}) => {

    const dispatch = useDispatch()
    const[categories, setCategories] = useState([])
    
    useEffect(()=>{

    axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
    .then(res => setCategories(res.data.data.categories))

    },[])

   
    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
          console.log('totally custom!'),
        );
      
        return (
          <button
            type="button"
            style={{ backgroundColor: 'transparent', border:"none"}}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }  
      
      const submit = e => {
          e.preventDefault()
          const obj ={
            from: e.target.value,
            to: e.target.value
          }
          setObjFilterPrice(obj)
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
                 <li onClick={()=>dispatch(getProductsThunk())}>All products</li>
                    {
                        categories.map(category=>(
                        <li key={category.id} onClick={()=>dispatch(filterCategoriesThunk(category.id))}>{category.name}</li>
                        ))
                    }
                </ul> 
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            {/* <Card>
                <Card.Header>
                <CustomToggle eventKey="1">Price</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <form onSubmit={submit}>
                        <ul>
                          <li>
                            <label htmlFor="fromPrice">From</label>
                            <input type="number" id='fromPrice'/>
                          </li>
                          <li>
                            <label htmlFor="toPrice">To</label>
                            <input type="number" id="toPrice"/>
                          </li>
                        </ul>
                        <button>Filter Price</button>
                    </form>
                </Card.Body>
                </Accordion.Collapse>
            </Card> */}
        </Accordion>
    );
};

export default Filters;