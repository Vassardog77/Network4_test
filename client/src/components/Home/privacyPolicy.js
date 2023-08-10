import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h2>Privacy Policy</h2>
            <p><strong>Last Updated:</strong> August 9, 2023</p>

            <p>Welcome to <strong>Network</strong>. Your privacy is paramount to us, and we are unwaveringly committed to safeguarding your personal details. This privacy policy delineates our practices concerning the collection, usage, storage, and protection of your personal information.</p>
            
            <h3>1. Definitions</h3>
            <ul>
                <li><strong>Personal Data:</strong> Refers to any data that identifies or can potentially identify an individual.</li>
                <li><strong>User:</strong> Anyone who uses our platform, whether registered or not.</li>
                <li><strong>Consent:</strong> A clear, affirmative action, such as ticking a checkbox, which indicates agreement to the processing of personal data.</li>
                <li><strong>Third-party:</strong> Services or websites external to ours.</li>
            </ul>

            <h3>2. Purpose of the Website</h3>
            <p>Our platform serves as a combined social media and social media management tool for university organizations and students.</p>

            <h3>3. Information Collection</h3>
            <p>We accumulate the following types of Personal Data:</p>
            <ul>
                <li>Account details during registration: Email, password, provided name, profile picture, and account type.</li>
                <li>After OAuth login via respective APIs, we collect:
                    <ul>
                        <li>API tokens from your Google, Facebook, and Instagram accounts.</li>
                        <li>Access to certain Facebook pages.</li>
                        <li>Most recent emails from your Gmail account.</li>
                        <li>Events from your Google calendar.</li>
                        <li>Analytics from Instagram, which includes profile views, reach, and impressions.</li>
                    </ul>
                </li>
                <li>On our platform, we store chat logs, composed emails, social media posts, profile data, events, comments, and replies.</li>
            </ul>

            <h3>4. Data Security and Storage</h3>
            <ul>
                <li>All data we gather is securely stored in a MongoDB database.</li>
                <li><strong>Passwords:</strong> For enhanced security, all account passwords are hashed using `jwt.sign` before storage.</li>
                <li>We retain details such as:
                    <ul>
                        <li>Login credentials and profile details collected via forms.</li>
                        <li>API tokens acquired via third-party APIs.</li>
                        <li>Posts created on and scheduled through our website.</li>
                        <li>User-granted list of Facebook pages.</li>
                    </ul>
                </li>
            </ul>

            <h3>5. Usage of Third-Party APIs</h3>
            <p>Upon obtaining your Consent, we integrate with third-party APIs for specific functionalities:</p>
            <ul>
                <li>From the Meta API, we gain permissions for several functionalities including, but not limited to 'pages_show_list', 'Instagram_basic', and 'pages_read_engagement'.</li>
                <li>Through the Google API, we garner access to and manage permissions associated with your Google calendar and Gmail.</li>
            </ul>
            <p>Note: All engagements with third-party APIs necessitate User Consent, which is reversible. We only retain API tokens and the list of Facebook pages you allow access to.</p>

            <h3>6. Sharing and Selling Data</h3>
            <p>We assure that we neither share nor sell any Personal Data to third-party entities.</p>

            <h3>7. Cookies and Tracking</h3>
            <p>Network does not deploy cookies or analogous tracking technologies.</p>

            <h3>8. User Rights</h3>
            <p>As a valued User, you possess the right to:</p>
            <ul>
                <li>Access your data that we've stored.</li>
                <li>Request deletion of your data.</li>
                <li>Edit your data within the platform's boundaries.</li>
            </ul>
            <p>Should you wish to exercise any of the aforementioned rights, please get in touch via the email provided in the subsequent section.</p>

            <h3>9. Third-Party Links</h3>
            <p>Our platform may have links directing to third-party websites. We emphasize that we hold no responsibility for the privacy measures or content of these external websites.</p>

            <h3>10. Changes to the Privacy Policy</h3>
            <p>Should there be any amendments to this privacy policy, rest assured, we will promptly notify our Users via their registered email addresses.</p>

            <h3>11. Policy Agreement</h3>
            <p>By using our platform, Users agree to the collection and use of their personal information as outlined in this Privacy Policy. Continual use of the platform after any updates to this Privacy Policy denotes acceptance of the changes.</p>

            <h3>Contact Us</h3>
            <p>Should you have any queries or concerns related to this privacy policy, we are accessible at <a href="mailto:benmoxon256@gmail.com">benmoxon256@gmail.com</a>.</p>
        </div>
    );
}

export default PrivacyPolicy;
