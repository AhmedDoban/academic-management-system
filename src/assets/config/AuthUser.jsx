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

  async function postData(url = "", Method, data = {}) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);

    var requestOptions = {
      method: Method,
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions).then((res) => res.text());
    
    return response;
  }

  return {
    setToken: saveToken,
    token,
    postData,
    user,
    GetToken,
    logOut,
  };
}
