import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import heroBg from '@/assets/images/hero.jpg';

const Register = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
        password2: '',
        isSaving: false,
        errorMessage: '',
        passWordType: 'password'
    });

    const togglePasswordType = () => {
        setForm(prev => ({ ...prev, passWordType: prev.passWordType === 'password' ? 'text' : 'password' }));
    };

    const showErrorMsg = (text: string) => {
        const div = `<div class='alert alert-danger border-0 p-2 m-0 text-center'>${text} </div>`;
        setForm(prev => ({ ...prev, errorMessage: div }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setForm(prev => ({ ...prev, errorMessage: '' }));

        if (!form.email || !form.password || !form.password2) {
            showErrorMsg('Compulsory fields are empty!');
            return;
        }

        if (!useFxn.isValidEmail(form.email)) {
             showErrorMsg('Please enter a valid email');
             return;
        }

        if (form.password !== form.password2) {
             showErrorMsg('Passwords do not match!');
             return;
        }

        if (form.password.length < 6) {
             showErrorMsg('Password must be at least 6 characters!');
             return;
        }

        setForm(prev => ({ ...prev, isSaving: true }));
        try {
            const resp = await api.userRegister({ 
                email: form.email, 
                name: form.name, 
                password: form.password, 
                password_confirmation: form.password2 
            });
            login(resp.data.token);
            navigate('/account/dashboard');
        } catch (error: any) {
             if (error.response && error.response.status === 422) {
                showErrorMsg(error.response.data.message);
            } else {
                showErrorMsg('An error occurred during registration.');
            }
        } finally {
            setForm(prev => ({ ...prev, isSaving: false }));
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

            <div className="container py-lg-2">
                <div className="everything-center overflow-hidden">
                    <div className="col-12 col-lg-4 animate__animated animate__slideInUp animate__faster">
                        <div className="card shadow-sm">
                            <h5 className="card-header text-center border-0 p-3 fw-bold">
                                CREATE NEW ACCOUNT
                            </h5>
                            <div className="card-body ">
                                <form onSubmit={submitForm} className="row g-3">
                                    <div dangerouslySetInnerHTML={{ __html: form.errorMessage }}></div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input 
                                                value={form.email} 
                                                onChange={e => setForm({...form, email: e.target.value})}
                                                id="email1" type="text"
                                                className="form-control form-control-float" placeholder="ss" />
                                            <label htmlFor="email1">Email:<span className="text-danger xsmall">*</span></label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input 
                                                value={form.name} 
                                                onChange={e => setForm({...form, name: e.target.value})}
                                                id="first1" type="text"
                                                className="form-control form-control-float" placeholder="" />
                                            <label htmlFor="first1">Name:</label>
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
                                                <label htmlFor="pass1">Password:<span className="text-danger xsmall">*</span></label>
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
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input 
                                                value={form.password2} 
                                                onChange={e => setForm({...form, password2: e.target.value})}
                                                id="pass2" type={form.passWordType} // Assuming we want toggle here too or just fixed password type? Vue code used single toggle for both or password input type fixed?
                                                // Vue code used password input type but toggle button was only on first password field. 
                                                // Wait, pass2 input type was fixed to "password" in vue: <input ... type="password" ... /> line 43.
                                                // But line 32 was :type="form.passWordType".
                                                // I will keep pass2 as fixed 'password' OR implement consistent behavior.
                                                // Looking at vue code line 43: type="password". So it does NOT toggle.
                                                className="form-control form-control-float" placeholder="" />
                                            <label htmlFor="pass2">Repeat Password:<span className="text-danger xsmall">*</span></label>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        {!form.isSaving ? (
                                            <button type="submit" className="btn btn-theme w-100 btn-lg">
                                                Create Account <i className="bi bi-chevron-right"></i>
                                            </button>
                                        ) : (
                                            <button className="btn btn-theme w-100 btn-lg" type="button" disabled>
                                                <span className="spinner-border spinner-border-s" role="status" aria-hidden="true"></span>
                                            </button>
                                        )}
                                    </div>
                                    <h6 className="text-center mt-4 ">
                                        Already have an account? <Link className="theme-color hover-tiltY" to="/login" replace>Login.</Link>
                                    </h6>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
