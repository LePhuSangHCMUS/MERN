import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextFieldCreateProfile from '../../common/TextFieldCreateProfile'
import SelectListGroup from '../../common/SelectListGroup'
import TextSocial from '../../common/TextSocial'
import { connect } from 'react-redux';
//Ghi nho phai co cai nay thi thoan bi loi history undefined
import { withRouter } from 'react-router'
import setAuthToken from '../../../utils/setAuthToken'


import axios from 'axios'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: this.props.profile.handle,
            status: '',
            company: '',
            website: '',
            location: '',
            skills: (this.props.profile.skills?this.props.profile.skills.join(','):''),
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            youtube: '',
            instagram: '',
            errors: {},
            displaySocialInput: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.displaySocialInput = this.displaySocialInput.bind(this)
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value }, () => {
            console.log(this.state)
        })
    }
    displaySocialInput(event) {
        this.setState({ displaySocialInput: !this.state.displaySocialInput },()=>{
            console.log(this.state)
        })
    }
    onSubmit(event) {
        event.preventDefault();
        const newProfile = {
            handle: this.state.handle,
            status: this.state.status,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin
        }
        this.props.EditProfileAction(newProfile, this.props.history);
    }
    //Do store tong thay doi state nhung khong render lai chi lam thay doi props cua component hien tai con state thi khong
    //  ta phai xet state o han compomentwillRecievedPropf

    componentWillReceiveProps(nextProps) {
        //this.props.errors la ham mapStateTo Prop tao ra
        this.setState({ errors: nextProps.errors })

    }
    componentWillMount(){
        this.props.getCurrentProfile()

        
    }


    render() {
        return (
            <div>
                <div className="create-profile">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to="/profile" className="btn btn-light">Go Back</Link>
                                <h1 className="display-4 text-center">Create Your Profile</h1>
                                <p className="lead text-center">Let's get some information to make your profile stand out</p>
                                <form action="/" onSubmit={this.onSubmit}>


                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="* Profile handle"
                                        name="handle"
                                        hintInput="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                                        errors={this.state.errors.handle}
                                        onChange={this.onChange}
                                        value={this.props.profile.handle}

                                    />
                                    <SelectListGroup
                                        value={this.props.profile.status}

                                        errors={this.state.errors.status}
                                        onChange={this.onChange}

                                    />

                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="Company"
                                        name="company"
                                        hintInputInput="Could be your own company or one you work for"
                                        onChange={this.onChange}
                                        errors={this.state.errors.company}
                                        value={this.props.profile.company}


                                    />
                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="Website"
                                        name="website"
                                        hintInput="Could be your own or a company website"
                                        onChange={this.onChange}
                                        errors={this.state.errors.website}
                                        value={this.props.profile.website}

                                        

                                    />
                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="Location"
                                        name="location"
                                        hintInput="City &amp; state suggested (eg. Boston, MA)"
                                        onChange={this.onChange}
                                        errors={this.state.errors.location}
                                        value={this.props.profile.location}


                                    />
                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="Skills"
                                        name="skills"
                                        hintInput="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                        onChange={this.onChange}
                                        errors={this.state.errors.skills}
                                        value={this.props.profile.skills}


                                    />
                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="Github Username"
                                        name="githubusername"
                                        hintInput="If you want your latest repos and a Github link, include your username"
                                        errors={this.state.errors.githubusername}
                                        value={this.props.profile.githubusername}

                                        onChange={this.onChange}
                                    />
                                    <TextFieldCreateProfile
                                        type='text'
                                        placeholder="A short bio of yourself"
                                        name="bio"
                                        hintInput="Tell us a little about yourself"
                                        onChange={this.onChange}
                                        errors={this.state.errors.bio}
                                        value={this.props.profile.bio}

                                    />

                                    <div className="mb-3"><button type="button" className="btn btn-light" onClick={this.displaySocialInput}> Add Social Network Links</button></div>
                                    {/*Aanr hiện diplaySocialInput */}

                                    {this.state.displaySocialInput && (
                                        <div>
                                            <TextSocial
                                                type='text'
                                                placeholder="Twitter Profile URL"
                                                name="twitter"
                                                onChange={this.onChange}
                                                errors={this.state.errors.twitter}
                                                iconSocical="fab fa-twitter"
                                                value={this.props.profile.social?this.props.profile.social.twitter:''}

                                            />
                                            <TextSocial
                                                type='text'
                                                placeholder="Facebook Profile URL"
                                                name="facebook"
                                                onChange={this.onChange}
                                                errors={this.state.errors.facebook}
                                                iconSocical="fab fa-facebook"
                                                value={this.props.profile.social?this.props.profile.social.facebook:''}

                                            />
                                            <TextSocial
                                                type='text'
                                                placeholder="Linkedin Profile URL"
                                                name="linkedin"
                                                onChange={this.onChange}
                                                errors={this.state.errors.linkedin}
                                                iconSocical="fab fa-linkedin"
                                                value={this.props.profile.social?this.props.profile.social.linkedin:''}

                                            />
                                            <TextSocial
                                                type='text'
                                                placeholder="Youtube Profile URL"
                                                name="youtube"
                                                onChange={this.onChange}
                                                errors={this.state.errors.youtube}
                                                iconSocical="fab fa-youtube"
                                                value={this.props.profile.social?this.props.profile.social.youtube:''}

                                            />
                                            <TextSocial
                                                type='text'
                                                placeholder="Instagram Profile URL"
                                                name="instagram"
                                                onChange={this.onChange}
                                                errors={this.state.errors.instagram}
                                                iconSocical="fab fa-instagram"
                                                value={this.props.profile.social?this.props.profile.social.instagram:''}

                                            />
                                        </div>
                                    )}



                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

//Lay errors
const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.profileReducer.errors,
        profile:state.profileReducer.profile,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getCurrentProfile: () => {
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
        EditProfileAction: (newProfile, history) => {
            //Da set quyen ở app va khi login thanh cong 
            axios({
                method: 'post',
                url: '/api/profile/update',
                data: newProfile//Xe gan vao trong req.body=newUser
            }).then(response => {
                console.log(response);

                //Neu khog thi tra ve profile roi luu vao store
                dispatch({ type: 'UPDATE_PROFILE_SUCCESS', profile: response.data.profile })
                history.push('/profile')

            })
                .catch(err => {
                    //Neu co loi thi dung ham dispatch de gan action.type va action.value luu vao store
                    const errors = err.response.data;
                    dispatch({ type: 'GET_ERRORS_UPDATE_PROFILE', errors: errors })
                    console.log(errors)
                    //action tra ve loi


                });
        }
    }
}


//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile)) 