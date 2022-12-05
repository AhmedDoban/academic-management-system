import React, { Component } from "react";
import { Posts } from "../../../dummyData";
import Post from "./Post";
import Share from "./Share";

function StudentHomePage(props) {
  return (
    <React.Fragment>
      <Share />
      {Posts.map((p) => (
        <Post key={p.id} Post={p} />
      ))}
    </React.Fragment>
  );
}
export default StudentHomePage;
