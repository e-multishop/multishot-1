import Card from '../../Components/Card/Card'
import {connect} from 'react-redux'
import {addToCart}  from '../actions/index'
// const mapStateProps=state=>{

// }
// const mapDispatchtoProps=dispatch=>({
//     addToCartHandler:data=>dispatch(addToCart(data))
// })

// export default connect(mapStateProps,mapDispatchtoProps)(Card)


const mapStateToProps=state=>({
    data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(Card)