import React, { Component } from 'react';

class Results extends Component {

    render() {
        return (
            this.props.reviews.map(row =>
                <div key={row.id}>
                    {row.email} {row.review}
                </div>
            )
        )
    }
}

export default Results;
