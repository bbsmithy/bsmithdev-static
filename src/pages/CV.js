import React, { useEffect, useState } from "react";
import { Remarkable } from "remarkable";

const md = new Remarkable({});

export const CV = props => {
  const [html, setHTML] = useState();
  const getMarkdown = async () => {
    try {
      const post = require(`../CV.md`);
      const response = await fetch(post);
      const markdown = await response.text();
      const parsedHTML = md.render(markdown);
      setHTML(parsedHTML);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMarkdown();
  }, []);

  return (
    <div className="container content-view">
      <article>
        <div class="container">
          <div class="row">
            <div className="col-lg-8 col-md-10 mx-auto" style={{marginTop: 30}}>
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
