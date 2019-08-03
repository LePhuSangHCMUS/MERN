import React, { Component } from 'react'
import { connect } from 'react-redux';
//Giai ma token thanh du lieu user
import jwt_decode from 'jwt-decode';
import TextFieldGroupInput from '../common/TextFieldGroupInput'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
var classNames = require('classnames');





class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    //Dung Arrow funtion thi se khong bi loi this.setState read undifned 
    //Neu khong dung thi pahai dung bind(this) 
    onChange(event) {
        //Dung Handling Multiple Inputs -- Khong can khai bao state hoac la phai trung ten
        this.setState({ [event.target.name]: event.target.value });
    }
    onSubmit(event) {
        //Ngan hanh dong submit de khong phai load lai trang
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log('propsLogin',this.props)
        this.props.loginAction(user, this.props.history);
    }
    //Ham nay chay khi Props Thay Doi va this.props la props truoc do
    componentWillReceiveProps(nextProps, nextState) {
        //Khi click lan dau thien thi props duoc thay doi 
        //This.props se la props truoc do nen can phair lay next props neu muon lay cai gia tri thay doi do
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors }, () => {
            })
        }
        //Neu prop tiep theo khong pahi loi thi no da thanh cong redriect sang /daashboard
        else{
            this.history.push('/dashboard')
        }

        //Truong hop da dang nhap roi va load lai trang thi /login để không muôn hiện ra trang login
        // nữa thi phải chuyển hướng sang Dashbord bang cach kiem tra store
        //Nen nho load lai thi store se rong nen phải set lại store o ben APP bằng cách kiem ta token trong localstore

    }


    render() {
        //Truong hop nhan vao login lai lan nua nhung da dang nhap roi thi chuyen huong sang dashboard
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        return (
            < div >
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your DevConnector account</p>
                                <form action="dashboard" onSubmit={this.onSubmit}>
                                    {/* ======================Email===================*/}


                                    <TextFieldGroupInput
                                        type="email"
                                        errors={this.state.errors.email}
                                        placeholder="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                    />
                                    {/* ======================Password===================*/}
                                    <TextFieldGroupInput
                                        type="password"
                                        errors={this.state.errors.password}
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}
                                    />

                                    <input
                                        type="submit"
                                        className="btn btn-info btn-block mt-4"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}
//Lay Loi
const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.loginReducer.errors,
        isAuthenticated: state.loginReducer.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginAction: (user, history) => {

            
            axios({
                method: 'post',
                url: '/api/users/login',
                data: user //Xe gan vao trong req.body=user
            })
                .then(response => {
                    //Neu dang ki thanh cong thi tra ve token
                    const token = response.data.token;
                    //Luu token vao trong localStorege===Neu luu trong Session thi close tab se bi mat
                    localStorage.setItem('jwt_token', token)
                    //Chi lay duoc nhung gi ma server quy dinh trong passport
                    const userDetail = jwt_decode(token)
                    //Luu token vao store
                    dispatch({ type: 'LOGIN_SUCCESS', user: userDetail })


                    //Dang nhap thanh cong load Dashbord ===> Dung vong doi ung dung react de load


                    //Xet cap quyen cho axios duoc gui kem theo authozation
                    setAuthToken(localStorage.jwt_token);
                    //Chuyen huong sang trang profile (/)
                    // history.push('/dashboard')


                })
                .catch(err => {
                    //Neu co loi thi dung ham dispatch de gan action.type va action.value luu vao store
                    const errors = err.response.data;//data=doi tuong errors {}
                    //action tra ve loi

                    //Co the dung nhieu dispath de mot lan dung nhieu action
                    dispatch({ type: 'GET_ERRORS_LOGIN', errors: errors })
                    // dispatch({ type: 'XXX', XXX: XXX }) ==> THEM VAO CUNG DUOC
                })
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default connect(mapStateToProps, mapDispatchToProps)(Login);