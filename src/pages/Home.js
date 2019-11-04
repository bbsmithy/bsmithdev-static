import React from "react";
import { PostPreview } from "../components/PostPreview";
import { posts } from "../posts/config";

export const Home = () => {
  return (
    <>
      <div className="container content-view">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {Object.keys(posts).map(key => {
              const post = posts[key];
              return <PostPreview {...post} path={key} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
