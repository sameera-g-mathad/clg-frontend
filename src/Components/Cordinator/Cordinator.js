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
            <button className="mb-3 mx-2 px-1 py-1">
              <span className="font-bold text-xl">
                <GiHamburgerMenu />
              </span>
            </button>
          </div>
        </nav>
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
