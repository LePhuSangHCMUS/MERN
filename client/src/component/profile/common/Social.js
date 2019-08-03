import React, { Component } from 'react'

export default class Social extends Component {
    render() {
        console.log('fafaf', this.props.social)
        if (this.props.social) {
            return (

                <div>
                    <p>
                        {this.props.social.twitter ? (
                            <a class="text-white p-2" href={this.props.social.twitter} target='_blank'>
                                <i class="fab fa-twitter fa-2x"></i>
                            </a>
                        ) : ''}
                        {this.props.social.youtube ? (
                            <a class="text-white p-2" href={this.props.social.youtube} target='_blank'>
                                <i class="fab fa-youtube fa-2x"></i>
                            </a>
                        ) : ''}
                        {this.props.social.facebook ? (
                            <a class="text-white p-2" href={this.props.social.facebook} target='_blank'>
                                <i class="fab fa-facebook fa-2x"></i>
                            </a>
                        ) : ''}
                        {this.props.social.linkedin ? (
                            <a class="text-white p-2" href={this.props.social.linkedin} target='_blank'>
                                <i class="fab fa-linkedin fa-2x"></i>
                            </a>
                        ) : ''}
                        {this.props.social.instagram ? (
                            <a class="text-white p-2" href={this.props.social.instagram} target='_blank'>
                                <i class="fab fa-instagram fa-2x"></i>
                            </a>
                        ) : ''}
                    </p>
                </div>
            )
        }
        else {
            return null;
        }

    }
}

