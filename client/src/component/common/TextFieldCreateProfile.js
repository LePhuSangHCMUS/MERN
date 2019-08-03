import React, { Component } from 'react'
var classNames = require('classnames');

export default class TextFieldCreateProfile extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <input
                        type={this.props.type}
                        className={classNames("form-control form-control-lg", { 'is-invalid': this.props.errors })}// => 'is-invalid neu errors.name co'
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        defaultValue={this.props.value}
                    />
                    <small className="form-text text-muted">{this.props.hintInput}</small>

                    {/*Hien thi loi .Vi khong dung if ne phai dung tona tu so sanh thay the */}
                    {this.props.errors && (<span className='invalid-feedback'>{this.props.errors}</span>)}
                </div>
            </div>
        )
    }
}

