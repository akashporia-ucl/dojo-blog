import { useParams } from "react-router-dom/";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Comments = (props) => {

    let comments = props.blogContent.comments;
    const {id} = useParams();
    const url = 'http://localhost:5000/blogs/'+id; 
    //console.log("ID: ",id);
    //console.log("URL: ",url);
    let blog = props.blogContent;
    const history = useHistory();

    const handleDeleteComment = (deleteId) => {

        const indexToDelete = comments.findIndex(comment => comment.commentId === deleteId);

        if(indexToDelete!==-1){
            comments.splice(indexToDelete, 1);
        }
        blog.comments = comments;

        fetch(url,{
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then( () =>{
            console.log("Comment deleted");
            history.push(`/blogs/${id}`);
        });
    }

    return (
        <div>
            <h4>Comments</h4>
            {comments.map( (c) => (
                <div key={c.commentId}>
                    <h6>{c.commentTitle}</h6>
                    <div>
                        <p>{c.commentContent}</p>
                        <p> - {c.commentAuthor}</p>
                    </div>
                    <button onClick={() => handleDeleteComment(c.commentId)}>Delete comment</button>
                </div>
            ))}
        </div>
    );
}

export default Comments;