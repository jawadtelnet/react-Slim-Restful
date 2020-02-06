import React, { Component } from 'react';
import Post from './Post';
import './Post.css';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import Form from './Form';
import Swal from 'sweetalert2';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userData: [],
            redirect: false
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem('userData')) {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            this.setState({ userData: userData.userData })
        } else {
            this.setState({ redirect: true });
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        const { user_id, token } = this.state.userData;
        const data = {
            user_id: user_id,
            token: token
        };

        PostData('feed', data).then((result) => {

            if (result.feedData) {
                this.setState({
                    posts: result.feedData
                })

            }
        });

    }

    deletePost = (id) => {
        const { user_id, token } = this.state.userData;
        var data = {
            feed_id: id,
            user_id: user_id,
            token: token
        };
        PostData('feedDelete', data).then((result) => {

            if (result.success) {
                const posts = this.state.posts;
                let newPosts = posts.filter(post => (
                    post.feed_id !== id
                ));
                this.setState({
                    posts: newPosts
                });

            }
        });
    }


    showPosts = () => {

        //this.getPost();
        const posts = this.state.posts;
        if (!posts) return null;
        return (

            <div className="post_list_item">
                <React.Fragment>
                    {Object.keys(posts).map(post => (
                        <Post
                            key={post}
                            username={this.state.userData.username}
                            info={this.state.posts[post]}
                            deletePost={this.deletePost}
                        />
                    ))}
                </React.Fragment></div>
        )
    }

    createPost = (feed) => {

        const { user_id, token } = this.state.userData;
        var data = {
            feed: feed,
            user_id: user_id,
            token: token
        };
        PostData('feedUpdate', data).then((res) => {

            if (res.feedData) {
                Swal.fire(
                    'Post Create',
                    'It is created correctly.',
                    'success'
                )


                const newPost = res.feedData;

                this.setState(prevState => ({
                    posts: [newPost, ...prevState.posts]
                }))
            }

        });
    }

    state = {}

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div className="row" id="Body">
                <div className="medium-12 columns">

                    <Form
                        createPost={this.createPost}
                    />
                    <legend className="text-center">Feed List</legend>


                    {this.showPosts()}

                </div>
            </div>
        );
    }
}

export default Posts;