import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken, addUserName } from "./store/userSlice";

const Login = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token);

    console.log(token);
    localStorage.setItem('token', token)

    if (isAuth) {
        navigate("/");
    }

    const userRef = React.useRef(null);
    const passRef = React.useRef(null);
    const apiKey = useSelector((state) => state.user.apiKey);
    const dispatch = useDispatch();

    async function onSubmitHandler(event) {
        try {
            event.preventDefault();
            const username = userRef.current.value;
            const password = passRef.current.value;

            const response = await axios.post("https://todolist-api-nq54.onrender.com/users/login", {
                username,
                password,
                apiKey,
            });

            const Token = response.data.data.token;

            if (response.data.status === "success") {
                dispatch(addToken(Token));
                dispatch(addUserName(username));
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input ref={userRef} name="username" type="text" placeholder="username" />
                <input ref={passRef} name="password" type="password" placeholder="password" />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
