import React, {Component} from 'react';
import AdomainRow from './AdomainRow'
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import CubeGridSpinner   from '../component/Spinner'
import ErrorMessage from '../component/alerts/ErrorMessage'
import TableFilter from '../component/layouts/TableFilter'
import ReactTable from "react-table"
import AdomainForm from './AdomainForm'
import 'react-table/react-table.css'
const adomains = gql`
  {
     adomains{
        id
        adomain
        name
        status
        iabCategories
        isGeneric
        rejectionType
        rejectionComment
     }
  }
`
class AdomianTable extends Component {
    constructor(props) {
        super(props);
        // this.data = props.data;
        // console.log(this.data);
        this.state={
            adomains : this.props.data.adomains
        }
    }

    handleClick() {
        alert("handle it later");
    }
    handleSave=()=>{
        const index = this.row.index;

        this.setState({
            adomain : this.state
        })
        alert("test");
    }

    render() {
        const {data,data:{adomains}} = this.props;
        if (data.error) {
           return (
                <div className="panel-body" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                    <div className="panel-group no-margins">
                        <ErrorMessage error="Unable to fetch. Please try again later."/>
                    </div>
                </div>
           )
        }
        else if (data.loading) {
            return (
                <div className="panel-body" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                    <div className="panel-group no-margins">
                        <CubeGridSpinner height="200"/>
                    </div>
                </div>
            )
        } else {

            // CONSTANT  TEST  DATA WHEN WE DON'T HAVE THE DATA FROM THE BACKEND
            // const adomains = [{
            //     adomain: "Reebok1.com",
            //     name: "Reebok",
            //     iabCategories: ["IAB1", "IAB2", "IAB5"],
            //     status: "PENDING",
            //     rejectionType: "Offensive Content",
            //     rejectionComment: "The content is offensive",
            //     isGeneric: false,
            //     modifiedBy: "Sourav.Prem"
            // },
            // {
            //     adomain: "Reebok2.com",
            //     name: "Reebok",
            //     iabCategories: ["IAB1", "IAB2", "IAB5"],
            //     status: "PENDING",
            //     rejectionType: "Offensive Content",
            //     rejectionComment: "The content is offensive",
            //     isGeneric: false,
            //     modifiedBy: "Sourav.Prem"
            // },
            // {
            //     adomain: "Reebok3.com",
            //     name: "Reebok",
            //     iabCategories: ["IAB1", "IAB2", "IAB5"],
            //     status: "PENDING",
            //     rejectionType: "Offensive Content",
            //     rejectionComment: "The content is offensive",
            //     isGeneric: false,
            //     modifiedBy: "Sourav.Prem"
            // }];

            //FOR REACT TABLE TO WORK
            const columns = [{
                Header : 'Adomian',
                accessor : 'adomain'
                }, {
                Header : 'Name',
                accessor : 'name'
                }, {
                Header : 'IABCategories',
                accessor : 'iabCategories',
                Cell : row => <div>{row.value.join(", ")}</div>
                }, {
                Header : 'Status',
                accessor : 'status',
                filterMethod: (filter, row) => {
                    if (filter.value === "ALL") {
                        return true;
                    }
                    if (filter.value == row.status) {
                        return true;
                    }
                    return false;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value ={filter ? filter.value : "ALL"}
                    >
                        <option value = 'ALL'> All </option>
                        <option value = 'PENDING'> Pending </option>
                        <option value = 'ALLOWED'> Allowed </option>
                        <option value = 'REJECTED'> Rejected </option>
                    </select>
            }];

            return (
                <div>
                    <ReactTable
                    showPaginationTop
                    filterable
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                        onClick: (e, handleOriginal) => {
                            console.log('A Td Element was clicked!')
                            console.log('it produced this event:', e)
                            console.log('It was in this column:', column)
                            console.log('It was in this row:', rowInfo)
                            console.log('It was in this table instance:', instance)

                            // IMPORTANT! React-Table uses onClick internally to trigger
                            // events like expanding SubComponents and pivots.
                            // By default a custom 'onClick' handler will override this functionality.
                            // If you want to fire the original onClick handler, call the
                            // 'handleOriginal' function.
                            if (handleOriginal) {
                                handleOriginal()
                            }
                            return <AdomainForm handleSave={this.handleSave} row={rowInfo}></AdomainForm>
                        }
                    }}}
                    data={adomains}
                    columns={columns}
                    defaultPageSize={10}
                    className="footable table table-stripped toggle-arrow-tiny tablet breakpoint footable-loaded"
                    SubComponent =  { row =>{
                        return (
                            <AdomainForm handleSave={this.handleSave} row={row} ></AdomainForm>
                        );
                    }}
                    />
                </div>
            );




            // const rows = [];
            // (data.adomains).map(adomain => rows.push(<AdomainRow adomain={adomain} key={adomain.name}/>));
            //
            // return (
            //     <div className="wrapper wrapper-content animated fadeInRight adomains">
            //         <TableFilter></TableFilter>
            //         <div className="panel-body" style={{paddingTop: '0px', paddingBottom: '0px'}}>
            //         <div className="panel-group no-margins" id="canned-reports-accordion">
            //             <div className="table-responsive clients-list ">
            //                 <table className="table table-striped table-hover">
            //                     <thead>
            //                     <tr>
            //                         <th>Adomain</th>
            //                         <th>Name</th>
            //                         <th>IabCategories</th>
            //                         <th>Status</th>
            //                         <th>Action</th>
            //                     </tr>
            //                     </thead>
            //                     <tbody>{rows}</tbody>
            //                 </table>
            //             </div>
            //         </div>
            //     </div>
            //     </div>
            // )
        }
    }
}
export default graphql(adomains)(AdomianTable);
