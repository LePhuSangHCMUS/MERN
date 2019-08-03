import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
//Dung withRouter de co history
import { withRouter } from 'react-router'
import setAuthToken from '../../../utils/setAuthToken'

//Giai ma token thanh du lieu user
import axios from 'axios'
class Education extends Component {



    render() {
        if (this.props.education.length > 0) {
            return (
                <div>
                    <div>
                        <h4 className="mb-2">Education Credentials</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>School</th>
                                    <th>Degree</th>
                                    <th>Years</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.education.map(education => {
                                    return (
                                        <tr>
                                            <td>{education.school}</td>
                                            <td>{education.degree}</td>
                                            <td>
                                                {moment(education.from).format('DD-MM-YYYY')} - {education.to ? moment(education.to).format('DD-MM-YYYY') : 'Now'}
                                            </td>
                                            <td>
                                                <button

                                                    className="btn btn-danger"
                                                    value={education._id}//Lay id de xoa
                                                    onClick={this.props.onDeleteEducation.bind(this)}

                                                >

                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
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

        onDeleteEducation(event) {
            setAuthToken(localStorage.jwt_token);

            axios({
                method: 'delete',
                url: `/api/profile/education/${event.target.value}`
            }).then(response => {
               // response tra ve profile moi nhat nen ta truyen payload la profile moi may
                dispatch({type:'GET_PROFILE_SUCCESS',profile:response.data.newProfile})

            })
                .catch(err => {
                    //Profile chua co thi gan   

                })
        }

    }
}
//Neu khong co mapStateToProps phai them null vao truoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Education));
