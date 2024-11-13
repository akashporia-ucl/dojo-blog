import { useParams } from "react-router-dom/";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

const BlogDetail = () => {

    const {id} = useParams();
    const url = 'http://localhost:5000/blogs/'+id; 
    const {data: blog, isPending, error} = useFetch(url);
    const history = useHistory();

    const handleDeleteBlog = () => {
        fetch(url,{
            method: 'DELETE'
        }).then(() =>{
            history.push('/');
        })
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    {blog.comments && <Comments blogContent={blog}/>}
                    <CreateComment blogContent={blog}/>
                    <button onClick={handleDeleteBlog}>Delete blog</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetail;