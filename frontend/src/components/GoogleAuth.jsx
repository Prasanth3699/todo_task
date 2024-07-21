import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const base_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (googleData) => {
    try {
      const res = await axios.get(`${base_URL}/auth/google/callback`, {
        headers: {
          "x-auth-token": googleData.credential,
        },
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
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
