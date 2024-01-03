const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name:'cart',
    initialState:[],//hold more than one items
    reducers:{
        //function to add items into cart
        addToCart : (state,action)=>{
            state.push(action.payload)
        },
        //function to remove item from the cart
        removeFromCart :(state,action)=>{
          return  state.filter(item=>item.id!=action.payload)
        },
        removeAllItemFromCart:(state)=>{
           return state=[]
        }
    }
})

export const {addToCart, removeFromCart, removeAllItemFromCart} = cartSlice.actions
export default cartSlice.reducer