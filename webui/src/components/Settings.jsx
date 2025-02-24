import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import './settings.css';

const Settings = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dashboard = () => navigate("/dashboard")

    const changePassword = async (event) => {
        event.preventDefault();

        try {

            if (newPassword1 === newPassword2) {
                const response = await axios.post("http://localhost:5000/api/changePassword", { oldPassword, newPassword1 });
                setMessage("Password changed successfully. To apply changes run the following command:\ndocker restart frontend backend")
            } else {
                throw new Error("Passwords do not match");
            }
        } catch (error) {
            setMessage(`${error.message}`)
        }
    }

    return (
        <div className="settings-container align-center">
            <h2>Settings</h2>
            <div>
                <h3>Change password</h3>
                <form onSubmit={changePassword}>
                <button type="submit">Submit</button>
                    <div className="password-reset">
                        <label htmlFor="old-pass">Current Password:</label>
                        <input
                            type="password"
                            name="old-pass"
                            id="old-pass"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required />
                    </div>
                    <div className="password-reset">
                        <label htmlFor="new-pass-1">New Password</label>
                        <input
                            type="password"
                            name="new-pass-1"
                            id="new-pass-1"
                            value={newPassword1}
                            onChange={(e) => setNewPassword1(e.target.value)}
                            required />
                    </div>
                    <div className="password-reset">
                        <label htmlFor="new-pass-2">Re-Enter New Password</label>
                        <input
                            type="password"
                            name="new-pass-2"
                            id="new-pass-2"
                            value={newPassword2}
                            onChange={(e) => setNewPassword2(e.target.value)}
                            required />
                    </div>
                </form>
                {message && <p className="msg">{message}</p>}
            </div>
            <button onClick={dashboard}>Dashboard</button>
        </div>
    );
};

export default Settings;