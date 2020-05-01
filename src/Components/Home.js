import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <nav className="home-nav  md:border-2 md:shadow border-teal-300 rounded-lg md:m-8 md:p-4 ">
          <Link
            className="px-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="staff-login"
          >
            Staff
          </Link>
          <Link
            className="px-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="cordinator-login"
          >
            Cordinator
          </Link>
          <Link
            className="px-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="student-login"
          >
            Student
          </Link>
        </nav>
      </div>
    );
  }
}
