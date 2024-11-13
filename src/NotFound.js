import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>Page you are looking for does not exist.</p>
            <Link to="/">Return to homepage?</Link>
        </div>
    );
}

export default NotFound;