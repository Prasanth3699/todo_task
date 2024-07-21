import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const base_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (googleData) => {
    try {
      const res = await axios.get(`${base_URL}/api/auth/google`, {
        headers: {
          idToken: googleData.credential,
        },
      });
      // Check if the response contains the token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        throw new Error("Token not received from server.");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  const handleFailure = (result) => {
    console.error("Google login failed:", result);
  };

  return (
    // eslint-disable-next-line no-undef
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
