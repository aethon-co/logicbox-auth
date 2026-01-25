import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupCollege } from '../api/college';

export default function College() {
    const navigate = useNavigate();
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (referralCode) {
            navigator.clipboard.writeText(referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
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
            console.log("Signup successful:", data);
            setReferralCode(data.user.referralCode);
        },
        onError: (error: any) => {
            console.error("Signup failed:", error);
            alert(`Signup Failed: ${error.message}`);
        }
    });

    const [emailError, setEmailError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') {
            setEmailError('');
        }
    };

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        mutation.mutate(formData);
    };



    return (
        <div className="container">
            <div className="card">
                <h1>College Registration</h1>
                <div className="form-group">
                    <input
                        className="input-field"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        className="input-field"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email Address"
                    />
                    {emailError && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '-10px' }}>{emailError}</span>}
                    <input
                        className="input-field"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        className="input-field"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        type="text"
                        placeholder="College Name"
                    />
                    <input
                        className="input-field"
                        name="yearOfGraduation"
                        value={formData.yearOfGraduation}
                        onChange={handleChange}
                        type="number"
                        placeholder="Year of Graduation"
                    />
                    <input
                        className="input-field"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        type="number"
                        placeholder="Phone Number"
                    />
                </div>
                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Submitting..." : "Submit Registration"}
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => navigate("/school")}
                >
                    Go to School Registration
                </button>
                {referralCode && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <h3 style={{ color: '#646cff' }}>Registration Successful!</h3>
                        <p style={{ marginBottom: '0.5rem' }}>Your Referral Code (Click to copy):</p>
                        <div
                            onClick={handleCopy}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                cursor: 'pointer',
                                border: copied ? '1px solid #4ade80' : '1px solid var(--primary-color)',
                                transition: 'all 0.3s ease',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <span style={{ fontSize: '1rem', fontFamily: 'monospace' }}>{import.meta.env.VITE_BACKEND + "/" + referralCode}</span>
                            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{copied ? '✅' : '📋'}</span>
                        </div>
                        {copied && <p style={{ color: '#4ade80', marginTop: '0.5rem', fontSize: '0.9rem' }}>Copied to clipboard!</p>}
                    </div>
                )}
            </div>
        </div>
    )
}