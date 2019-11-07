import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <a href="https://twitter.com/BSmithy77" target="blank">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-twitter fa-stack-1x fa-inverse" />
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/bbsmithy" target="blank">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-github fa-stack-1x fa-inverse" />
                  </span>
                </a>
              </li>
            </ul>
            <p className="copyright text-muted">Copyright © bsmithdev</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
