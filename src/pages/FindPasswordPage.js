import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FindPasswordPage.css';

function FindPasswordPage(){
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //비밀번호 재설정 로직 추가
        alert(`비밀번호 재설정 링크가 ${email}로 전송되었습니다.`);
        navigate('/login')
    };

    return (
        <div className='password-reset-page'>
            <div className='app-container'>
                <h2 className='password-todo-title'>TO DO 집안일</h2>
                <div className='password-container'>
                    <div className='password-box'>
                        <h1 className='password-reset-title'>FIND PASSWORD</h1>
                        <p className='password-reset-subtitle'>이메일을 입력하세요</p>
                        <form onSubmit={handleSubmit} className='password-reset-form'>
                            <input
                                type='email'
                                placeholder='email'
                                value={email}
                                onChange={handleEmailChange}
                                className='password-reset-input'
                                required
                            />
                            <button type='submit' className='password-reset-button'>
                                비밀번호 재설정
                            </button>
                        </form>
                        <div className='password-reset-footer'>
                            <a href='/login' className='back-to-login'>로그인 페이지로 돌아가기</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default FindPasswordPage;
