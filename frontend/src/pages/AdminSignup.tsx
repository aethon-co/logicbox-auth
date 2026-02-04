import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupAdmin } from '../api/admin';
import toast from 'react-hot-toast';
import logo from '../assets/lb_logo_4_dark_background.svg';

export default function AdminSignup() {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
    });

    const mutation = useMutation({
        mutationFn: signupAdmin,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Admin account created successfully!");
            navigate("/home");
        },
        onError: (error: any) => {
            toast.error(error.message || "Signup failed");
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'name') setNameError('');
        if (e.target.name === 'username') setUsernameError('');
        if (e.target.name === 'password') setPasswordError('');
    };

    const handleSubmit = () => {
        let isValid = true;

        if (formData.name.length < 3) {
            setNameError('Name must be at least 3 characters long');
            isValid = false;
        }

        if (formData.username.length < 3) {
            setUsernameError('Username must be at least 3 characters long');
            isValid = false;
        }

        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        }

        if (!isValid) return;

        mutation.mutate(formData);
    };

    const styles = {
        wrapper: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f5f9', // Slate-100
            padding: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        card: {
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid #cbd5e1', // Slate-300
            boxShadow: '0 25px 50px -12px rgba(30, 41, 59, 0.15)' // Slate shadow
        },
        title: {
            color: '#0f172a', // Slate-900
            fontSize: '1.875rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '8px'
        },
        subtitle: {
            color: '#64748b', // Slate-500
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '0.95rem'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px'
        },
        input: {
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1', // Slate-300
            borderRadius: '12px',
            padding: '14px 16px',
            color: '#1e293b',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.2s'
        },
        buttonPrimary: {
            width: '100%',
            backgroundColor: '#0f172a', // Slate-900
            color: 'white',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'all 0.2s'
        },
        footerText: {
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.9rem',
            marginTop: '20px'
        },
        link: {
            color: '#0f172a', // Slate-900
            cursor: 'pointer',
            fontWeight: '600',
            marginLeft: '5px',
            transition: 'color 0.2s'
        }
    };

    return (
        <div style={styles.wrapper as any}>
            <div style={styles.card as any}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <a href="https://www.logicbox.ac/"><img src={logo} alt="LogicBox Logo" style={{ height: '40px' }} /></a>
                </div>
                <h1 style={styles.title as any}>Admin Registration</h1>
                <p style={styles.subtitle as any}>Create an admin account to manage the platform</p>

                <div style={styles.inputGroup as any}>
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: nameError ? '#ef4444' : '#cbd5e1' } as any}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            onFocus={(e) => !nameError && (e.currentTarget.style.borderColor = '#0f172a')}
                            onBlur={(e) => !nameError && (e.currentTarget.style.borderColor = '#cbd5e1')}
                        />
                        {nameError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{nameError}</span>}
                    </div>

                    <div>
                        <input
                            style={{ ...styles.input, borderColor: usernameError ? '#ef4444' : '#cbd5e1' } as any}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            onFocus={(e) => !usernameError && (e.currentTarget.style.borderColor = '#0f172a')}
                            onBlur={(e) => !usernameError && (e.currentTarget.style.borderColor = '#cbd5e1')}
                        />
                        {usernameError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{usernameError}</span>}
                    </div>

                    <div>
                        <input
                            style={{ ...styles.input, borderColor: passwordError ? '#ef4444' : '#cbd5e1' } as any}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Create Password"
                            onFocus={(e) => !passwordError && (e.currentTarget.style.borderColor = '#0f172a')}
                            onBlur={(e) => !passwordError && (e.currentTarget.style.borderColor = '#cbd5e1')}
                        />
                        {passwordError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{passwordError}</span>}
                    </div>
                </div>

                <button
                    style={{ ...styles.buttonPrimary, opacity: mutation.isPending ? 0.7 : 1 } as any}
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0f172a')}
                >
                    {mutation.isPending ? "Registering..." : "Create Account"}
                </button>

                <div style={styles.footerText as any}>
                    Already have an account?
                    <span
                        style={styles.link as any}
                        onClick={() => navigate("/admin/login")}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#334155')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#0f172a')}
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    );
}
