import axios from 'axios';
import React, {useState, createContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext()

function ConterxtProvider({children}) {

  const id = localStorage.getItem("id")// getting the id that is stored in the local storge using the getItem
  //console.log(id)



    const [cart, setCart] = useState([])
    const [inputState, setInputState] = useState("")
    const [isLogin, setIsLogin] = useState(!!id) // !! the doubel exclamerty mark return truty value if the value is empty string 0 null and false if the value is number stinrg etc...
    //console.log("is login from the cartConxtext", isLogin)


    const addCart = (item)=>{
      if(id){
        setIsLogin(true)
        toast.success('product add to the cart')        //string cart is the value of the database 
        axios.patch(`http://localhost:8000/users/${id}`,{"cart":[...cart,item]})//this code is editing the user id that is loged in the page and addin the cart item 
        setCart(cart)//added to the cart                //the sperad cart the state where item from the shop is added
      }
      else{
        toast.error('user is not loggin')
      }
          }
          // console.log(isLogin)

    const logoutUser = ()=>{
      localStorage.removeItem("id")
      setIsLogin(false)
      toast.success('user is logout from the browser')
    }


    const removeFromCart = (elem)=>{

      const remove = cart.filter((item)=> item.id !== elem)
      axios.patch(`http://localhost:8000/users/${id}`,{"cart":remove})
      toast.error('remove from the cart')
      setCart(remove)
    }

    const incrementCart = (item,num)=>{// thsi will add the cart product 
      let increment = cart.map(elem=>{
        return item===elem.id ? {...elem,quantity:elem.quantity+num}:elem
      })
      axios.patch(`http://localhost:8000/users/${id}`,{"cart":increment})
      setCart(increment)
    }

    const decermentCart = (item,num)=>{// this will decerase the cart product by the button
      let decerment = cart.map(elem=>{
        return item===elem.id ?{...elem,quantity:elem.quantity - num} : elem 
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
        
     
        <ShopContext.Provider value={{addCart,cart, setCart, id, removeFromCart, incrementCart , decermentCart,handleChangeIput, inputState,setInputState, isLogin, logoutUser}}>
        {children}
        <ToastContainer/>
        </ShopContext.Provider>
      
    </div>
  );
}

export default ConterxtProvider;
