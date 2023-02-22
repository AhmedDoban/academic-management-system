import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const Navigate = useNavigate();

  const GetToken = (e) => {
    const tokenString = sessionStorage.getItem("Token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const GetUser = (e) => {
    const userString = sessionStorage.getItem("User");
    const User_detail = JSON.parse(userString);
    return User_detail;
  };

  const [token, setToken] = useState(GetToken());
  const [user, setUser] = useState(GetUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem("Token", JSON.stringify(token));
    sessionStorage.setItem("User", JSON.stringify(user));
    setToken(token);
    setUser(user);
    Navigate("/home");
  };

  const logOut = () => {
    sessionStorage.clear();
    Navigate("/login");
  };

  const http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    setToken: saveToken,
    token,
    user,
    GetToken,
    http,
    logOut,
  };
}
