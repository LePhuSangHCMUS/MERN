import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
//Dung withRouter de co history
import { withRouter } from 'react-router'
import setAuthToken from '../../../utils/setAuthToken'

import axios from 'axios'

class Experience extends Component {

    render() {
        if (this.props.experience.length > 0) {
            return (
                <div>

                    <div>
                        <div>
                            <h4 className="mb-2">Experience Credentials</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Title</th>
                                        <th>Years</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.experience.map(experience => {
                                        return (
                                            <tr>
                                                <td>{experience.company}</td>
                                                <td>{experience.title}</td>
                                                <td>
                                                    {moment(experience.from).format('DD-MM-YYYY')} - {experience.to ? experience.to : 'Now'}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger"
                                                        onClick={this.props.onDeleteExperience.bind(this)}
                                                        value={experience._id}//Lay id de xoa

                                                    >
                                                        Delete
                                                        </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )
        }
        else {
            return null;
        }

    }
}

//Lay Loi
const mapStateToProps = (state, ownProps) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        onDeleteExperience(event) {
            setAuthToken(localStorage.jwt_token);

            axios({
                method: 'delete',
                url: `/api/profile/experience/${event.target.value}`
            }).then(response => {
                // response tra ve profile moi nhat nen ta truyen payload la profile moi may
                dispatch({ type: 'GET_PROFILE_SUCCESS', profile: response.data.newProfile })

            })
                .catch(err => {
                    //Profile chua co thi gan   

                })
        }

    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Experience));


