import React, { Component } from 'react'

export default class Github extends Component {
    render() {
        console.log(this.props.githubusername)
        if(this.props.githubusername){
        
            return (
                <div class="row">

                <div className="col-md-12" ref="myRef">
                    <hr />
                    <h3 className="mb-4">Latest Github Repos</h3>
                    <div className="card card-body mb-2">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>
                                    <a className="text-info" href={ this.props.githubusername} target="_blank"> Repository One </a>
                                </h4>
                                <p>Repository description</p>
                            </div>
                            <div className="col-md-6">
                                <span className="badge badge-info mr-1"> Stars: 44</span>
                                <span className="badge badge-secondary mr-1">Watchers: 21</span>
                                <span className="badge badge-success">Forks: 12</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return null;
        }

    }
}
