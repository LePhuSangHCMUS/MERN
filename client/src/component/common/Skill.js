import React, { Component } from 'react'

export default class Skill extends Component {
    render() {
        return (
            <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {this.props.skills.map(skill => {
                        return (
                            <div className="p-3">
                                <i className="fa fa-check" /> {skill}
                            </div>)
                    })}


                </div>
            </div>
        )
    }
}
