import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Teachers from "./TeachersC";
import EditStaff from "./EditStaffC";
import Subjects from "./SubjectsC";
import Students from "./StudentsC";
import SingleStudent from "./SingleStudent";
import updateStudent from "./updateStudent";
import { FaBars } from "react-icons/fa";
import logo from "./../images/logo.png";
export default class Cordinator extends Component {
  state = {
    display: false,
    color: "indigo",
  };
  render() {
    return (
      <div>
        <nav
          className=" flex justify-between items-center px-2 pt-3"
          style={{ width: "100%" }}
        >
          <span className="flex items-center">
            <img src={logo} alt="no logo" className="w-12 h-12 ml-2" />
            <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              gat website
            </span>
          </span>
          <div className="cordinator-full">
            <Link
              to="/cordinator/staff"
              className="hover:text-blue-500  mr-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wider"
            >
              Teachers
            </Link>
            <Link
              to="/cordinator/subjects"
              className="text-black hover:text-green-500  mr-4 font-semibold uppercase hover:text-black hover:no-underline tracking-wider"
            >
              Subjects
            </Link>
            <Link
              to="/cordinator/students"
              className="text-black hover:text-teal-500   mr-4 font-semibold uppercase hover:text-black hover:no-underline tracking-wider"
            >
              Students
            </Link>
            <Link
              to="/"
              onClick={() => sessionStorage.clear()}
              className="text-black hover:text-red-500   mr-2 font-semibold uppercase hover:text-black hover:no-underline tracking-wider"
            >
              logout
            </Link>
          </div>
          <div className="cordinator-half">
            <button
              className="mb-3 mx-2  pt-3 focus:outline-none"
              onClick={() => {
                this.setState({ display: !this.state.display });
              }}
            >
              <span className={`font-bold text-xl `}>
                <FaBars className={`text-${this.state.color}-500`} />
              </span>
            </button>
          </div>
        </nav>
        <div className="md:hidden">
          <div
            className={`h-40 mx-3 mt-2 flex flex-col items-start px-3 border-2 border-${this.state.color}-500 bg-gray-200 rounded-lg shadow-sm `}
            style={{
              display: this.state.display === true ? "flex" : "none",
            }}
          >
            <div className="py-1 mt-1 ">
              <Link
                to="/cordinator/staff"
                className="uppercase text-gray-700 font-semibold   hover:no-underline tracking-widest hover:text-blue-500  "
                onClick={() => {
                  this.setState({
                    color: "indigo",
                    display: !this.state.display,
                  });
                }}
              >
                Teachers
              </Link>
            </div>
            <div className="py-2">
              <Link
                to="/cordinator/subjects"
                className="uppercase text-gray-700 font-semibold   hover:no-underline  tracking-widest hover:text-green-500 "
                onClick={() => {
                  this.setState({
                    color: "green",
                    display: !this.state.display,
                  });
                }}
              >
                Subjects
              </Link>
            </div>
            <div className="py-2">
              <Link
                to="/cordinator/students"
                className="uppercase text-gray-700 font-semibold   hover:no-underline  tracking-widest hover:text-teal-500 "
                onClick={() => {
                  this.setState({
                    color: "teal",
                    display: !this.state.display,
                  });
                }}
              >
                Students
              </Link>
            </div>
            <div className="pt-2">
              <Link
                to="/"
                className="uppercase text-gray-700 font-semibold   hover:no-underline  tracking-widest hover:text-red-500 "
                onClick={() => {
                  sessionStorage.clear();
                  this.setState({ color: "red" });
                }}
              >
                logout
              </Link>
            </div>
          </div>
        </div>

        <Switch>
          {/*Teacher*/}
          <Route exact path="/cordinator/staff" component={Teachers} />
          <Route exact path="/cordinator/staff/:id" component={EditStaff} />

          {/*Subjects*/}
          <Route exact path="/cordinator/subjects" component={Subjects} />

          {/*Students */}
          <Route exact path="/cordinator/students" component={Students} />
          <Route
            exact
            path="/cordinator/students/:usn"
            component={SingleStudent}
          />
          <Route
            exact
            path="/cordinator/students/update/:usn"
            component={updateStudent}
          />
        </Switch>
      </div>
    );
  }
}
