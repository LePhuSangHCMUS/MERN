import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
//Giai ma token thanh du lieu user
import jwt_decode from 'jwt-decode';
import axios from 'axios'
var classNames = require('classnames');
class Navigation extends Component {

    logoutUser = () => {
        //Xoa token roi chuyen huong sang trang login
        localStorage.removeItem('jwt_token');
        //Deo hieu sao this.props khong co history de push /login hoac / vao
        // this.props.history.push('/login')

        // ===>Danh phai dispath sua lai tren store

        this.props.logoutUserStore();
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <Link to="/" className="navbar-brand" >DevConnector</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/profiles" className="nav-link" > Developers</Link>
                                </li>
                            </ul>
                            {/*===============================LOGIN_REGISTER=======================================*/}
                            {/*Nếu chua xac thuc thi render ra login logout  */}
                            {!this.props.isAuthenticated && (
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link" >Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" >Login</Link>
                                    </li>
                                </ul>)
                            }
                            {/*===============================LOG OUT=======================================*/}
                            {/*Nếu đã xac thuc thi render lout va avatar */}
                            {this.props.isAuthenticated && (
                                <ul className="navbar-nav ml-auto align-items-center">
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link" >
                                            <img title={this.props.user.name}style={{ width: 2.5 + 'em' }} className='rounded-circle' src={this.props.user.avatar} alt='avatar'></img>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to onClick={this.logoutUser} className="nav-link" >Logout</Link>
                                    </li>
                                </ul>)
                            }

                        </div>
                    </div>
                </nav>
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
        logoutUserStore: () => {
            dispatch({type:'LOGOUT_USER'})
        }
    }
}

//Neu khong co mapStateToProps phai them null vao truoc
export default connect(mapStateToProps,mapDispatchToProps)(Navigation);