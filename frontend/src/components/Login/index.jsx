import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth';
      const { data: res } = await axios.post(url, data);
      console.log('Response from server:', res);

      localStorage.setItem('token', res.data);
      localStorage.setItem(
        'role',
        res.message === 'Logged in as admin' ? 'admin' : 'user'
      );
      console.log('Role stored in localStorage:', localStorage.getItem('role')); // Log the role
      // Add a delay of 20ms before navigating
      setTimeout(() => {
        // Redirect after setting local storage values
        if (localStorage.getItem('role') === 'admin') {
          console.log('Navigating to admin dashboard...');
          navigate('/admindashboard');
        } else {
          console.log('Navigating to user dashboard...');
          navigate('/userdashboard');
        }
      }, 20);

      if (localStorage.getItem('role') === 'admin') {
        console.log('Navigating to admin dashboard...');
        navigate('/admindashboard');
      } else {
        console.log('Navigating to user dashboard...');
        navigate('/userdashboard');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_box}>
              <div className={styles.blue_box}>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  value={data.email}
                  required
                  className={styles.input}
                />
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                <div className={styles.space}></div>
                <div
                  className={styles.navigate_text}
                  onClick={() => {
                    window.location.href = '/signup';
                  }}
                >
                  You haven’t an account? Register
                </div>
                <button type='submit' className={styles.green_btn}>
                  Sign In
                </button>
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
          </form>
        </div>
        <div className={styles.right}>
          <div className={styles.login_txt}>
            <h1>Sign In </h1>
          </div>
          <div className={styles.image}>
            <img src={require('../image/login_image.png')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
