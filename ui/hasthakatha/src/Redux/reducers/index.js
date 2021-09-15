import {combineReducers} from 'redux'
import cartItems,{AdminDashboard} from './reducer'

export default combineReducers({
    cartItems,
    AdminDashboard,
})