import React, {Component} from 'react';

class RejectionView extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            rejectionComment: this.props.rejectionComment,
            rejectionType: this.props.rejectionType
        };
    }

    render() {
        const {onChange} = this.props;
        return (
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label "> <strong>Rejection Reason : </strong></label>
                    <input className="form-control col-sm-4 m-b" name="rejectionType" type="text" value={this.state.rejectionReason} onChange={onChange}/>
                    <label className="col-sm-2 col-form-label"> <strong>Rejection Comment: </strong></label>
                    <input className="form-control col-sm-4 m-b" name="rejectionComment" type="text" value={this.state.rejectionComment} onChange={onChange}/>
                </div>
        )
    }
}

export default RejectionView;
