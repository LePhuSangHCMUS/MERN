import React, { Component } from 'react'
import TextField from '../../common/TextFieldGroupInput'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import setAuthToken from '../../../utils/setAuthToken'

//Giai ma token thanh du lieu user
import axios from 'axios'
class AddEducation extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            description: '',
            current: false,
            disabled: true//Neu clik vao current thi cho hien ra

        }
        this.onCheck = this.onCheck.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value }, () => {
            console.log(this.state)
        })
    }
    onCheck() {
        this.setState({ current: !this.state.current, disabled: !this.state.disabled })
    }
    onSubmit(event) {
        event.preventDefault()
        const newEducation = {


            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description

        }
        this.props.AddExperience(newEducation, this.props.history)
    }
    componentWillReceiveProps(nextProps) {
        //this.props.errors la ham mapStateTo Prop tao ra
        this.setState({ errors: nextProps.errors })

    }
    render() {
        return (
            <div class="add-education">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 m-auto">
                            <Link to="/dashboard" class="btn btn-light">
                                Go Back
          </Link>
                            <h1 class="display-4 text-center">Add Your Education</h1>
                            <p class="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <form action="" onSubmit={this.onSubmit}>

                                <TextField
                                    type='text'
                                    placeholder="* School Or Bootcamp"
                                    name="school"
                                    onChange={this.onChange}
                                    errors={this.state.errors.school}
                                />
                                <TextField
                                    type='text'
                                    placeholder="* Degree Or Certificate"
                                    name="degree"
                                    onChange={this.onChange}
                                    errors={this.state.errors.degree}
                                />
                                <TextField
                                    type='text'
                                    placeholder="Field Of Study"
                                    name="fieldofstudy"
                                    onChange={this.onChange}
                                    errors={this.state.errors.fieldofstudy}
                                />


                                <h6>From Date</h6>
                                <TextField
                                    type='date'
                                    name="from"
                                    onChange={this.onChange}
                                    errors={this.state.errors.from}
                                />
                                <h6>To Date</h6>
                                <TextField
                                    type='date'
                                    name="to"
                                    onChange={this.onChange}
                                    errors={this.state.errors.to}
                                    disabled={this.state.disabled}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="current"
                                        defaultValue
                                        id="current"
                                        checked={this.state.checked}
                                        onChange={this.onCheck}
                                    />
                                    <label className="form-check-label" htmlFor="current">
                                        Current School
                                             </label>
                                </div>
                                <div class="form-group">
                                    <textarea onChange={this.onChange}
                                        class="form-control form-control-lg" placeholder="Program Description" name="description"></textarea>
                                    <small class="form-text text-muted">Tell us about your experience and what you learned</small>
                                </div>
                                <input type="submit" class="btn btn-info btn-block mt-4" />
                            </form>
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
        errors: state.profileReducer.errors,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        AddExperience: (newEducation, history) => {
            setAuthToken(localStorage.jwt_token);

            //Da set quyen ở app va khi login thanh cong 
            axios({
                method: 'post',
                url: '/api/profile/education',
                data: newEducation
            }).then(response => {
                //Get profile success

                const newEdu = response.data.newEdu;
                dispatch({ type: 'ADD_EDUCATION_SUCCESS', newEdu: newEdu })
                history.push('/dashboard')

            })
                .catch(err => {
                    console.log(err.response.data)

                    dispatch({ type: 'ADD_EDUCATION_ERRORS', errors: err.response.data })


                });
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEducation));


