import React, { Component } from 'react'

export default class Experience extends Component {
    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.props.experiences.map(experience => {
                        return (
                            <li className="list-group-item">
                                <h4>{experience}</h4>
                                <p>Oct 2011 - Current</p>
                                <p>
                                    <strong>Position:</strong> Senior Developer
                                </p>
                                <p>
                                    <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus dicta enim
                                  excepturi laborum voluptatem nam provident quisquam facere. Quae?</p>
                            </li>
                        )
                    })}


                </ul>
            </div>
        )
    }
}
