import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Teachers from "./TeachersC";
import EditStaff from "./EditStaffC";
import Subjects from "./SubjectsC";
import Students from "./StudentsC";
import SingleStudent from "./SingleStudent";
import updateStudent from "./updateStudent";
import { GiHamburgerMenu } from "react-icons/gi";
export default class Cordinator extends Component {
  state = {
    display: false,
    color: "indigo",
  };
  render() {
    return (
      <div>
        <nav
          className=" flex justify-between items-center px-4 pt-3"
          style={{ width: "100%" }}
        >
          <p className=" mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
            clg website
          </p>
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
          </div>
          <div className="cordinator-half">
            <button
              className="mb-3 mx-2 px-2 py-1"
              onClick={() => {
                this.setState({ display: !this.state.display });
              }}
            >
              <span className={`font-bold text-xl `}>
                <GiHamburgerMenu className={`text-${this.state.color}-500`} />
              </span>
            </button>
          </div>
        </nav>
        <div
          className={`h-48 mx-3 flex flex-col items-start px-3 border-2 border-${this.state.color}-500 bg-${this.state.color}-200 rounded-lg shadow-sm`}
          style={{ display: this.state.display ? "flex" : "none" }}
        >
          <div className="py-2 mt-2 ">
            <Link
              to="/cordinator/staff"
              className="uppercase text-gray-700 font-semibold   hover:no-underline tracking-widest hover:text-blue-500  "
              onClick={() => {
                this.setState({ color: "indigo" });
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
                this.setState({ color: "green" });
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
                this.setState({ color: "teal" });
              }}
            >
              Students
            </Link>
          </div>
          <div className="py-2">
            <Link
              to="/cordinator/students"
              className="uppercase text-gray-700 font-semibold   hover:no-underline  tracking-widest hover:text-red-500 "
              onClick={() => {
                this.setState({ color: "red" });
              }}
            >
              logout
            </Link>
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
