import react, { useRef } from 'react';
import './RegisterUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUser = (props) => {

    const newUserForm = useRef();
    const navigate = useNavigate();

    const registerHandler = () => {
        const formData = newUserForm.current;
        const data = {
            username: formData['username'].value,
            fname: formData['fname'].value,
            lname: formData['lname'].value,
            email: formData['email'].value,
            password: formData['password'].value,
            rePassword: formData['rePassword'].value
        };
        console.log(data);
        if(formData['role'].value === 'seller'){
            axios.post('http://localhost:8080/auth/register-seller', data)
            .then(res => {
                console.log('Success: ', res);
                navigate('/login');
            })
            .catch(err => {
                console.log('Error: ', err);
            });
        }
        else{
            axios.post('http://localhost:8080/auth/register-buyer', data)
            .then(res => {
                console.log('Success: ', res);
                navigate('/login');
            })
            .catch(err => {
                console.log('Error: ', err);
            });
        }
    }

    return (
        <div className="register">
            <div>
                <h2>Registration Page</h2>
            </div>
            <div>
                <form ref={newUserForm}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" label={'username'} name={'username'} />
                    </div>
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" label={'fname'} name={'fname'} />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" label={'lname'} name={'lname'} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" label={'email'} name={'email'} />
                    </div>
                    <div>
                        <label>Role</label>
                        <select label={'role'} name={'role'}>
                            <option value="">Select a role</option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" label={'password'} name={'password'} />
                    </div>
                    <div>
                        <label htmlFor="rePassword">Reenter Password</label>
                        <input type="password" label={'rePassword'} name={'rePassword'} />
                    </div>
                </form>

                <button className="btn" onClick={registerHandler}>Register</button>
            </div>
        </div>
    );
}

export default RegisterUser;