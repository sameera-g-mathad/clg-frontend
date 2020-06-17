import React, { Component } from "react";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import "./../../App.css";
import Select from "react-select";
import { FaEye } from "react-icons/fa";
export default class Student extends Component {
  static contextType = RootContext;
  img = "";
  state = {
    url: this.context.url,
    student: this.props.location.state.student,
    sem: this.props.location.state.student.sem,
    internals1: [],
    internals2: [],
    internals3: [],
    internals_select: "Internal 1",
    color: "indigo-400",
  };
  options = [
    {
      label: "Internal 1",
      value: "Internal 1",
    },
    {
      label: "Internal 2",
      value: "Internal 2",
    },
    {
      label: "Internal 3",
      value: "Internal 3",
    },
  ];
  compare = (a, b) => {
    if (a.subjectCode < b.subjectCode) return -1;
    if (a.subjectCode > b.subjectCode) return 1;
    return 0;
  };
  componentDidMount() {
    const internals1 = this.state.student.internals1;
    internals1.sort(this.compare);
    const internals2 = this.state.student.internals2;
    internals2.sort(this.compare);
    const internals3 = this.state.student.internals3;
    internals3.sort(this.compare);
    const display_internals1 = internals1.map((el) => {
      if (el.sem === this.state.sem)
        return (
          <div
            key={el._id}
            className=" m-3 p-2 pl-3 bg-gray-700 rounded-lg border-b-4 hover:shadow-lg border-indigo-400"
          >
            <p
              className={`capitalize text-lg text-${this.state.color} tracking-wider font-semibold hover:underline`}
            >
              subject : {el.subject}
            </p>
            <p
              className={`capitalize text-lg text-${this.state.color} tracking-wider font-semibold hover:underline`}
            >
              subject-code : {el.subjectCode}
            </p>
            <p
              className={`capitalize text-lg text-${this.state.color} tracking-wider font-semibold hover:underline`}
            >
              sem : {el.sem}
            </p>
            <p
              className={`capitalize text-lg text-${this.state.color} tracking-wider font-semibold hover:underline`}
            >
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-600">Ab</span>
              ) : (
                el.marks
              )}
            </p>
            <div className="flex justify-end text-red-500">
              <Button
                color="warning"
                outline
                disabled={el.marks < 0 ? true : false}
                tag={Link}
                to={{
                  pathname: "/student/internals",
                  state: {
                    subject: el.subject,
                    subjectCode: el.subjectCode,
                    sem: el.sem,
                    internal: "Internal 1",
                    section: this.state.student.section,
                    student: this.state.student,
                    internals: this.state.student.internals1,
                  },
                }}
              >
                <span className="flex justify-center font-semibold text-lg items-center capitalize tracking-wider">
                  <FaEye className="mr-1" />
                  view
                </span>
              </Button>
            </div>
          </div>
        );
      else return "";
    });
    const display_internals2 = internals2.map((el) => {
      if (el.sem === this.state.sem)
        return (
          <div
            key={el._id}
            className=" m-3  pl-3 p-2 bg-gray-700 rounded-lg border-b-4 hover:shadow-lg border-green-400"
          >
            <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold text-green-400 hover:underline">
              subject : {el.subject}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold text-green-400 hover:underline">
              subject-code : {el.subjectCode}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold text-green-400 hover:underline">
              sem : {el.sem}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold text-green-400 hover:underline">
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-600">Ab</span>
              ) : (
                el.marks
              )}
            </p>
            <div className="flex justify-end  ">
              <Button
                color="danger"
                outline
                disabled={el.marks < 0 ? true : false}
                tag={Link}
                to={{
                  pathname: "/student/internals",
                  state: {
                    subject: el.subject,
                    subjectCode: el.subjectCode,
                    sem: el.sem,
                    internal: "Internal 2",
                    section: this.state.student.section,
                    student: this.state.student,
                    internals: this.state.student.internals2,
                  },
                }}
              >
                <span className="flex justify-center font-semibold text-lg items-center capitalize tracking-wider">
                  <FaEye className="mr-1" />
                  view
                </span>
              </Button>
            </div>
          </div>
        );
      else return "";
    });
    const display_internals3 = internals3.map((el) => {
      if (el.sem === this.state.sem)
        return (
          <div
            key={el._id}
            className=" m-3 p-2  pl-3 bg-gray-700 rounded-lg border-b-4 hover:shadow-lg border-orange-400"
          >
            <p className="capitalize text-lg text-orange-400 tracking-wider font-semibold hover:underline">
              subject : {el.subject}
            </p>
            <p className="capitalize text-lg text-orange-400 tracking-wider font-semibold hover:underline">
              subject-code : {el.subjectCode}
            </p>
            <p className="capitalize text-lg text-orange-400 tracking-wider font-semibold hover:underline">
              sem : {el.sem}
            </p>
            <p className="capitalize text-lg text-orange-400 tracking-wider font-semibold hover:underline">
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-600">Ab</span>
              ) : (
                el.marks
              )}
            </p>
            <div className="flex justify-end ">
              <Button
                color="primary"
                outline
                disabled={el.marks < 0 ? true : false}
                tag={Link}
                to={{
                  pathname: "/student/internals",
                  state: {
                    subject: el.subject,
                    subjectCode: el.subjectCode,
                    sem: el.sem,
                    internal: "Internal 3",
                    section: this.state.student.section,
                    student: this.state.student,
                    internals: this.state.student.internals3,
                  },
                }}
              >
                <span className="flex justify-center font-semibold text-lg items-center capitalize tracking-wider">
                  <FaEye className="mr-1" />
                  view
                </span>
              </Button>
            </div>
          </div>
        );
      else return "";
    });
    this.setState({
      internals1: [...display_internals1],
      internals2: [...display_internals2],
      internals3: [...display_internals3],
    });
  }
  componentWillUnmount() {
    this.props.history.goForward();
  }
  arraytoImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => (binary += String.fromCharCode(el)));
    return window.btoa(binary);
  };
  selectChange = (e) => {
    const value = e.value;
    let color;
    if (e.value === "Internal 1") color = "indigo-400";
    if (e.value === "Internal 2") color = "green-400";
    if (e.value === "Internal 3") color = "orange-400";
    this.setState({
      internals_select: value,
      color,
    });
  };
  render() {
    const base64flag = "data:image/jpeg;base64,";
    const imgstr = this.arraytoImage(this.state.student.photo.data.data);
    this.img = base64flag + imgstr;
    const customStyles = {
      control: (base, state) => {
        return {
          ...base,
          border: "none",
          boxShadow: state.isFocused ? null : null,
        };
      },
    };
    return (
      <div>
        <div
          className={`p-2 py-4 mx-3 mt-2 shadow-sm bg-gray-700 border-2 border-${this.state.color} rounded-lg `}
        >
          <Button
            className="mx-4 float-right my-2"
            tag={Link}
            onClick={() => sessionStorage.clear()}
            to="/"
            color="danger"
          >
            Logout
          </Button>
          <div className="flex items-center flex-wrap">
            <img
              className="rounded-full w-32 ml-2 sm:mr-12"
              src={this.img}
              alt=""
            />
            <div className="ml-2">
              <p
                className={`capitalize text-lg text-${this.state.color}   tracking-widest font-semibold hover:underline`}
              >
                name : {this.state.student.studentName}
              </p>
              <p
                className={`capitalize text-lg text-${this.state.color} tracking-widest font-semibold hover:underline`}
              >
                usn : {this.state.student.studentUsn}
              </p>
              <p
                className={`capitalize text-lg text-${this.state.color} tracking-widest font-semibold hover:underline`}
              >
                department : {this.state.student.dept}
              </p>
              <p
                className={`capitalize text-lg text-${this.state.color} tracking-widest font-semibold hover:underline`}
              >
                section : "{this.state.student.section}"
              </p>
            </div>
          </div>
        </div>
        <FormGroup
          className={`border-2 border-${this.state.color}  p-1 m-3 rounded-lg w-40 sm:w-64 tracking-wider font-semibold  flex items-center`}
        >
          <Select
            className="w-40 sm:w-64"
            styles={customStyles}
            placeholder="Internals"
            options={this.options}
            defaultValue={{ label: "Internal 1", value: "Internal 1" }}
            onChange={this.selectChange}
          />
        </FormGroup>

        {this.state.internals_select === "Internal 1" ? (
          <div className="studentdisplay-content">{this.state.internals1}</div>
        ) : (
          ""
        )}
        {this.state.internals_select === "Internal 2" ? (
          <div className="studentdisplay-content">{this.state.internals2}</div>
        ) : (
          ""
        )}
        {this.state.internals_select === "Internal 3" ? (
          <div className="studentdisplay-content">{this.state.internals3}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
