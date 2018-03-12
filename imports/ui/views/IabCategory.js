import React, {Component} from 'react';

export default class IabCategory extends Component{

    render(){
        const categories = this.props.iabCategories;
        return(
            <div>{categories.join(", ")}</div>
        )
    }
}