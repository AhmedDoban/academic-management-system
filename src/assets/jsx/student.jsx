import React from "react";
import SideBar from "./SideBar";
import Head from "./Head";
import Share from "./Share";
import StudentBox from "./StudentBox";
import Post from "./Post";
import { Posts } from "../../dummyData";

const Student = (props) => {
  return (
    <React.Fragment>
      <div className="page">
        <SideBar />
        <div className="content">
          <Head />
          <div className="pagewrapper m-20 display-flex gap-10">
            <div className="postContainer width-full">
              <Share />
              {Posts.map((p) => (
                <Post key={p.id} Post={p} />
              ))}
            </div>
            <StudentBox />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Student;
