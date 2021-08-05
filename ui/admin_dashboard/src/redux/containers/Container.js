import Check from '../../practice/Check'
import{connect} from 'react-redux'
import {addToCart} from '../service/actions/actions'
 
const mapStateToProps=state=>({

})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Check)