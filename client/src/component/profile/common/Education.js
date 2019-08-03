import React, { Component } from 'react'
import moment from 'moment'

export default class Education extends Component {
    render() {
        if (this.props.education) {
            return (
                <div>
                    <ul class="list-group">
                        {
                            this.props.education.map(education => {
                                return (<li class="list-group-item">
                                    <h4>{education.school}</h4>
                                    <p>  {moment(education.from).format('DD-MM-YYYY')} - {education.to ? moment(education.to).format('DD-MM-YYYY') : 'Now'}
                                    </p>
                                    <p> <strong>Degree: </strong>{education.degree}</p>
                                    <p> <strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                                    <p>   <strong>Description:</strong> {education.description} </p>
                                </li>)
                            })
                        }

                    </ul>
                </div>
            )
        }
        else {
            return null;
        }

    }
}

