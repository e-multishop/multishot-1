import React, {Component } from 'react'
import Card from '../../Card/Card';

class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="row">
                {
               this.props.items.map((value)=>{
                    return(
                    <div className="col s4"><Card description={value.description} footer={value.footer}/> </div>               
                    )
                }) 
            }
            
            </div>
            
            
        )
    }
}

export default Slider;