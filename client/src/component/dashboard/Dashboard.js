import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Education from './education/Education'
import Experience from './experience/Experience'
import Spinner from './spinner/Spinner'
//Dung withRouter de co history
import { withRouter } from 'react-router'
import setAuthToken from '../../utils/setAuthToken'

//Giai ma token thanh du lieu user
import axios from 'axios'

class Dashboard extends Component {

    // componentDidMount() {

    // }
    //Truong hop khi tao profile moi thi can ham nay
    // componentWillReceiveProps(nextProps) {

    //     console.log("hien len di anh em")
    //     this.setState({ profile: nextProps.profile })
    // }
    //Truong hop load lai thi minh se chay ham nay de lay data va thay doi state 
    //==> quay lai ham componentWillReceiveProps roi render ra
    componentWillMount() {
        //Khi moi load vao thi ham nay chay lam thay doi state tren store lam prop thay doi nen goi ham
        //componentWillReceiveProps ==> state cua component thay doi nen render lai 

        //Do axios la ham bat dong bo nen ham reander se chay truoc nen chung ta tao ra spinner de loa nhin cho dep hown

        this.props.getCurrentProfile();

    }


   

render() {
    //Neu chua dang nhap thi chuyen huong sang login
    //Khong can dung cach nay vi khong component hoa dung PrivateRoute
    // if (!this.props.isAuthenticated) {
    //     this.props.history.push('/login')
    // }
    const profile = this.props.profile;
    const loading = this.props.loading;
    const user = this.props.user;
    ///=======================================
    let dashboardContent = () => {
        // Ban dau khi moi dang nhap thanh cong thi profile trong store van la null nen sau khi render no va hien ra chua cos profileuser do co profile roi
        //Khi chua co profile thi tao profile
        //Mac dinh ban du khi loi tu store ra thi profile cung la null 
        // khi render va didMount xong thi ta doc profile lai cua user roi moi su ly sau

        if (!Object.keys(profile).length && loading === true) {
            return (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                        Create Profile
                    </Link>
                </div>


            )
        }
        if (!loading) {
            return (
                <Spinner />
            )
        }
        //Khi co roi thi hien ra profile thoi
        else {
            return (
                <div>
                    <p className="lead text-muted ">Welcome

                        <Link to={"/profile/" + profile.handle} className='ml-2' >
                            {user.name}
                        </Link>
                    </p>
                    {                /*Dashboard Action  */}

                    <div className="btn-group mb-4" role="group">
                        <Link to="/edit-profile" className="btn btn-light">
                            <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                        <Link to="/add-experience" className="btn btn-light">
                            <i className="fab fa-black-tie text-info mr-1"></i>
                            Add Experience</Link>
                        <Link to="/add-education" className="btn btn-light">
                            <i className="fas fa-graduation-cap text-info mr-1"></i>
                            Add Education</Link>
                    </div>

                    {                /* Education */}
                    <Education education={profile.education} />

                    {                /*Experience */}
                    <Experience experience={profile.experience} />


                    <div >
                        <button onClick={this.props.deleteProfile} className="btn btn-danger">
                            Delete My Account
                      </button>
                    </div>

                </div>
            )
        }
    }

    //===============================================

    return (
        <div>
            {/* Dashboard */}
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent()}
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
        user: state.loginReducer.user,
        profile: state.profileReducer.profile,
        profiles: state.profileReducer.profiles,
        loading: state.profileReducer.loading
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getCurrentProfile: () => {
            console.log(localStorage.jwt_token)
            setAuthToken(localStorage.jwt_token);

            //Da set quyen ở app va khi login thanh cong 
            axios({
                method: 'get',
                url: '/api/profile',
            }).then(response => {
                //Get profile success
                const profile = response.data.profile;
                dispatch({ type: 'GET_PROFILE_SUCCESS', profile: profile })

            })
                .catch(err => {
                    //Profile chua co thi gan   
                    if (err.response.data.noprofile) {
                        dispatch({ type: 'NO_PROFILE' })

                    }
                });
        },
        deleteProfile:()=> {
            setAuthToken(localStorage.jwt_token);
    
            axios({
                method: 'delete',
                url: '/api/profile',
            }).then(response => {
                dispatch({ type: 'DELETE_PROFILE'})

    
            })
                .catch(err => {
                    //Profile chua co thi gan   
    
                })
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));