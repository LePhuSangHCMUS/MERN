import React, { Component } from 'react'
import moment from 'moment'

export default class Experience extends Component {
    render() {
        if (this.props.experience) {
            return (
                <div>
                    <ul class="list-group">
    
                        {
                            this.props.experience.map(experience => {
                                return (
                                    <li class="list-group-item">
                                        <h4>{experience.company}</h4>
                                        <p>{moment(experience.from).format('DD-MM-YYYY')} - {experience.to ? moment(experience.to).format('DD-MM-YYYY') : 'Now'}</p>
                                        <p> <strong>Position:</strong> {experience.title}  </p>
                                        <p><strong>Description:</strong> {experience.description}</p>
                                    </li>)
                            })
                        }
    
    
    
                    </ul>
                </div>
            )
        }
        else{
            return null;
        }

    }
}
