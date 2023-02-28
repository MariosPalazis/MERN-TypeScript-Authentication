import React,{useState} from 'react';
import { Navigate} from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from '../Wrappers/useUserContext';


interface Credentials {
    username:string,
    password:string
}

const Login: React.FC = () => {
    const { setUser } = useGlobalContext()

    const [credentials, setCredentials] = useState<Credentials>({
        username:"",
        password:""
    });
    const [loader, setLoader] = useState<boolean>(false);


    console.log(sessionStorage.getItem("token"))
    if(sessionStorage.getItem("token")){
        return <Navigate to="/dashboard" replace />;
    }
    const setFields = (event: React.ChangeEvent<HTMLInputElement> ) =>{
        setCredentials({...credentials,[ event.target.name]: event.target.value})
    }
    function loginUser(credentials: Credentials) {
        axios.post('http://localhost:9000' + "/users/login" ,  credentials).then(res => {
            // do good things
            console.log(1);
            setLoader(false);
            console.log(res);
            setUser(res.data);
            sessionStorage.setItem('token', JSON.stringify(res.data))
        })
        .catch(err => {
            console.log(err.response);
            //setServerResponse("Wrong Username/Password");
            setLoader(false);
        });
        
    }

    const login = (e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault();
        console.log(credentials);
        if(credentials.username !== "" && credentials.password !== ""){
            setLoader(true)
            loginUser(credentials);
        }else{
            //server response
        }
    }


    return (
        <div className="loginPage">
            <div className="mainUserPanel">
                <div className="credentials">
                    <span className="credFields"><input name="username" placeholder="Username" type="text" onChange={setFields} /></span>
                    <span className="credFields"><input name="password" placeholder="Password" type="password" className="credFields" onChange={setFields} /></span>

                    {
                        loader ? <h1>Loading</h1> : <div className="LoginButton" onClick={login}>Login</div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Login;