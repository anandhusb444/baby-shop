import axios from 'axios';
import React, {useState, createContext, useEffect} from 'react';
import toast from 'react-hot-toast';

export const ShopContext = createContext()

function ConterxtProvider({children}) {

  const id = localStorage.getItem("id")

    const [cart, setCart] = useState([])
    const [wish, setWish] = useState([])
    const [inputState, setInputState] = useState("")
    const [isAdmin,setIsAdmin] = useState(null)
    const [isUser,setIsUser] = useState(null)
    const [isCart,setIsCart] = useState(null)

    // useEffect(()=>{
    //   fetchCart()

    // },[cart])
  

    
    const addCart = async(item)=>{
      try
        {
          const res = await axios.post(`https://localhost:7114/api/Cart/AddtoCart?productId=${item.id}`,{},{
            headers:
            {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          if(res.data.data === "Done")
            {
              toast.success("Add to Cart")
              fetchCart()
              setCart()
              
            }
          console.log(res.data)
          
          //setCart()
        }
      catch(error)
        {
          console.log(error.data)
          if(error.response.data.message === "Product is out of stock")
            {
              toast.error("Out Of Stock")
            }
          else if(error.response.status === 401)
            {
              toast.error("Please Login")
            }
          
        }
    }
    
     
  
      const fetchCart = async () => {
        try {
          if (cart.length === 0 && id) { 
            const response = await axios.get(`https://localhost:7114/api/Cart/Cart`,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            console.log(response.data.data)
            setCart(response.data.data)
            console.log(response.data.data.total)
            //setTotal(response.data.data.total)
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
    
      

    
    

    const addWishlist = async (productId)=>
      {
        try
          {
            const respones = await axios.post(`https://localhost:7114/api/WhishList/AddToWhishList?productId=${productId}`,{},{
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            })
            console.log(respones.data)
            
            setWish(respones.data)
            
          }
        catch(error)
          {
            console.log(error.respones)
          }
       
      }

      const removeFromCart = async (elem)=>{
        const res = await axios.delete(`https://localhost:7114/api/Cart/RemoveFromCart?ProductId=${elem}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(res.status === 200)
        {
     
          setCart(pr=>pr.filter(val=>val.id!=elem))
          //console.log("removed");
          
        }
        console.log(res)
      }

     
        
    

    
    const incrementCart = async (item) => {
      console.log(localStorage.getItem("token"))

      try {
        const response = await axios.put(`https://localhost:7114/api/Cart/increaseQty?ProductId=${item}`,{},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response)
        if (response.status === 200) {


          // const updatedCart = response.data; // Assuming the API returns the updated cart
          //setCart(updatedCart); // Update the local cart state
          //localStorage.setItem('cart', JSON.stringify(updatedCart)); // Optionally update localStorage
          //toast.success('Item Added');
        } else {
          toast.error('Failed to increment item quantity');
        }
      } catch (error) {
        console.error('Error incrementing item quantity:', error);
        toast.error('Error incrementing item quantity');
      }
    };
    


    const decermentCart = async (item)=>{
     try
     {
      const respones =  await axios.put(`https://localhost:7114/api/Cart/DecreaseQty?productId=${item}`,{},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        
      })
     
      console.log(respones.data)
      if(respones.data.status === 200)
      {
        fetchCart()
        }
     }
     catch(error)
     {
      console.log(error.respones)
     }
    }

    
    const handleChangeIput = (e)=>{
      setInputState(e.target.value)
      // console.log(inputState)
    } 

    



    


    

//console.log(cart);

  

  return (
    <div>
        
     
        <ShopContext.Provider value={{addCart,
          addWishlist,
          cart, 
          setCart,
           id, 
           removeFromCart,
            incrementCart ,
             decermentCart,
             handleChangeIput,
              inputState,
              setInputState,
              setIsAdmin,
              isAdmin,
              setIsUser,
              isUser,
              isCart,
              setIsCart,
              wish,
              setWish,
              //fetchCart
              

              // clearCart
              }}>
        {children}
        </ShopContext.Provider>
      
    </div>
  );
}

export default ConterxtProvider;