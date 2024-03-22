import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

function ChangeProfile({ handleEditProfile, handleClose, currentUsername, currentPassword }) {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newPassword, setNewPassword] = useState(currentPassword);

  const handleSubmit = () => {
    handleEditProfile(newUsername, newPassword);
    handleClose();
  };

  return (
    <div className="transparentBack2" onClick={handleClose}>
      <div className="gameOverBox2" onClick={(e) => e.stopPropagation()}>
        <div className="gameOverHeading">EDIT PROFILE</div>
        <div className="inputBox">
          <div className="editInputBox">
            <div className="editHeading">CURRENT USERNAME</div>
            <input
              type="text"
              className="editInput"
              value={currentUsername}
              readOnly
            />
          </div>
          <div className="editInputBox">
            <div className="editHeading">CURRENT PASSWORD</div>
            <input
              type="password"
              className="editInput"
              value={currentPassword}
              readOnly
            />
          </div>
          <div className="editInputBox">
            <div className="editHeading">NEW USERNAME</div>
            <input
              type="text"
              className="editInput"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="editInputBox">
            <div className="editHeading">NEW PASSWORD</div>
            <input
              type="password"
              className="editInput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="saveButton2" onClick={handleSubmit}>Save</button>
        <button className="closeButton2" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

ChangeProfile.propTypes = {
  handleEditProfile: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
  currentPassword: PropTypes.string.isRequired,
};

export default ChangeProfile;
