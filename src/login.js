import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [otp, setOtp] = useState(['', '', '', '']); // For user input OTP
    const navigate=useNavigate()
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState(false); // To check if OTP is verified
    const inputRefs = useRef([]);

    const handleFocus = (index, e) => {
        const nxtotp = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = nxtotp;
        setOtp(newOtp);

        if (nxtotp && index + 1 < 4) {
            const nextIndex = (index + 1) % otp.length;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const generateOtp = () => {
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        // setGeneratedOtp(generatedOtp);
        localStorage.setItem('otp',generatedOtp);
        return generatedOtp;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const generatedOtp = generateOtp();
        const templateParams = {
            to_email: email,
            message: `Your OTP code is: ${generatedOtp}`,
        };

        emailjs.send(
            'service_nocver2', 
            'template_83a1nzh', // Replace with your actual template ID
            templateParams,
            'qkKGd1Yu7yUz-v8jj' // Replace with your actual user ID (public key)
        ).then(() => {
            setShow(true);
            alert('OTP has been sent to your email');
        }).catch((error) => {
            console.error('Failed to send OTP:', error);
            alert('Error sending OTP');
        });
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const verifyOtp = () => {
        const enteredOtp = otp.join(''); 
        const generatedOtp=localStorage.getItem('otp');
        if (enteredOtp === generatedOtp) {
            setOtpVerified(true);
            alert('OTP Verified Successfully!');
            navigate('/main')
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            {show ? (
                <form style={styles.form}>
                    <h2 style={styles.heading}>Enter OTP</h2>
                    <p style={styles.subtitle}>Please enter the 4-digit code sent to your email</p>
                    {otp.map((val, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)} 
                            placeholder=''
                            maxLength={1} 
                            onChange={(e) => handleFocus(index, e)} 
                            style={styles.input}
                            value={otp[index]}
                        />
                    ))}
                    <button type="button" onClick={verifyOtp} style={styles.button}>
                        Verify OTP
                    </button>
                </form>
            ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        placeholder='Enter email'
                        value={email}
                        onChange={handleEmail}
                        style={styles.emailInput}
                    />
                    <button type="submit" style={styles.button}>Send OTP</button>
                </form>
            )}
            {otpVerified && <p style={styles.verifiedMessage}>OTP Verified!</p>}

            <p style={styles.footer}>Website: <strong>Notes</strong></p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#777',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    input: {
        width: '50px',
        height: '60px',
        textAlign: 'center',
        fontSize: '24px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s ease',
    },
    emailInput: {
        width: '400px',
        height: '5vh',
        textAlign: 'center',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    verifiedMessage: {
        color: 'green',
        marginTop: '20px',
    },
    footer: {
        marginTop: '20px',
        color: '#555',
    },
};
