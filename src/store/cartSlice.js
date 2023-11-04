import { createSlice } from "@reduxjs/toolkit";

// this will prevent cart to be emptied on refresh

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        add(state,action){
             state.push(action.payload)
        },
        del(state,action){
            return state.filter(item=>item.id!==action.payload.id)
        }
       
    }

})
export const {add,del} =cartSlice.actions
export default cartSlice.reducer