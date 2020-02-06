import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Post.css';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Post extends Component {


    confirmDeletion = (e) => {
        e.preventDefault();
        const { feed_id } = this.props.info;

        Swal.fire({
            title: 'Delete this one?',
            text: "This action can not be canceled!",

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'No, Cancel'
        }).then((result) => {
            if (result.value) {

                this.props.deletePost(feed_id);
                Swal.fire(
                    'Press OK to back',
                    'The post has been deleted',
                    'success'
                )
            }
        })
    }


    render() {
        const { feed, created } = this.props.info;
        const username = this.props.username;

        return (
            <Paper className="post">
                <div className="post_title">
                    <span className='post-preview'>
                        {feed.length > 255 ? `${feed}...` : feed}
                    </span>
                </div>
                <div className="post_body" >
                    <span className="post_datestamp"><b>{moment(created).fromNow()}</b> By </span>
                    <span className='post-preview'>
                        <b>{username}</b>
                    </span>
                    <div className="post_button">
                        <ul className="buttons">
                            <li><b><Link to='' onClick={this.confirmDeletion} className="btn btn-danger">Delete</Link></b></li>
                        </ul>
                    </div>
                </div>
                <Divider light />


            </Paper >
        );
    }
}
export default Post;