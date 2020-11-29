import React, { Component } from 'react';

class NewReview extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <input
                        type="text"
                        name="newReview"
                        value={this.props.review}
                        onChange={this.props.handleChange}
                        placeholder="New Review"
                        autoFocus
                        autoComplete='off'
                    />
                    <button type="submit">Add Review</button>
                </form>
            </div>
        )
    }
}

export default NewReview;