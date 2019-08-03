import React, { Component } from 'react'
import TextField from '../../common/TextFieldGroupInput'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import setAuthToken from '../../../utils/setAuthToken'

//Giai ma token thanh du lieu user
import axios from 'axios'
class AddExperience extends Component {


    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            title: '',
            company: '',
            location: '',
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
        const newExperience = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description

        }
        this.props.AddExperience(newExperience, this.props.history)
    }
    componentWillReceiveProps(nextProps) {
        //this.props.errors la ham mapStateTo Prop tao ra
        this.setState({ errors: nextProps.errors })

    }
    render() {
        return (
            <div>
                <div className="section add-experience">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to="/dashboard" className="btn btn-light">
                                    Go Back
        </Link>
                                <h1 className="display-4 text-center">Add Your Experience</h1>
                                <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                                <form action="" onSubmit={this.onSubmit}>


                                    <TextField
                                        type='text'
                                        placeholder="* Job Title"
                                        name="title"
                                        onChange={this.onChange}
                                        errors={this.state.errors.title}
                                        required
                                    />
                                    <TextField
                                        type='text'
                                        placeholder="* Company"
                                        name="company" required
                                        onChange={this.onChange}
                                        errors={this.state.errors.company}
                                    />
                                    <TextField
                                        type='text'
                                        placeholder="Location"
                                        name="location"
                                        onChange={this.onChange}
                                        errors={this.state.errors.location}
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
                                            Current Job
                                             </label>
                                    </div>
                                    <div className="form-group">
                                        <textarea onChange={this.onChange} className="form-control form-control-lg" placeholder="Job Description" name="description" defaultValue={""} />
                                        <small className="form-text text-muted">Some of your responsabilities, etc</small>
                                    </div>
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

//Lay Loi
const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.profileReducer.errors,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        AddExperience: (newExperience, history) => {
            setAuthToken(localStorage.jwt_token);

            //Da set quyen ở app va khi login thanh cong 
            axios({
                method: 'post',
                url: '/api/profile/experience',
                data:newExperience
            }).then(response => {
                //Get profile success
                console.log("XXXX2222")

                const newExp= response.data.newExp;
                dispatch({ type: 'ADD_EXPERIENCE_SUCCESS', newExp: newExp })
                history.push('/dashboard')

            })
                .catch(err => {
                    console.log(err.response.data)
    
                    dispatch({ type: 'ADD_EXPERIENCE_ERRORS', errors: err.response.data})
                

                });
        }
    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperience));
