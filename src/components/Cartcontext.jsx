import axios from 'axios';
import React, {useState, createContext, useEffect} from 'react';
import toast from 'react-hot-toast';

export const ShopContext = createContext()

function ConterxtProvider({children}) {

  const id = localStorage.getItem("id")// getting the id that is stored in the local storge using the getItem
  //console.log(id)


    const [cart, setCart] = useState([])
    const [inputState, setInputState] = useState("")
    const [isAdmin,setIsAdmin] = useState(null)
    const [isUser,setIsUser] = useState(null)
    const [isCart,setIsCart] = useState(null)

    
    
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        setCart(storedCart);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    const clearCart = () => { 
      setCart([]);
      localStorage.removeItem('cart');
    };

    useEffect(() => {
      if (id) {
        axios.get(`http://localhost:8000/users/${id}`).then((response) => {
          setCart(response.data.cart || []);
        });
      }
    }, [id]);

    const addCart = async (item) => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not logged in");
        return;
      }
    
      if (id) {
        const itemExists = cart.some(cartItem => cartItem.id === item.id);
        
        if (itemExists) { 
          toast.error('Item already added');
        } else {
          try {
            console.log(item.id)
            const response = await axios.post(`https://localhost:7114/api/Cart/AddtoCart?productId=${item.id}`,{},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
    
            console.log(response.data);
    
            if (response.status === 200) {
              const updatedCart = [...cart, { ...item, quantity: 1 }];
              setCart(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage

              toast.success('Added to cart');
            } else {
              toast.error('Failed to add to cart');
            }
          } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart');
          }
        }
      } else {
        toast.error('User is not logged in');
      }
    };
    


    
    const removeFromCart = async (elem)=>{
      // remove = cart.filter((item)=> item.id !== elem)
      const res = await axios.delete(`https://localhost:7114/api/Cart/RemoveFromCart?ProductId=${elem}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.status === 200)
      {
        toast.error('item removed')
        setCart(clearCart)
        const updatedCart = cart.filter(item => item.id !== elem);
        setCart(updatedCart);

      }
      console.log(res)
      //setCart(res.data.data)
    }

    

    // const incrementCart = (item,num)=>{
     
    //   let increment = cart.map(elem=>{
    //     return item===elem.id ? {...elem,quantity:parseInt(elem.quantity) + num}:elem
    //   })
    //   axios.patch(`http://localhost:8000/users/${id}`,{"cart":increment})
    //   setCart(increment)
    // }
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
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
          );

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
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        )
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
              //clearCart
              }}>
        {children}
        </ShopContext.Provider>
      
    </div>
  );
}

export default ConterxtProvider;