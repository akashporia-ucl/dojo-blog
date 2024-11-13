import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        const blog = {
            'title': title,
            'body': body,
            'author': author
        };

        setIsAdding(true);
        
        fetch('http://localhost:5000/blogs',{
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then( () => {
            console.log("Blog added");
            setIsAdding(false);
            history.push('/');
        });
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={submitHandler}>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <input
                    type="text"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Written by:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isAdding && <button>Add blog</button>}
                {isAdding && <button disabled>Add blog</button>}
            </form>
        </div>
    );
}

export default Create;