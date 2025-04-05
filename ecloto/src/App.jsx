import { useState } from 'react';
import { products} from './data';
import './App.css'

const Ecloto=()=>{
   

   const free_gift={id:99,name:"Wireless Mouse",price:0}
  
   const threshold=1000;

   //additems, It's take for add to cart.
   const [additems,setAdditems]=useState([])
    let lenghtitems=additems.length

    const [gift,setGift]=useState({amount:0,status:false})

    //When you click the (add to cart), there're add to additems as well add the amount for gift.
   const additem=(id)=>{
    let data=products.find(item=>item.id==id)
    setGift({...gift,amount:parseInt(gift.amount)+parseInt(data.price)})
    if(gift.amount>=threshold){
       setGift({...gift},gift.status=true)
    }
     setAdditems([...additems,data])
   }
    

   //When you click the (+) buttton, It's increase the quantity as well add the amount for gift.
   const add=(id)=>{
     let qun=additems.find(item=>item.id==id)
     setGift({...gift,amount:parseInt(gift.amount)+parseInt(qun.price)})
     if(gift.amount>=threshold){
        setGift({...gift,status:true})
     }

      setAdditems([...additems],qun.quantity=parseInt(qun.quantity)+1)
      setAdditems([...additems],qun.total=parseInt(qun.quantity)*parseInt(qun.price))
   }


   //When you click the (-) button, It's decrease the quantity.
   const sub=(id)=>{
    let qun=products.find(item=>item.id==id)
    setAdditems([...additems],qun.quantity=parseInt(qun.quantity-1))
    setAdditems([...additems],qun.total=parseInt(qun.quantity)*parseInt(qun.price))
   }


   //When you click the delete, It's remove the cart.
   const remove=(id)=>{
     let a=window.confirm("Do You Want to Delete...")
     if(a==true){
      let output=additems.filter(item=>item.id!==id)
      setAdditems(output) 
     }
   }


  return (
    <>
      <div className='main'>
          <h1 className='head'>Shopping Cart</h1>
          <h1 className='side1'>Products</h1>
          <div className='products'>
            {
              products.map(item=>(
                <div key={item.id} className='items'>
                  <h1 className='item'>{item.name}</h1>
                  <h1 className='item'>{item.price}</h1>
                  <button className='button' onClick={()=>additem(item.id)}>Add to Cart</button>
                </div>
              ))
            }
          </div>
          <h1 className='side1'>Cart Summary</h1>
          <div className='gift'>
            <div className='subtotal'>
              <h1 className='status'>Subtotal:</h1>
              <h1 className='status'>{gift.amount}</h1>
            </div>
            <hr/>
            {
              gift.status?<h1 className='status'>You got a free Wireless Mouse!</h1>:<div className='side2'>
              <h1 className='status'>Add 1000 more to get a FREE Wireless Mouse!</h1>
              {gift.amount>=900?<hr className='range1'/>:<hr className='range'/>}
            </div>
            }
            
          </div>
          <div>
            {
                lenghtitems?<div>
                  <h1 className='side1'>Cart Items</h1>
                  {
                    additems.map(item=>(
                      <div key={item.id} className='additems'>
                        <div>
                        <h1 className='additem'>{item.name}</h1>
                        <h1 className='additem1'>{item.price} * {item.quantity} = {item.total}</h1>
                        </div>
                        <div>
                          <button className='sub' onClick={()=>sub(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button className='add' onClick={()=>add(item.id)}>+</button>
                          <button className='delete' onClick={()=>remove(item.id)}>Delete</button>
                        </div>
                      </div>
                    ))
                  }
                  {
                  gift.status?<div className='additems'>
                    <div>
                      <h1 className='additem'>{free_gift.name}</h1>
                      <h1 className='additem1'>0 * 1 = 0</h1>
                    </div>
                    <div>
                      <button className='free'>FREE GIFT</button>
                    </div>
                  </div>:<></>
                  }
                </div>:<div className='noitems'>
                  <h1 className='empty'>Your cart is empty</h1>
                  <h1 className='empty'>Add some products to see them here!</h1>
                </div>
            }
          </div>
        </div>
    </>
  )
}

export default Ecloto;
