import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupSchool } from '../api/school';

export default function School() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        schoolName: '',
        password: '',
        phoneNumber: '',
        standard: '',
        address: '',
        referralCode: '',
        feedbackDetails: '',
        yearOfGraduation: 2026
    });

    const mutation = useMutation({
        mutationFn: signupSchool,
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            alert("Signup Successful!");
        },
        onError: (error: any) => {
            console.error("Signup failed:", error);
            alert(`Signup Failed: ${error.message}`);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        mutation.mutate(formData);
    };

    return (
        <div className="container">
            <div className="card">
                <h1>School Registration</h1>
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
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        type="text"
                        placeholder="School Name"
                    />
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
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        type="number"
                        placeholder="Parent Phone Number"
                    />
                    <input
                        className="input-field"
                        name="standard"
                        value={formData.standard}
                        onChange={handleChange}
                        type="text"
                        placeholder="Standard/Grade"
                    />
                    <input
                        className="input-field"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="Address"
                    />
                    <input
                        className="input-field"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        type="text"
                        placeholder="Referral Code (Optional)"
                    />
                    <input
                        className="input-field"
                        name="feedbackDetails"
                        value={formData.feedbackDetails}
                        onChange={handleChange}
                        type="text"
                        placeholder="Feedback/Details"
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
                    onClick={() => navigate("/")}
                >
                    Go to College Registration
                </button>
            </div>
        </div>
    )
}