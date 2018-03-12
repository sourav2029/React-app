import React, {Component} from 'react';

class TableFilter extends Component {
    render(){
       return (
           <div className="ibox-content m-b-sm border-bottom">
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="control-label" htmlFor="adomain_name">Adomian</label>
                        <input type="text" value="" placeholder="Domian Name" className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="control-label" htmlFor="status">Status</label>
                        <select name="status" id="status" className="form-control">
                            <option value="1" defaultValue>PENDING</option>
                            <option value="0">ALLOWED</option>
                            <option value="2">REJECTED</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TableFilter;