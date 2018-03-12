import React, {Component} from 'react';
import IabCategory from "./IabCategory";

export default class AdomainRow extends Component{

    handleClick(){
        alert("handle it later");
    }
    render(){
        const allIABcategoriesList = ["IAB1","IAB2","IAB3","IAB4","IAB5","IAB6","IAB7","IAB8","IAB9","IAB10","IAB11","IAB12","IAB13",
            "IAB14","IAB15"];
        const adomain = this.props.adomain;
        return(
            <tr>
                <td>{adomain.adomain}</td>
                <td>{adomain.name}</td>
                <td><IabCategory iabCategories={adomain.iabCategories} alliabCategories = {allIABcategoriesList}/></td>
                <td>{adomain.status}</td>
                <td><button onClick={()=>this.handleClick()}> Edit</button></td>

            </tr>
        )
    }


}