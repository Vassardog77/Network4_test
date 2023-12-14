import React, { useState } from 'react';
import axios from 'axios';

function EmailFunctionality(props) {
    const [email, setEmail] = useState({ from: '', to: '', subject: '', body: '' });
    const [statusMessage, setStatusMessage] = useState('');

    // Retrieve the user's email and set it in state when component mounts
    useState(() => {
        const current_user = JSON.parse(localStorage.getItem('user'));
        setEmail(prevState => ({ ...prevState, from: current_user.email }));
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            // Backend API call to send email
            const response = await axios.post('/api/send-email', email);
            setStatusMessage(response.data.message);
        } catch (error) {
            console.error("Error sending email", error);
            setStatusMessage("Failed to send email");
        }
    };

    return (
        <div>
            <form onSubmit={sendEmail}>
                <div>
                    <input
                        type='email'
                        placeholder='To:'
                        required
                        value={email.to}
                        onChange={(e) => setEmail({ ...email, to: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Subject'
                        value={email.subject}
                        onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        placeholder='Body'
                        value={email.body}
                        onChange={(e) => setEmail({ ...email, body: e.target.value })}
                    />
                </div>
                <div>
                    <button type='submit'>Send Email</button>
                </div>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
}

export default EmailFunctionality;
