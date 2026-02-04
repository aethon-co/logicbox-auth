import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupCollege } from '../api/college';
import toast from 'react-hot-toast';
import logo from '../assets/lb_logo_4_dark_background.svg';

export default function College() {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [collegeNameError, setCollegeNameError] = useState('');
    const [gradYearError, setGradYearError] = useState('');
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
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Account created successfully!");
            navigate("/home");
        },
        onError: (error: any) => {
            toast.error(error.message || "Signup failed");
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') setEmailError('');
        if (e.target.name === 'phoneNumber') setPhoneError('');
        if (e.target.name === 'name') setNameError('');
        if (e.target.name === 'password') setPasswordError('');
        if (e.target.name === 'collegeName') setCollegeNameError('');
        if (e.target.name === 'yearOfGraduation') setGradYearError('');
    };

    const handleSubmit = () => {
        let isValid = true;

        // Name Validation
        if (formData.name.length < 3) {
            setNameError('Name must be at least 3 characters');
            isValid = false;
        }

        // Email Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        // Password Validation
        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }

        // College Name Validation
        if (formData.collegeName.length < 3) {
            setCollegeNameError('College Name must be at least 3 characters');
            isValid = false;
        }

        // Graduation Year Validation
        if (!formData.yearOfGraduation) {
            setGradYearError('Please select a graduation year');
            isValid = false;
        }

        // Phone Validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setPhoneError('Phone number must be exactly 10 digits');
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
            backgroundColor: '#fff7ed', // Orange-50
            padding: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        card: {
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid #fed7aa', // Orange-200
            boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.15)' // Orange shadow
        },
        title: {
            color: '#1e293b', // Slate-800
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
            backgroundColor: '#f97316', // Orange-500
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
            color: '#f97316', // Orange-500
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
                <h1 style={styles.title as any}>College Registration</h1>
                <p style={styles.subtitle as any}>Partner with us to empower your students</p>

                <div style={styles.inputGroup as any}>
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: nameError ? '#ef4444' : '#cbd5e1' } as any}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                        {nameError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{nameError}</span>}
                    </div>
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: emailError ? '#ef4444' : '#cbd5e1' } as any}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                        />
                        {emailError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{emailError}</span>}
                    </div>
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: passwordError ? '#ef4444' : '#cbd5e1' } as any}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Create Password"
                        />
                        {passwordError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{passwordError}</span>}
                    </div>
                    <div>
                        <input
                            style={{ ...styles.input, borderColor: collegeNameError ? '#ef4444' : '#cbd5e1' } as any}
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            placeholder="College Name"
                        />
                        {collegeNameError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{collegeNameError}</span>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <select
                                style={{
                                    ...styles.input,
                                    borderColor: gradYearError ? '#ef4444' : '#cbd5e1',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                } as any}
                                name="yearOfGraduation"
                                value={formData.yearOfGraduation}
                                onChange={handleChange as any}
                            >
                                <option value="" disabled>Select Year</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                            {gradYearError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{gradYearError}</span>}
                        </div>
                        <div>
                            <input
                                style={{ ...styles.input, borderColor: phoneError ? '#ef4444' : '#cbd5e1' } as any}
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
            </div>
        </div>
    );

}