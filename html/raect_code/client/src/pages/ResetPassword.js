import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [ isTokenValid, setIsTokenValid] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(resetToken){
            setIsTokenValid(true);
        }
        else{
            setIsTokenValid(false);
            navigate("/forget-password");
        }
    }, [resetToken,navigate]);

  const handleSubmit = async (formData) => {
        try {
            const response = await axios.post('/api/auth/reset-password', {
                resetToken,
                newPassword: formData.newPassword,
              });
          console.log(response.data.msg);
          alert("Password reset successfully!");
          navigate("/login");
        } catch (error) {
            console.error(error.response.data.msg);
        }
    };

  return (
    <div>
     { isTokenValid ?  (
        <>
           <h2>Reset Password</h2>
           <AuthForm formType="resetPassword" onSubmit={handleSubmit} />
        </>
      ) : (
        <>
        <p>Invalid Reset Password Link.</p>
        </>
      )}
    </div>
  );
};

export default ResetPassword;