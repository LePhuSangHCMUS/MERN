import React, { Component } from 'react'
var classNames = require('classnames');

export default class TextSocial extends Component {
    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={this.props.iconSocial} />
                        </span>
                    </div>
                    <input
                        type={this.props.type}
                        className={classNames("form-control form-control-lg", { 'is-invalid': this.props.errors })}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        onChange={this.props.onChange}
                    />
                    {/*Hien thi loi .Vi khong dung if ne phai dung tona tu so sanh thay the */}
                    {this.props.errors && (<span className='invalid-feedback'>{this.props.errors}</span>)}
                </div>
            </div>
        )
    }
}
