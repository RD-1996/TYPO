import React from 'react'
import '../styles/registerPage.css'

const RegisterPage = () => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='register-form'>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder='username' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage