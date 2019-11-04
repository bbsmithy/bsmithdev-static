### Links

[NPM package](https://www.npmjs.com/package/picky-scrape)
[Github repo](https://github.com/bbsmithy/picky-scrape)

## Motivation

I've decided to read more news and articles that are not related to what I do. The problem with this is there are loads of mad sites all shouting for attention and this is distracting from the information/story. So in effort to fix this problem and read more news i'm going to build a server side react app with Next.js that connects to newsorg api and just displays the headlines and links of news vendors that I like.

## Steps:

1. Set up News API
2. Set up Next.js
3. Handle query strings with Express.js server
4. Pull down news data
5. Render news headlines/links

## (1) Set up News API

The News API is great, they cover a lot of major news vendor around the world and allows you to get headlines and description on all sorts of topics. Its free to use but you need to get an API key here: [https://newsapi.org/](https://newsapi.org/) The news vendor ids i'll be using are hacker-news, bloomberg, the-irish-times and business-insider.
This the endpoint i'll be fetching from:

```javascript
`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=API_KEY`;
```


## (2) Set up Next.js

First we'll set up the Next.js app structure,

```bash
mkdir ssr-news-app && cd ssr-news-app
npm init -y
npm install --save react react-dom next
mkdir pages
```

Add the scripts object to your package.json

```json
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
}
```

Create pages/index.js

```javascript
const Index = props => {
    return (
      #{'<h1>How are you getting on?</h1>'}
    )
}
export default Index;
```

Now we can launch the app, Next.js uses file names inside of the pages directory as routes and takes index.js as '/' by default.
So now if we start our server and open localhost:3000/ we should see our index page.

```bash
npm run dev
```

If you see this error then your most likely using an older version of node that Next.js doesn't support.

```bash
Uncaught TypeError: Object.values is not a function JavaScript
```

Try switching to use a node version greater than 7 to fix this. You can use node version manager (nvm)

```bash
nvm use 10
```

## (3) Handle query strings with Express.js server

Create a file called server.js in root of project and install express

```bash
 npm install --save express
```

**server.js**

```javascript
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.get("/:id", (req, res) => {
      const page = "/";
      const queryParams = { id: req.params.id };
      app.render(req, res, page, queryParams);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

If we visit 'localhost:3000/?id=hacker-news' we can then grab the query string 'hacker-news' from the id key. req.params.id returns our query string 'hacker-news'.

```javascript
server.get("/:id", (req, res) => {
  const page = "/";
  const queryParams = { id: req.params.id };
  app.render(req, res, page, queryParams);
});
```

app.render is used to render a page inside our pages directory so '/' will render our index.js page. We'll pass our queryParams to that page so we can use the id in our fetch to News API.

## (4) Pull down news data

We'll now install isomorphic-unfetch which is an implementation of fetch (a browser API) that can be used on the server. Import it once installed:

```bash
 npm install --save isomorphic-unfetch
```

**pages/index.js**

```javascript
import fetch from "isomorphic-unfetch";
```

```javascript
Index.getInitialProps = async function(context) {
  const { id } = context.query;

  const url = id
    ? `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=API_KEY`
    : `https://newsapi.org/v2/top-headlines?sources=hacker-news&apiKey=API_KEY`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    articles: data.articles,
    source: data.articles[0].source.name
  };
};
```

getInitialProps() allows us to pass props to our component before rendering occurs.
So we can make our fetch to the News API with our id, and then use the returned data as props to our Index component.

## (5) Render news headlines/links

Create the Index component that will pass our props.articles down to the Feed component

```javascript
import Link from "next/link";
import Feed from "../components/Feed";
import fetch from "isomorphic-unfetch";

const Index = props => {
  return (
    <div>
      <div id="title">
        <h2 style={{ fontWeight: 900 }}>{props.source} Top Stories</h2>
      </div>
      <div id="nav">
        <ul>
          <li>
            <Link href="/?id=hacker-news">Hacker News</Link>
          </li>
          <li>
            <Link href="/?id=bloomberg">Bloomberg</Link>
          </li>
          <li>
            <Link href="/?id=business-insider">Business Insider</Link>
          </li>
          <li>
            <Link href="/?id=the-irish-times">The Irish Times</Link>
          </li>
        </ul>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto"
        }}
      >
        {props.articles && <Feed articles={props.articles} />}
      </div>

      <style jsx>
        {`
          #title {
            font-family: "Lucida Console", Monaco, monospace;
            margin: auto;
            width: 40%;
            display: "inline-block";
          }
          #nav {
            position: fixed;
            top: 0px;
            lef: 0px;
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
          }
          ul {
            list-style-type: none;
            display: inline;
          }
          li {
            text-decoration: none;
            margin-bottom: 15px;
            font-size: 25px;
          }
          a {
            text-decoration: none;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  );
};

Index.getInitialProps = async function(context) {
  const { id } = context.query;

  const url = id
    ? `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=API_KEY`
    : `https://newsapi.org/v2/top-headlines?sources=hacker-news&apiKey=API_KEY`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    articles: data.articles,
    source: data.articles[0].source.name
  };
};

export default Index;
```

Create the feed component in components/Feed.js, this will render an Article component for each article pass through props

```javascript
import Article from "./Article";
const Feed = props => {
  return (
    <div style={{ display: "inline", width: "40%", margin: "auto" }}>
      {props.articles.map(article => {
        return (
          <Article
            title={article.title}
            url={article.url}
            description={article.description}
          />
        );
      })}
    </div>
  );
};

export default Feed;
```

And then finally the Article component in /components/Article.js

```javascript
const Article = props => {
  return (
    <div className="card">
      <a href={props.url} style={{ textDecoration: "none" }} target="blank">
        <div className="container">
          <h2 className="header">{props.title}</h2>
          <p style={{ marginBottom: 30 }}>{props.description}</p>
        </div>
      </a>
      <style jsx>
        {`
          .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            width: 40%;
            margin: 20px auto 20px auto;
            padding: 20px;
          }

          p {
            font-family: Arial, Helvetica, sans-serif;
          }

          h2 {
            font-family: "Lucida Console", Monaco, monospace;
          }

          .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          }

          .container {
            padding: 2px 16px;
          }
        `}
      </style>
    </div>
  );
};
export default Article;
```

Now if I run our server on localhost:3000 with:

```bash
npm run dev
```

I can see the latest hacker news articles!

![alt text](https://firebasestorage.googleapis.com/v0/b/bsmithdev-6cad2.appspot.com/o/react-news-image.png?alt=media&token=fe96accb-6795-46d1-bfca-4928fc17f9e6)

Thanks for reading, hope it helps with getting to grips with SSR and Next.js
