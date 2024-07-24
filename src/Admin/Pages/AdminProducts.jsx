import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Adminmodel from '../Component/Adminmodel'
import Adminaddproduct from '../Component/Adminaddproduct'
import toast from 'react-hot-toast';
import Adminordermodel from '../Component/Adminordermodel';

function AdminProducts() {
  const [adminProduct, setAdminProduct] = useState([])
  const [isModel, setIsModel] = useState(false)
  const [isProductModel, setIsProductModel] = useState(false)
  const [productId, setProductId] = useState(null)
  const [product, setProduct] = useState(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const product = await axios.get('http://localhost:8000/products')
        setAdminProduct(product.data)
      } catch {
        console.error("Some server issue occurred")
      }
    }
    fetchAdminData()
  }, [adminProduct])

  const handleUpdate = (id,item) => {
    setProductId(id)
    setProduct(item)

    setIsModel(true)
  }

  // const handleAddProduct = () => {
  //   setProductId(null)
  //   setIsModel(true)
  // }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`)
      const remove = adminProduct.filter((item) => item.id !== id)
      setAdminProduct(remove)
      toast.error('product removed')
    } catch {
      console.error('There is an error in the admin product delete part')
    }
  }

  const addProductHandler = () => {
    console.log('button clicked')
    //setIsAddingProduct(true)
    setIsProductModel(true)
    //console.log(isAddingProduct)
  }

  return (
    <div className="p-9">
      <div className='flex justify-center'>
        <button
          onClick={addProductHandler}
          className="mb-6 bg-green-600 hover:bg-green-500 text-white font-bold p-2 rounded-sm"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {adminProduct.map((item) => (
          <div key={item.id} className="p-1 rounded overflow-hidden shadow-lg hover:scale-110 transition-transform duration-150 border-4 border-indigo-200">
            <img className="p-4 w-min h-60 object-cover" src={item.image} alt="Product Image" />
            <div className="px-4 py-3 boreder-4 border-indigo-400">
              <div className="font-bold text-base mb-3">{item.title}</div>
              <p className="text-gray-700 text-sm">{item.description}</p>
              <p className='text-gray-700 text-sm'>${item.price}</p>
            </div>
            <div className="px-4 py-3 flex space-x-3">
              <button onClick={() => handleDelete(item.id)} className="bg-blueberry-900 hover:bg-blueberry-800 text-white font-bold p-2 rounded-sm">
                Delete
              </button>
              <button onClick={() => handleUpdate(item.id,item)} className="bg-blueberry-900 hover:bg-blueberry-800 text-white font-bold p-2 rounded-sm">
                Update
              </button>
            </div>
          </div>
        ))}
        
        {isProductModel && <Adminaddproduct onClose={() => setIsProductModel(false)} productId={productId} product={product} />}
        {isModel && <Adminmodel onClose={() => setIsModel(false)} product={product} productId={productId} isAddingProduct={isAddingProduct} />}
      </div>
    </div>
  )
}

export default AdminProducts
