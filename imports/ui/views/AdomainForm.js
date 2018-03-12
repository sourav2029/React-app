import React, {Component} from 'react';
import RejectionView from './RejectionView';
import CategoryView from './CategoryView'
class AdomainForm extends Component {
    constructor(props) {
        super(props);
        const {row} = this.props;
        const {original} = row;
        console.log(props);
        this.state = {
            id : original.id,
            name :  original.name,
            status : original.status,
            isGeneric : original.isGeneric,
            rejectionComment: original.rejectionComment,
            rejectionType: original.rejectionType,
            iabCategories: original.iabCategories
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

        handleCategoryChange(data) {
        console.log(data);
        this.setState({
            iabCategories : data
        })
    }

    handleSubmit(event) {
        alert('Submitted JSON: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const data = new FormData(event.target);
    //
    //     fetch('/api/form', {
    //         method: 'POST',
    //         body: data
    //     });
    // }

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Adomain Details</h5>
                            </div>
                            <div className="ibox-content">
                                        <form onSubmit={this.handleSubmit}>
                                            <CategoryView id={this.state.id} iabCategories={this.state.iabCategories} onChange = {this.handleCategoryChange} ></CategoryView>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label "> <strong>Adomain Name : </strong></label>
                                                <input className="form-control col-sm-4 m-b" name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                                                <label className="col-sm-2 col-form-label"> <strong>Status : </strong></label>
                                                    <select  name="status" value = {this.state.status} className="form-control col-sm-4 m-b" onChange={this.handleChange}>
                                                        <option value = 'PENDING'> Pending </option>
                                                        <option value = 'ALLOWED'> Allowed </option>
                                                        <option value = 'REJECTED'> Rejected </option>
                                                    </select>
                                            </div>
                                            {this.state.status == 'REJECTED'? <RejectionView rejectionComment={this.state.rejectionComment} rejectionType={this.state.rejectionType} onChange={this.handleChange}></RejectionView>: null}
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label"  > <strong>Is Generic : </strong> <input value={this.state.isGeneric} type="checkbox" name="isGeneric" class="i-checks" onChange={this.handleChange}/></label>
                                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>Save</strong></button>
                                            </div>
                                        </form>
                                </div>
                            </div>




                            <form >
                                <label htmlFor="username">Enter username</label>
                                <input id="username" name="username" type="text"/>

                                <label htmlFor="email">Enter your email</label>
                                <input id="email" name="email" type="email"/>

                                <label htmlFor="birthdate">Enter your birth date</label>
                                <input id="birthdate" name="birthdate" type="text"/>

                                <button>Send data!</button>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default AdomainForm;