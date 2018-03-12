import React, { Component, PropTypes } from 'react';


export default class CategoryView extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            iabCategories : this.props.iabCategories
        }
    }

    componentDidMount() {
        const allIABCategoriesList = ["IAB1", "IAB2", "IAB3", "IAB4", "iAB5", "IAB6", "IAB7", "IAB8", "IAB9", "IAB10", "IAB11",
            "IAB12", "IAB13", "IAB14"];
        const {onChange} = this.props;
        $('#iab-category-select').selectize({
            items: this.state.iabCategories,
            options: allIABCategoriesList.map((category, index) => {return{id:index, value:category}}),
            labelField: 'value',
            valueField: 'value',
            searchField: ['value'],
            plugins: ['optgroup_columns', 'remove_button'],
            openOnFocus: true,
            placeholder: 'Select some Categories',
            onChange : (event)=> onChange(event)
        });


        //$('#query-builder-select')[0].selectize.focus();
    }

    render() {
             return (
                 <div className="form-group row">
                     <label className="col-sm-2 col-form-label "> <strong>IAB Categories : </strong></label>
                     <select className="col-sm-10" id ='iab-category-select' multiple />
                 </div>
                )
    }

};
