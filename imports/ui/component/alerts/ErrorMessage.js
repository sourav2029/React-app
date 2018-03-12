import React, { Component } from 'react';

export default class ErrorMessage extends Component {
    render() {
        if (this.props.error) {
            return (
                <div className="alert alert-danger fade in">
                    {this.props.error}
                </div>
            );
        }
        return null;
    }
}