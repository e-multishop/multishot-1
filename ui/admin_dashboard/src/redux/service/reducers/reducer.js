import {ADD_TO_CART} from "../contants"

const initialState={
    cardData:[]
}
export default function cardItems(state=initialState,action){

    switch(action.type){
        case "ADD_TO_CART": 
            return[
                ...StaticRange,
                {cardData:action.data}
            ]
            break;
        default:
            return state;
    }
}