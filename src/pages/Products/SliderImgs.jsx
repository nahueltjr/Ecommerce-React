import React, { useState } from 'react';
import "./SliderImgs.css"

const SliderImgs = ({product}) => {

    const [indexImg, setIndexImg] = useState(0)

    const handlePrev = () =>{
        if(indexImg - 1 < 0){
           setIndexImg(product.productImgs.length - 1) 
        }else{
            setIndexImg(indexImg - 1)
        }   
    }
    const handleNext = () =>{
        if(indexImg + 1 > product.productImgs.length - 1){
           setIndexImg(0) 
        }else{
            setIndexImg(indexImg + 1)
        }   
    }
    return (
        <div className='Slider'>
            <button className='Slider_prev' onClick={handlePrev}>&#60;</button>
            <div className='Slider_static'>
                <div style={{transform:`translateX(calc(-${indexImg}/3 * 100%))`}} className='Slider_move'>
                    {
                        product.productImgs.map(url=>(
                            <div key={url} className="Slider_img-container">
                                <img src={url} alt="" className='Slider_img'/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={handleNext} className='Slider_next'>&#62;</button>
        </div>
    );
};

export default SliderImgs;