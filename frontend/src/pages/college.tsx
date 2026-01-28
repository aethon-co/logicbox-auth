import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupCollege } from '../api/college';
import toast from 'react-hot-toast';

export default function College() {
    const navigate = useNavigate();
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        collegeName: '',
        yearOfGraduation: '',
        phoneNumber: '',
    });

    const mutation = useMutation({
        mutationFn: signupCollege,
        onSuccess: (data) => {
            setReferralCode(data.user.referralCode);
            toast.success("Account created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Signup failed");
        }
    });

    const handleCopy = () => {
        if (referralCode) {
            navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND}/register/${referralCode}`);
            setCopied(true);
            toast.success("Link copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') setEmailError('');
        if (e.target.name === 'phoneNumber') setPhoneError('');
    };

    const handleSubmit = () => {
        // Improved Email Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Phone Validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setPhoneError('Phone number must be exactly 10 digits');
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
            maxWidth: '500px',
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
            transition: 'border-color 0.2s'
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
            marginBottom: '12px',
            transition: 'opacity 0.2s'
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
            marginLeft: '5px'
        },
        successBox: {
            marginTop: '24px',
            padding: '20px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '16px',
            textAlign: 'center'
        },
        copyArea: {
            backgroundColor: '#020617',
            padding: '12px',
            borderRadius: '10px',
            marginTop: '12px',
            cursor: 'pointer',
            border: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    };

    return (
        <div style={styles.wrapper as any}>
            <div style={styles.card as any}>
                <h1 style={styles.title as any}>College Registration</h1>
                <p style={styles.subtitle as any}>Partner with us to empower your students</p>

                <div style={styles.inputGroup as any}>
                    <input
                        style={styles.input as any}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: emailError ? '#ef4444' : '#334155' } as any}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                        />
                        {emailError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{emailError}</span>}
                    </div>
                    <input
                        style={styles.input as any}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Create Password"
                    />
                    <input
                        style={styles.input as any}
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="College Name"
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <input
                            style={styles.input as any}
                            name="yearOfGraduation"
                            value={formData.yearOfGraduation}
                            onChange={handleChange}
                            type="number"
                            placeholder="Grad. Year"
                        />
                        <div>
                            <input
                                style={{ ...styles.input, borderColor: phoneError ? '#ef4444' : '#334155' } as any}
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                type="text"
                                inputMode="numeric"
                                placeholder="Phone Number"
                                maxLength={10}
                            />
                            {phoneError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{phoneError}</span>}
                        </div>
                    </div>
                </div>

                <button
                    style={{ ...styles.buttonPrimary, opacity: mutation.isPending ? 0.7 : 1 } as any}
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Registering..." : "Create Account"}
                </button>

                <div style={styles.footerText as any}>
                    Already have an account?
                    <span style={styles.link as any} onClick={() => navigate("/login")}>Login</span>
                </div>

                <div style={{ ...styles.footerText, marginTop: '10px' } as any}>
                    Registering for a school?
                    <span style={styles.link as any} onClick={() => navigate("/school")}>Click here</span>
                </div>

                {referralCode && (
                    <div style={styles.successBox as any}>
                        <h4 style={{ color: '#10b981', margin: '0 0 8px 0', fontSize: '1rem' }}>Success! Account Created</h4>
                        <div style={styles.copyArea as any} onClick={handleCopy}>
                            <span style={{ fontSize: '0.85rem', color: '#6366f1' }}>{referralCode}</span>
                            <span>{copied ? '✅' : '📋'}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}