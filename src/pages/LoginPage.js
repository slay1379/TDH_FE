import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage(){
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/todomain');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="app-container">
                <h2 className="todo-title">TO DO 집안일</h2>
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="login-title">USER LOGIN</h1>
                        <p className="login-subtitle">집안일 트래커</p>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="username" className="login-input"/>
                            <input type="password" placeholder="password" className="login-input"/>
                            <div className="login-signup">
                                <div className="login-remember-me">
                                    <input type="checkbox" id="remember-me"/>
                                    <label htmlFor="remember-me">아이디 저장</label>
                                </div>
                                <button type="button" className="signup-button" onClick={handleSignup}>회원가입</button>
                            </div>
                            <button type="submit" className="login-button">로그인</button>
                        </form>
                        <a href="/forgot-password" className="login-forgot-password">비밀번호를 잊어버리셨나요?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
