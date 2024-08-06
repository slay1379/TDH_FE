import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // 회원가입 로직 추가
        navigate('/login');
    };

    return (
        <div className="signup-page">
            <div className="app-container">
                <h2 className="signup-todo-title">TO DO 집안일</h2>
                <div className="signup-container">
                    <div className="signup-box">
                        <h1 className="signup-title">USER SIGNUP</h1>
                        <p className="signup-subtitle">집안일 트래커</p>
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="username" className="signup-input" />
                            <input type="email" placeholder="email" className="signup-input" />
                            <input type="password" placeholder="password" className="signup-input" />
                            <input type="password" placeholder="confirm password" className="signup-input" />
                            <button type="submit" className="signup-submit">회원가입</button>
                        </form>
                        <a href="/login" className="signup-login-link">이미 계정이 있으신가요? 로그인</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
