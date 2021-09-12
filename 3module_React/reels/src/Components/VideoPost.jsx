import {
    Card,
    Button,
    Typography,
    TextField,
    Avatar,
    Container,
} from "@material-ui/core";
import React, { useState, useEffect } from 'react'
import { firebaseDB } from '../config/firebase';

export default function VideoPost(props) {
    const [user, setUser] = useState(null);
    const [commentList, setCommentList] = useState([]);

    useEffect(async () => {
        let postObj = props.postObj;
        let uid = postObj.uid;
        // users collection m => docs jiski uid={uid} h => jo post h vo user h
        let doc = await firebaseDB.collection('users').doc(uid).get();
        let user = doc.data();
        let commentList = postObj.comments;

        let updatedCommentList = []
        for (let i = 0; i < commentList.length; ++i) {
            let commentObj = commentList[i];
            let doc = await firebaseDB.collection('users').doc(commentObj.uid).get();
            let commentUserPic = doc.data().profileImageUrl;
            updatedCommentList.push({ profilePic: commentUserPic, comment: commentObj.comment });
        }
        setUser(user);
        setCommentList(updatedCommentList);
    }, [props]);

    return (
        <Container>
            <Card>
                <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
                <Typography variant="span">{user ? user.username : ""}</Typography>
                <div className="video-container">
                    <Video src={props.postObj.videoLink}></Video>
                </div>
                <Typography variant="p">Comments</Typography>
                <TextField variant="outlined" label="Add a comment.." size="small"></TextField>
                <Button variant="contained">Post</Button>

                {commentList.map(commentObj => {
                    // comment, uid
                    return (<>
                        <Avatar src={commentObj.profilePic} />
                        <Typography variant="p">{commentObj.comment}</Typography>
                    </>);
                })}
            </Card>
        </Container>
    )
}

function Video(props) {
    return (
        <video
            style={{
                height: "80vh",
                margin: "5rem",
                border: "1px solid black",
            }}
            muted={true}
            loop={true}
            controls
        >
            <source src={props.src} type="video/mp4"></source>
        </video>
    );
}