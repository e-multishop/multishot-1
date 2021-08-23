import React,{ Component} from "react";
import "./Adminapp.scss";
import {Route,HashRouter,Switch} from 'react-router-dom';
import * as materialize  from 'materialize-css/dist/js/materialize';
import Insertproduct from './Pages/Product/Insertproduct';
class App extends Component{
  render(){
    return(
    //   <HashRouter>
    //     <Switch>
           
    //    </Switch>
    // </HashRouter>
    <Insertproduct/>
    );
  };
}

export default App;