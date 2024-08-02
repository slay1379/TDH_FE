import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({onLogin}){
    const  navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin();
        navigate('/todos');
    };

    return(
        <div className='app-container'>
            <h2 className='todo-title'>TO DO 집안일</h2>
            <div className='login-container'>
                <div className='login-box'>
                    <h1 className='login-title'>USER LOGIN</h1>
                    <p className='login-subtitle'>집안일 트래커</p>
                    <div className='login-avatar'></div>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input type='text' placeholder='username' className='login-input'/>
                        <input type='password' placeholder='password' className='login-input'/>
                        <div className='login-remember-me'>
                            <input type='checkbox' id='remember-me'/>
                            <label htmlFor='remember-me'>remember me</label>
                        </div>
                        <button type='submit' className='login-button'>LOGIN</button>
                    </form>
                    <a href='/forgot-password' className='login-forgot-password'>Forgot password?</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;