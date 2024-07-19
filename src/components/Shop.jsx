import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { ShopContext } from './Cartcontext';



const Shop = () => {
  
  const [fetchProduct,setFetchProduct] = useState([])
  const {addCart, inputState } = useContext(ShopContext)
  //console.log(this is input, inputState)
  

  useEffect(()=>{
    const productFetchData = async ()=>{
      try{
        const data = await axios.get('http://localhost:8000/products')
        setFetchProduct(data.data)
        //console.log(data.data)
      }
      catch{
        console.error("there is some server error ")
      }
      
    }
    productFetchData()
    //console.log(fetchProduct)
    
  },[])

  const filterdProduct = fetchProduct.filter((item)=> item.title.toLowerCase().includes(inputState.toLowerCase()))
  return (
    <div className="p-7  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      
      {filterdProduct.map((item) => (
        <div key={item.id} className=" p-1 rounded overflow-hidden shadow-lg hover:scale-110 transition-transform duration-150">
          <img className="p-4 w-min h-60 object-cover" src={item.image} alt="Product Image" />
          <div className="px-4 py-3">
            <div className="font-bold text-base mb-3">{item.title}</div>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
          <div className="px-4 py-3">
            <button onClick={()=>addCart(item)} className="bg-blueberry-900 hover:bg-blueberry-800 text-white font-bold py-2 px-4">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      </div>

     
    
        
        
    


    
  );
};

export default Shop;
