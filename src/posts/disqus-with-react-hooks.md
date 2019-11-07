I recently rewrote this blog to use React and markdown files for making writing things easier and moved to Netlify for continuous deployment. I was previously using Node.js and Pug template engine which was an absolute mess. It was handy for disqus though becuase I could just embed disqus with a script tag. But when I switched to React I couldn't just plonk the script tag in the JSX.

I did include it in build/index.html file and that worked but it just meant that whenever the #disqus_thred div was not rendered the disqus js files would error. I didn't like that so I can up with a custom hook for embedding disqus comments dynamically called useDisqus.

```javascript
import { useEffect } from "react";

const useDisqus = url => {
  useEffect(() => {
    const disqus_config = function() {
      this.page.url = window.location.url; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = window.location.search; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    window.disqus_config = disqus_config;

    const dsq = document.createElement("script");
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];

    dsq.type = "text/javascript";
    dsq.async = true;
    dsq.src = url;

    (head || body).appendChild(dsq);

    return () => {
      (head || body).removeChild(dsq);
    };
  });
};

export default useScript;
```

I use this in my Post.js component which contains the #disqus_thread div

```javascript
useEffect(() => {
  getMarkdown();
}, []);

useDisqus("https://bsmithdev.disqus.com/embed.js");

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
            <div id="disqus_thread"></div>
          </div>
        </div>
      </div>
    </article>
  </div>
);
```
