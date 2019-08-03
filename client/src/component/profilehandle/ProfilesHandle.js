import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
// import Education from '../dashboard/education/Education'
// import Experience from '../dashboard/experience/Experience'
import Social from '../profile/common/Social'
import Spinner from '../dashboard/spinner/Spinner'
import Education from '../profile/common/Education'
import Experience from '../profile/common/Experience'
import Github from  '../profile/common/Github'

import Skill from '../common/Skill'
//Dung withRouter de co history
import { withRouter } from 'react-router'
import setAuthToken from '../../.../../utils/setAuthToken'
import axios from 'axios'

class Profile extends Component {


    componentWillMount() {
        //Khi moi load vao thi ham nay chay lam thay doi state tren store lam prop thay doi nen goi ham
        //componentWillReceiveProps ==> state cua component thay doi nen render lai 

        //Do axios la ham bat dong bo nen ham reander se chay truoc nen chung ta tao ra spinner de loa nhin cho dep hown


        const handle=this.props.history.location.pathname.split('/').pop();
        this.props.getCurrentProfile(this.props.history,handle);
         console.log(this.props.history,handle)

    }

    render() {
        if (!this.props.loading) {
            return (<Spinner/>)
        }
        if (this.props.profile.handle!==this.props.history.location.pathname.split('/').pop()) {
            return (<Spinner />)
        }
        else {
            return (

                <div className="profile">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-6">
                                        <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                                    </div>
                                    <div className="col-6">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-body bg-info text-white mb-3">
                                            <div className="row">
                                                <div className="col-4 col-md-3 m-auto">
                                                    <img className="rounded-circle" src={this.props.profile.userId.avatar} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="display-4 text-center">{this.props.profile.userId.name}</h1>
                                                {this.props.profile.company ? (<p className="lead text-center">{this.props.profile.company}</p>) : ''}
                                                {this.props.profile.location ? (<p >{this.props.profile.location}</p>) : ''}
                                                <p>
                                                    <Social social={this.props.profile.social} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Profile About */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-body bg-light mb-3">
                                            <h3 className="text-center text-info">{this.props.user.name} Bio</h3>
                                            {this.props.profile.bio ? (<p className="lead">{this.props.profile.bio}  </p>) : ''}
                                            <hr />

                                            {/*Skill */}
                                            <h3 className="text-center text-info">Skills</h3>
                                            <Skill skills={this.props.profile.skills} />
                                        </div>
                                    </div>
                                </div>
                                {/*Profile Creds */}
                                <div class="row">
                                    <div class="col-md-6">
                                        <h3 class="text-center text-info">Education</h3>

                                        <Education education={this.props.profile.education} />
                                    </div>

                                    <div class="col-md-6">
                                        <h3 class="text-center text-info">Experience</h3>

                                        <Experience experience={this.props.profile.experience} />

                                    </div>
                                </div>

   {/*-- Profile Github */}
   <Github githubusername={this.props.profile.githubusername}  />
                            </div>
                         
                        </div>
                    </div>
                </div>

            )
        }


    }
}
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
        getCurrentProfile: (history,handle) => {

            //Da set quyen ở app va khi login thanh cong
            axios({
                method: 'get',
                url: `/api/profile/handle/${handle}`,
            }).then(response => {
                //Get profile success
                const profile = response.data.profile;
                dispatch({ type: 'GET_PROFILE_SUCCESS', profile: profile })

            })
                .catch(err => {
                    //Profile chua co thi gan   
                    if (err.response.data.noprofile) {
                        dispatch({ type: 'NO_PROFILE' });
                        history.push('/dashboard')

                    }
                });
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));