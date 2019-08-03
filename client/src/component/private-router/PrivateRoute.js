import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//Muc dich cung la render ra Route Dashboard thoi
//Viet dang function ne khong co tro this
//Dung literal object gan commponet la component ben kia ,...props phan con lai cua props
const PrivateRoute = ({ component: Component, ...props }) => {

    //Component la cai DashBoard
    // console.log(props);
    return (



        <Route {...props}
            render={() => (
                props.isAuthenticated ?
                    <Component />
                    : <Redirect to="/login" />
            )} />
    );
};
//Lay Loi
const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
    }
}

export default connect(mapStateToProps)(PrivateRoute);
