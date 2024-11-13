import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreateComment = (props) => {

    const [commentContent,setCommentContent] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');

    const {id} = useParams();
    const url = 'http://localhost:5000/blogs/'+id; 
    let blog = props.blogContent;
    const newUUID = uuidv4();
    const history = useHistory();
    
    const handleAddComment = (e) => {
        e.preventDefault();

        const newComment = {
            "commentContent": commentContent,
            "commentAuthor": commentAuthor,
            "commentId": newUUID
        };

        if(blog.comments){
            blog.comments.push(newComment);
        } else {
            blog.comments = [newComment];
        }
        

        fetch(url, {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then( () =>{
            console.log("Comment added");
            history.push(`/blogs/${id}`);
            setCommentAuthor("");
            setCommentContent("");
        });
    }

    return (
        <div>
            <form onSubmit={handleAddComment}>
                <label>Comment content:</label>
                <input 
                    type="text"
                    required
                    value={commentContent}
                    onChange={(e) => {setCommentContent(e.target.value)}}
                />
                <label>Comment author:</label>
                <input 
                    type="text" 
                    required
                    value={commentAuthor}
                    onChange={(e) => {setCommentAuthor(e.target.value)}}
                />
                <button>Add comment</button>
            </form>
        </div>
        
    );
}

export default CreateComment;