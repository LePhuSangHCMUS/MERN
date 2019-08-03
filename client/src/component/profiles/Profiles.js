import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import setAuthToken from '../../.../../utils/setAuthToken'
import axios from 'axios'
import Spinner from '../dashboard/spinner/Spinner';
class Profiles extends Component {


    componentDidMount() {
        this.props.getAllProfile(this.props.history);
    }
    render() {
        const profiles = this.props.profiles;
        if (profiles.length !== 0) {
            return (
                profiles.map(profile => {
                    return (<div>
                        <div class="card card-body bg-light mb-3">
                            <div class="row">
                                <div class="col-2">
                                    <img class="rounded-circle" src={profile.userId.avatar} alt="" />
                                </div>
                                <div class="col-lg-6 col-md-4 col-8">
                                    <h3>{profile.handle}</h3>
                                    <p>{profile.status} at {profile.company}</p>
                                    <p>{profile.location}</p>
                                    <Link to={`/profile/${profile.handle}`} class="btn btn-info">View Profile</Link>
                                </div>
                                <div class="col-md-4 d-none d-lg-block">
                                    <h4>Skill Set</h4>
                                    <ul class="list-group">
                                        {profile.skills.map(skill => {
                                            return (<li class="list-group-item">
                                                <i class="fa fa-check pr-1"></i>{skill}</li>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)

                })

            )
        }
        return (<Spinner />);

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
        getAllProfile: (history) => {

            //Da set quyen ở app va khi login thanh cong
            axios({
                method: 'get',
                url: '/api/profile/all',
            }).then(response => {
                //Get profile success
                const profiles = response.data.profiles;
                console.log(profiles)
                dispatch({ type: 'GET_PROFILES_SUCCESS', profiles: profiles })

            })
                .catch(err => {
                    //Profile chua co thi gan   
                    if (err.response.data.noprofile) {
                        dispatch({ type: 'NO_PROFILE' });
                        this.history.push('/dashboard')

                    }
                });
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profiles));