import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

//Giai ma token thanh du lieu user
import jwt_decode from 'jwt-decode';
import axios from 'axios'
var classNames = require('classnames');

class Dashboard extends Component {
    render() {
        //Neu chua dang nhap thi chuyen huong sang login
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        }
        return (
            <div>
                {/* Dashboard */}
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                <p className="lead text-muted">Welcome </p>
                                {/* Dashboard Actions */}
                                <div className="btn-group mb-4" role="group">
                                    <Link to="edit-profile" className="btn btn-light">
                                        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile</Link>
                                    <a href="add-experience" className="btn btn-light">
                                        <i className="fab fa-black-tie text-info mr-1" />
                                        Add Experience</a>
                                    <a href="add-education.html" className="btn btn-light">
                                        <i className="fas fa-graduation-cap text-info mr-1" />
                                        Add Education</a>
                                </div>
                                {/* Experience */}
                                <div>
                                    <h4 className="mb-2">Experience Credentials</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Company</th>
                                                <th>Title</th>
                                                <th>Years</th>
                                                <th>
                                                </th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tech Guy Web Solutions</td>
                                                <td>Senior Developer</td>
                                                <td>
                                                    02-03-2009 - 01-02-2014
                </td>
                                                <td>
                                                    <button className="btn btn-danger">
                                                        Delete
                  </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Traversy Media</td>
                                                <td>Instructor &amp; Developer</td>
                                                <td>
                                                    02-03-2015 - Now
                </td>
                                                <td>
                                                    <button className="btn btn-danger">
                                                        Delete
                  </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Education */}
                                <div>
                                    <h4 className="mb-2">Education Credentials</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>School</th>
                                                <th>Degree</th>
                                                <th>Years</th>
                                                <th>
                                                </th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Northern Essex</td>
                                                <td>Associates</td>
                                                <td>
                                                    02-03-2007 - 01-02-2009
                </td>
                                                <td>
                                                    <button className="btn btn-danger">
                                                        Delete
                  </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ marginBottom: '60px' }}>
                                    <button className="btn btn-danger">
                                        Delete My Account
          </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
//Lay Loi
const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        user: state.loginReducer.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);