import React, { Component } from 'react';

class Form extends Component {
    //create refs

    feedRef = React.createRef();



    createPost = (e) => {
        e.preventDefault();
        this.props.createPost(this.feedRef.current.value);

    }


    render() {
        return (
            <form onSubmit={this.createPost} className="col-md-10">

                <div className="form-group">
                    <span><input type="text" ref={this.feedRef} className="form-control" placeholder="Add a new Feed.." /></span>
                    <span><button type="submit" className="button">Create</button></span>
                </div>

            </form>
        );
    }
}

export default Form;