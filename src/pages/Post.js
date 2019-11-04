import React, { useEffect, useState } from "react";
import { Remarkable } from "remarkable";
import {
  highlight,
  getLanguage,
  highlightAuto,
  initHighlightingOnLoad,
  listLanguages
} from "highlightjs";

const md = new Remarkable({
  highlight: function(str, lang) {
    if (lang && getLanguage(lang)) {
      console.log(listLanguages());
      try {
        const hl = highlight(lang, str).value;
        console.log(hl);
        return hl;
      } catch (err) {
        console.log(err, "Could not highlight");
      }
    }

    try {
      return highlightAuto(str).value;
    } catch (err) {
      console.log(err, "Could not highlight");
    }

    return ""; // use external default escaping
  },
  langPrefix: "hljs language"
});

export const Post = props => {
  const [html, setHTML] = useState();

  const {
    match: {
      params: { postName }
    }
  } = props;

  const { posts } = require("../posts/config");
  const { bg, title } = posts[postName];

  const getMarkdown = async () => {
    try {
      const post = require(`../posts/${postName}.md`);
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
        <div
          class="jumbotron col-lg-8 col-md-10 mx-auto"
          style={{
            backgroundImage: `url(${require(`../assets/${bg}`)})`,
            color: "white",
            textShadow: "2px 2px 4px #000000",
            marginTop: 80
          }}
        >
          <div class="post-heading">
            <h1>{title}</h1>
            <h2 class="subheading"> </h2>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};