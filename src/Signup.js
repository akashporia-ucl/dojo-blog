import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = () => {

    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [alertState,setAlterState] = useState(false);
    const history = useHistory();
    const url = 'http://localhost:5000/users/';

    const submitHandler = (e) => {
        e.preventDefault();
        
        const user = {
            username:username,
            email:email,
            password:password1
        };
        console.log(user);

        console.log(JSON.stringify(user));

        fetch(url,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then( ()=>{
            setAlterState(true);
            console.log("User logged in");
        }).finally(()=>{
            setTimeout(() => {
                history.push('/');
            }, 5000);
        });
    }

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={submitHandler}>
                <label>
                    Username
                </label>
                <input 
                    type="text"
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                />
                <label>
                    Email
                </label>
                <input 
                    type="email"
                    required
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <label>
                    Password
                </label>
                <input 
                    type="password"
                    required
                    value={password1}
                    onChange={(e)=>setPassword1(e.target.value)}
                />
                <label>
                    Retype password
                </label>
                <input 
                    type="password"
                    required
                    value={password2}
                    onChange={(e)=>setPassword2(e.target.value)}
                />
                {(!password2 || !password1 || password1!==password2) && <button disabled>Submit</button>}
                {password1===password2 && password1 && <button>Submit</button>}
            </form>
            {alertState && <div className="alert">
                <h3>Welcome {username}</h3>
            </div>}
        </div>
    );
}

export default Signup;