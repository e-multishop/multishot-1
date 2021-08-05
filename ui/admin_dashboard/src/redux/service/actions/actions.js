import {ADD_TO_CART} from '../contants'
export const addToCart=(data)=>{
    return{
        type:ADD_TO_CART,
        data:data
    }
}