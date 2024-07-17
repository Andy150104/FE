import React from "react";
import { Fade } from "react-awesome-reveal";
import "../../css/error.css";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
        <section className="page_404 position-absolute top-50 start-50 translate-middle">
          <div className="container">
            <div className="row">
            <h1 className="text-center-h1 error">404 Url Not Found</h1>
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">Look like you're lost</h3>

                    <p>the page you are looking for not avaible!</p>

                    <Link to="/home" className="link_404">
                      Go to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
