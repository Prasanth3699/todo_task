import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleLogin = async (googleData) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/google", {
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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
