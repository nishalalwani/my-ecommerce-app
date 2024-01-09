import React,{useEffect, useState} from 'react'
import myContext from "./MyContext"
import { QuerySnapshot,addDoc,getDocs ,Timestamp, collection, onSnapshot, orderBy ,query, deleteDoc,setDoc,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/firebase';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const MyState = ({children}) => {

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [selecttitle, setSelecttitle] = useState('')
  const [mode, setMode] = useState('light');
  const [loading,setLoading] =useState(false)
  const [products,setProducts] =useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    rating:null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
        "en-US",{
            month:"short",
            day:"2-digit",
            year:"numeric"
        }
    )

  })

  const addProduct= async (e)=>{
    e.preventDefault()
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null ||products.rating == null|| products.description == null) {
        return toast.error('Please fill all fields')
      }
      const productref =collection(fireDB,"products")
      setLoading(true)
      try{
           await addDoc(productref,products)
            toast.success("Product Add successfully")
            getProductData()
            setLoading(false)
         navigate("/dashboard")
          
}
      catch(error){
        toast.error("error found")
        setLoading(false)

      }
      setProducts("")
    }

    const [product, setProduct] = useState([])

    const getProductData= async()=>{
        setLoading(true)
        try{
          const q= query(
            collection(fireDB,"products"),
            orderBy("time")
          )

          const data=onSnapshot(q,(QuerySnapshot)=>{
            let productsArray=[]
            QuerySnapshot.forEach((doc)=>{
                productsArray.push({...doc.data(),id:doc.id})
            })
            setProduct(productsArray)
            setLoading(false);
          })
          return () => data;
        }
        catch(error){
            setLoading(false)
        }
    }

    const edithandle=(item)=>{
        setProducts(item)
}

const updateProducthandle = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      
      setTimeout(()=>{
        navigate('/dashboard')
      },8000)
      getProductData();
      setLoading(false)
      
    } catch (error) {
        toast.error("update failed")
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

const deletehandle= async(item)=>{
    try{
        setLoading(true)
        await deleteDoc(doc(fireDB,"products",item.id))
        toast.success('Product Deleted successfully')
        setLoading(false)
        getProductData()
    }
    catch(error){
        toast.error("delete operation failed")
        setLoading(false)
    }
}

    useEffect(()=>{
        getProductData()
    },[])

  const toggleMode = () => {
  
    // const eletag=document.querySelectorAll('h1','h2','h3','h4','h5','h6','p' )
  
      if (mode === 'light') {
          setMode('dark');
          document.body.style.backgroundColor = "rgb(17, 24, 39)"
      
      }
      else {
          setMode('light');
          document.body.style.backgroundColor = ""
         
      }
  }
const[subtotal,setSubtotal]=useState(0)
  const productCart=useSelector(state=>state.cart)
  

useEffect(()=>{
  console.log(productCart)
  const temp=productCart?.reduce((amt,item)=>{
    return( amt+ Number(item.price))
},0)
setSubtotal(temp)
console.log(subtotal)
},[productCart])

const [order, setOrder] = useState([]);

const getOrderData= async ()=>{
  setLoading(true)
  try{
    const result=await getDocs(collection(fireDB,"orders"))
    const orderArray=[]
    result.forEach((doc)=>{
      orderArray.push(doc.data())
    
    })
    setOrder(orderArray)
    setLoading(false)
  } catch(error){
    console.log(error)
    setLoading(false)
  }
}

const [user, setUser] = useState([]);

const getUserData=async()=>{
  setLoading(true)
  try{
    const result=await getDocs(collection(fireDB,"users"))
    const userArray=[]
    result.forEach((doc)=>{
      userArray.push(doc.data())
      setLoading(false)
    })
    setUser(userArray)
    setLoading(false)
  }
  catch(error){
    console.log(error)
    setLoading(false)
  }
}
useEffect(() => {
  getOrderData();
  getUserData();
}, []);

const arr=[];
product.map((ele)=>{
  return(
    arr.push(ele.category)
  )
})

const newSet=new Set(arr)
const searchfilterkey=[...newSet]

 
  return (
    <>
        <myContext.Provider value={{mode,toggleMode,loading,setLoading,
          products, product, setProducts,addProduct,edithandle,
          deletehandle,updateProducthandle,searchkey, setSearchkey,
          filterType, setFilterType,selecttitle, setSelecttitle,subtotal,
          setSubtotal,user,order,searchfilterkey}}>
            {children}
        </myContext.Provider>
    </>
  )
}

export default MyState