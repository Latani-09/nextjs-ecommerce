import { createSlice } from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addtoCart:(state,action)=>{
            const itemExist=state.find((item)=>item.id==action.payload.product.id);
            if (itemExist){
                itemExist.quatity++;
            }
            else{
                state.push({...action.payload.product,quatity:1})
            }
        },
        incrementQuantity:(state,action)=>{
            const itemExist=state.find((item)=>item.id=action.payload.product.id)
            itemExist.quatity++;
        },
        decrementQuantity:(state,action)=>{
            const itemExist=state.find((item)=>item.id=action.payload.product.id)
            if (itemExist.quantity==1){
                const index=state.findIndex((item)=>item.id==action.payload.product.id)
                state.splice(index,1);
            }
            else {
            itemExist.quatity--;
            }},
        removeFromCart:(state,action)=>{
            const index=state.findIndex((item)=>item.id==action.payload.id)
            state.splice(index,1);

        }
        
    }
})
export const cartReducer = cartSlice.reducer;

export const 
actions
= cartSlice.actions;