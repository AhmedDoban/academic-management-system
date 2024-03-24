import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));
const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));

function Gust(props) {
  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route path="*" element={<NotFounded to="/NotFounded" />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}
export default Gust;
