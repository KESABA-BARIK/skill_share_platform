import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const EditProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (userInfo?.user) {
      const { name, email, avatarUrl, bio, location } = userInfo.user;
      setFormData({
        name: name || '',
        email: email || '',
        bio: bio || '',
        location: location || '',
      });
      setPreviewUrl(avatarUrl || '');
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('location', formData.location);
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.put('http://localhost:5000/api/users/me', formDataToSend, config);

      const updatedUserInfo = {
        user: res.data.user,
        token: userInfo.token,
      };

      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUserInfo });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Profile</h2>
      {previewUrl && (
        <div style={{ textAlign: 'center' }}>
          <img src={previewUrl} alt="Avatar" style={styles.avatar} />
        </div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          style={styles.input}
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          style={styles.input}
        />
        <label htmlFor="avatarUpload" style={styles.fileLabel}>
  Choose Avatar
</label>
<input
  id="avatarUpload"
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  style={styles.hiddenFileInput}
/>

        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#1e1e2f',
    color: '#f0f0f0',
    boxShadow: '0 4px 20px rgba(0, 229, 255, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    color: '#00e5ff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#2a2a3d',
    color: '#f0f0f0',
    outline: 'none',
  },
  fileInput: {
    border: 'none',
    color: '#f0f0f0',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#00e5ff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  fileLabel: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#00e5ff',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background-color 0.3s ease',
  },
  hiddenFileInput: {
    display: 'none',
  },
  
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '2px solid #00e5ff',
  },
};

export default EditProfile;
