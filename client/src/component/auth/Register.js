import React, { Component } from 'react'
import { connect } from 'react-redux';
//Component hoa khai bao mot lan xai mai mai
import TextFieldGroupInput from '../common/TextFieldGroupInput'

import axios from 'axios'
var classNames = require('classnames');



class Register extends Component {
    //Khoi tao state de quan ly du lieu dang ky va errors

    //State noi tai cua componen nay thoi con Store la luu toan bo ung dung
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }

        //GOI ACTION (vi dispath hay state muon goi ben store deu phai qua prop nen this.props)
        console.log(this.props)
        //Trong this.props luon co history de chi router hien hanh
        this.props.registerAction(newUser, this.props.history)
        ///========================================

    }

    //Ham nay chay khi Props Thay Doi va this.props la props truoc do
    componentWillReceiveProps(nextProps, nextState) {
        //Khi click lan dau thien thi props duoc thay doi 
        //This.props se la props truoc do nen can phair lay next props neu muon lay cai gia tri thay doi do
        console.log("ThayDoi")
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }


    render() {
        return (
            <div>
                {/* ==========================REGISTER==============*/}
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form action="/" onSubmit={this.onSubmit} noValidate>


                                    {/* ======================Name===================*/}

                                    <TextFieldGroupInput
                                        type="text"
                                        errors={this.state.errors.email}
                                        placeholder="Name"
                                        name="name"
                                        onChange={this.onChange}
                                    />
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
                                        errors={this.state.errors.email}
                                        placeholder="Password"
                                        name="Password"
                                        onChange={this.onChange}
                                    />
                                    {/* ======================Email===================*/}
                                    <TextFieldGroupInput
                                        type="password"
                                        errors={this.state.errors.email}
                                        placeholder="Comfirm assword"
                                        name="password2"
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
                {/* ==========================END==============*/}


            </div>
        )
    }
}
//Lay errors
const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.registerReducer.errors
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        registerAction: (newUser, history) => {
            axios({
                method: 'post',
                url: '/api/users/register',
                data: newUser//Xe gan vao trong req.body=newUser
            }).then(response => {
                console.log(response);
                //Ben API response.data={'createUser:true,user{....thong tin}}
                //Neu khong loi thi luu user vao store
                const user = response.data.user;
                //action tra ve user da dang ki

                ///XOA het token da ton tai tranh truong hop quay ve trang login thi con token nen vao luon dashboard
                localStorage.removeItem('jwt_token')
                dispatch({ type: 'REGISTED_USER', user: user, errors: {} })
                //Xoa token trong storage nhung phai Thay doi store de isAthenticated=False neu no ton tai de quay ve trang login
                dispatch({ type: 'LOGOUT_USER', user: user, errors: {} })
                //========================================================
                //Chuyen huong router phai dung history
                history.push('/login')
            })
                .catch(err => {
                    //Neu co loi thi dung ham dispatch de gan action.type va action.value luu vao store
                    const errors = err.response.data;
                    //action tra ve loi

                    //Co the dung nhieu dispath de mot lan dung nhieu action
                    dispatch({ type: 'GET_ERRORS_REGISTER', errors: errors })
                    // dispatch({ type: 'XXX', XXX: XXX }) ==> THEM VAO CUNG DUOC

                });
        }
    }
}


//Neu khong co mapStateToProps phai them null vao truoc
export default connect(mapStateToProps, mapDispatchToProps)(Register);