import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    const {data:blogs, isPending, error} = useFetch('http://localhost:5000/blogs');

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All posts!"/>} 
        </div>
    );
}

export default Home;
//Props allows to pass data from parent component to child component