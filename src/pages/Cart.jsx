import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeAllItemFromCart, removeFromCart } from '../redux/slices/cartSlice';



function Cart() {

  const [total,setTotal] = useState(0)
  const cartArray = useSelector((state)=>state.cartReducer)
  // console.log(cartArray);

  const dispatch = useDispatch()
  const navigate = useNavigate()

//function to calculate total
  const gettotal=()=>
  {
    const totalprice=cartArray.map((item)=>item.price).reduce((n1,n2)=>n1+n2,0);
    setTotal(totalprice)
  }

  useEffect(()=>{
    gettotal()
  },[cartArray])

//function to get alert of order placed
  const handleCart =()=>{
    alert("your order placed succesffully, Thank you!")
    dispatch(removeAllItemFromCart())
    navigate('/')
  }

  return (
    <>
      <div style={{marginTop:'100px'}}>
        <div className='row w-100'>
         { cartArray?.length>0?
         <div className='d-flex justify-content-between'>
            <div className='col-lg-6 m-5'>
              <table className='table shadow border'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
        
                <tbody>
                  { cartArray?.map((item,index)=>(<tr>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td><img style={{width:'100px',height:'100px'}} src={item.image} alt="no image" /></td>
                    <td> ₹ {item.price}</td>
                    <td><Button onClick={()=>dispatch(removeFromCart(item.id))} variant="outline-danger"><i class="fa-solid fa-trash"></i></Button></td>
                  </tr>))}
                </tbody>
              </table>
            </div>
             <div className="col-lg-6 mt-4">
             <h2 className='text-primary'>Cart Summary</h2>
             <h5>Total Number of Items {cartArray.length}</h5>
             <h3>Price : {total}</h3>
             <button onClick={handleCart} type='button' className='btn btn-warning rounded'>Order</button>
            </div>
         </div>
          : <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
              <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="no image" height={'300px'}/>
              <h3 className='text-success fw-bolder'>Your Cart is empty</h3>
              <button className='btn btn-warning mt-2'><Link style={{textDecoration:'none' , color:'white'}} to={'/'}><i class="fa-solid fa-arrow-left"></i> Back to Home</Link></button>
            </div>
          }
          
        </div>
      </div>
    </>
  )
}

export default Cart