import React, { Component } from 'react'
var classNames = require('classnames');

export default class SelectListGroup extends Component {
    render() {
        console.log(this.props.errors)

        return (
            <div>
                <div className="form-group">
                    <select onChange={this.props.onChange} className={classNames("form-control form-control-lg",{'is-invalid':this.props.errors}) } name="status">
                        <option value={''}>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text text-muted">Give us an idea of where you are at in your career</small>
                       {/*Hien thi loi .Vi khong dung if ne phai dung tona tu so sanh thay the */}
                       {this.props.errors && (<span className='invalid-feedback'>{this.props.errors.status}</span>)}
                </div>
            </div>
        )
    }
}
