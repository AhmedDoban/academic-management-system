import React from "react";
import SideBar from "./SideBar";
import Head from "./Head";
import Share from "./Share";  
import Post from "./Post";
import { Posts } from "../../dummyData";

const Student = (props) => {
  return (
    <React.Fragment>
      <div className="page p-relative">
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Student;
