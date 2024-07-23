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

    //console.log("is login from the cartConxtext", isLogin)

    useEffect(() => {
      if (id) {
        axios.get(`http://localhost:8000/users/${id}`).then((response) => {
          setCart(response.data.cart || []);
        });
      }
    }, [id]);


    const addCart = (item)=>{
      if(id){
            const itemExists = cart.some(cartItem => cartItem.id === item.id);
            if(itemExists){
              toast.error('already added')
            }
            else{
              const ubdatedCart = [...cart,item]
              axios.patch(`http://localhost:8000/users/${id}`,{"cart":ubdatedCart})
              toast.success('added to cart')
              setCart(ubdatedCart)
            }
      }
      else{
        toast.error('user is not login')
      }
      
      
          }

          console.log("cart length from the cartcontext",cart.length)

    
    const removeFromCart = (elem)=>{
      const remove = cart.filter((item)=> item.id !== elem)
      axios.patch(`http://localhost:8000/users/${id}`,{"cart":remove})
      toast.error('item removed')
      setCart(remove)
    }

    const incrementCart = (item,num)=>{// thsi will add the cart product 
      let increment = cart.map(elem=>{
        return item===elem.id ? {...elem,quantity:parseInt(elem.quantity) + num}:elem
      })
      axios.patch(`http://localhost:8000/users/${id}`,{"cart":increment})
      setCart(increment)
    }

    const decermentCart = (item,num)=>{// this will decerase the cart product by the button
      let decerment = cart.map(elem=>{
        return item===elem.id ?{...elem,quantity:parseInt(elem.quantity) - num} : elem 
      })
      .filter((elem)=>elem.quantity >= 0 )// remove the product from the cart is the quantity is less than 0 
       axios.patch(`http://localhost:8000/users/${id}`,{"cart":decerment})
       setCart(decerment)
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
              }}>
        {children}
        </ShopContext.Provider>
      
    </div>
  );
}

export default ConterxtProvider;
