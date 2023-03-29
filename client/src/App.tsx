import React from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./useStore";

function App() {
  const setAuthData = useStore((state: any) => state.setAuthData);

  return (
    <div className="App">
      <div>hi</div>
      {/* <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}
      >
        <GoogleLogin
          useOneTap={true}
          onSuccess={async (credentialResponse) => {
            const { data } = await axios.post("http://localhost:8080/login", {
              token: credentialResponse.credential,
            });
            localStorage.setItem("AuthData", JSON.stringify(data));
            setAuthData(data);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider> */}
    </div>
  );
}

export default App;
