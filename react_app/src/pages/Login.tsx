import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import heroBg from '@/assets/images/hero.jpg';

const Login = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        isLoading: false,
        invalidText: '',
        passWordType: 'password'
    });

    const togglePasswordType = () => {
        setForm(prev => ({ ...prev, passWordType: prev.passWordType === 'password' ? 'text' : 'password' }));
    };

    const showErrorMsg = (text: string) => {
        const div = `<div class='alert alert-danger border-0 p-2 m-0 rounded-0 text-center'>${text} </div>`;
        setForm(prev => ({ ...prev, invalidText: div }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setForm(prev => ({ ...prev, invalidText: '' }));

        if (!form.email || !form.password) {
            showErrorMsg('Please complete fields!');
            return;
        }

        if (!useFxn.isValidEmail(form.email)) {
             showErrorMsg('Please enter a valid email');
             return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));
        try {
            const resp = await api.userLogin({ email: form.email, password: form.password });
            login(resp.data.token);
            navigate('/account/dashboard');
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                showErrorMsg('Email or Password is incorrect!');
            }
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <div className="bg-theme" style={{ 
            position: 'relative', 
            backgroundImage: `url(${heroBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center center',
            zIndex: 0
        }}>
            {/* Overlay */}
            <div style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.566)',
                zIndex: -1
            }}></div>

            <div className="container">
                <div className="everything-center overflow-hidden">
                    <div className="col-12 col-md-4 animate__animated animate__slideInDown animate__faster">
                        <div className="card">
                            <h5 className="card-header text-center border-0 p-3 fw-bold">
                                ACCOUNT LOGIN
                            </h5>
                            <div className="card-body">
                                <form onSubmit={submitForm} className="row g-3">
                                    <div dangerouslySetInnerHTML={{ __html: form.invalidText }}></div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input 
                                                value={form.email} 
                                                onChange={e => setForm({...form, email: e.target.value})}
                                                id="email1" type="text"
                                                className="form-control form-control-float" placeholder="" />
                                            <label htmlFor="email1">Email:</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="position-relative">
                                            <div className="form-floating">
                                                <input 
                                                    value={form.password}
                                                    onChange={e => setForm({...form, password: e.target.value})}
                                                    id="pass1" type={form.passWordType}
                                                    className="form-control form-control-float" placeholder="" />
                                                <label htmlFor="pass1">Password:</label>
                                                <i onClick={togglePasswordType} className={`bi toggle-icon ${form.passWordType === 'password' ? 'bi-eye-slash' : 'bi-eye'}`}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        marginRight: '15px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#6c757d'
                                                    }}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        {!form.isLoading ? (
                                            <button type="submit" className="btn btn-theme w-100 btn-lg">
                                                Login <i className="bi bi-chevron-right"></i>
                                            </button>
                                        ) : (
                                            <button className="btn btn-theme w-100 btn-lg" type="button" disabled>
                                                <span className="spinner-border spinner-border-s" role="status" aria-hidden="true"></span>
                                            </button>
                                        )}
                                    </div>
                                    <h6 className="text-center mt-4 hover-tiltX">
                                        <Link className="theme-color" to="/register" replace>I dont have an account yet </Link>
                                    </h6>
                                </form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Link className="text-white" to="/">Home page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
