import { useState } from "react";
//import bcrypt from 'bcryptjs';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const url = 'http://localhost:5000/users/';

    const submitHandler = (e) =>{
        e.preventDefault();

        const user = {
            username:userName,
            password:password
        };

        console.log(JSON.stringify(user));

        
    };

    return (
        <div className="login">
            <h2>
            Login
            </h2>
            <form onSubmit={submitHandler}>
                <label>Username:</label>
                <input 
                    type="text"
                    required
                    value={userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
                />
                <label>Password:</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button>Login</button>
            </form>
            <Link to="/Signup">New user? Click here to sign-up</Link>
        </div>
    );
}

export default Login;