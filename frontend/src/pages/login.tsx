import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginCollege } from '../api/login';

export default function Login() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationFn: loginCollege,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        },
        onError: (error: any) => {
            alert(`Login Failed: ${error.message}`);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') setEmailError('');
    };

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        mutation.mutate(formData);
    };

    const styles = {
        wrapper: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#020617',
            padding: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        card: {
            width: '100%',
            maxWidth: '450px',
            backgroundColor: '#0f172a',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid #1e293b',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        },
        title: {
            color: '#f8fafc',
            fontSize: '1.875rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '8px'
        },
        subtitle: {
            color: '#94a3b8',
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
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '14px 16px',
            color: '#f8fafc',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.2s'
        },
        buttonPrimary: {
            width: '100%',
            backgroundColor: '#6366f1',
            color: 'white',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        footerText: {
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.9rem',
            marginTop: '20px'
        },
        link: {
            color: '#6366f1',
            cursor: 'pointer',
            fontWeight: '600',
            marginLeft: '5px',
            transition: 'color 0.2s'
        }
    };

    return (
        <div style={styles.wrapper as any}>
            <div style={styles.card as any}>
                <h1 style={styles.title as any}>Welcome Back</h1>
                <p style={styles.subtitle as any}>Enter your credentials to access your account</p>

                <div style={styles.inputGroup as any}>
                    <div>
                        <input
                            style={{
                                ...styles.input,
                                borderColor: emailError ? '#ef4444' : '#334155'
                            } as any}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            onFocus={(e) => !emailError && (e.currentTarget.style.borderColor = '#6366f1')}
                            onBlur={(e) => !emailError && (e.currentTarget.style.borderColor = '#334155')}
                        />
                        {emailError && (
                            <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                                {emailError}
                            </span>
                        )}
                    </div>

                    <input
                        style={styles.input as any}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#334155')}
                    />
                </div>

                <button
                    style={{
                        ...styles.buttonPrimary,
                        opacity: mutation.isPending ? 0.7 : 1
                    } as any}
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
                >
                    {mutation.isPending ? "Signing in..." : "Login"}
                </button>

                <div style={styles.footerText as any}>
                    Don't have an account?
                    <span
                        style={styles.link as any}
                        onClick={() => navigate("/")}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#818cf8')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#6366f1')}
                    >
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
}