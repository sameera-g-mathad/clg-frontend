import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
export default class Home extends Component {
  state = {
    display: false,
  };
  render() {
    return (
      <div>
        <nav className=" flex justify-between md:m-8 p-3 md:border-2 rounded-lg">
          <span className=" mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
            clg website
          </span>
          <div className="home-nav">
            <Link
              className="px-4 text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="staff-login"
            >
              Staff
            </Link>
            <Link
              className="px-4 text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="cordinator-login"
            >
              Cordinator
            </Link>
            <Link
              className="px-4 text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="student-login"
            >
              Student
            </Link>
          </div>
          <div className="home-half">
            <button
              className="mb-3 mx-2  py-1"
              onClick={() => {
                this.setState({ display: !this.state.display });
              }}
            >
              <span className={`font-bold text-xl `}>
                <FaBars
                // className={`text-${this.state.color}-500`}
                />
              </span>
            </button>
          </div>
        </nav>
        <div className="md:hidden">
          <div
            className={`h-40 mx-3  flex flex-col items-start px-3 border-2  bg-gray-200 rounded-lg shadow-sm `}
            style={{
              display: this.state.display === true ? "flex" : "none",
            }}
          >
            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="staff-login"
              >
                Staff
              </Link>
            </div>

            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="cordinator-login"
              >
                Cordinator
              </Link>
            </div>
            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="student-login"
              >
                Student
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
