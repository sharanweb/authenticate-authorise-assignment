
import { useEffect, useState } from "react";
import axios from "axios";
import "./product.css"


export const Product = () =>{

    const [data, setData] = useState([]);


    const getData = ()=>{
        axios.get(`http://localhost:8000/products`).then(({ data }) => {
      setData(data.product);
    })
    console.log(data);
    }
    useEffect(()=>{
      getData();
      
    },[])


    return (
        <>
        <div className="mainbox">   
        {
            data.map((el)=>(
                <div className="product_card" key={el._id}>
                    <div className="imgDiv">
                        <img src={el.image} alt="" className="img" />
                    </div>
                    <div className="main_info">
                        {/* <h3>{el.name}</h3> */}
                        <h3 className="product__brand">{el.name}</h3>
                        <h4 className="product__title">{el.price}</h4>
                        <h5>Rating: {el.rating}</h5>
                    </div>
                </div>
            ))
        }
        </div>
        
        </>
        
    )

}