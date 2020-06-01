import React, { Component } from "react";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./../../App.css";
import Select from "react-select";
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
    internals_select: "Internals 1",
  };
  options = [
    {
      label: "Internals 1",
      value: "Internals 1",
    },
    {
      label: "Internals 2",
      value: "Internals 2",
    },
    {
      label: "Internals 3",
      value: "Internals 3",
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
            className=" m-3 p-2 pl-3 bg-gray-200 rounded-lg border-b-4 hover:shadow-lg border-indigo-500"
          >
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              subject : {el.subject}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.subjectCode}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.sem}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-500">Ab</span>
              ) : (
                el.marks
              )}
            </p>
          </div>
        );
      else return "";
    });
    const display_internals2 = internals2.map((el) => {
      if (el.sem === this.state.sem)
        return (
          <div
            key={el._id}
            className=" m-3  pl-3 p-2 bg-gray-200 rounded-lg border-b-4 hover:shadow-lg border-green-600"
          >
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              subject : {el.subject}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.subjectCode}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.sem}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-500">Ab</span>
              ) : (
                el.marks
              )}
            </p>
          </div>
        );
      else return "";
    });
    const display_internals3 = internals3.map((el) => {
      if (el.sem === this.state.sem)
        return (
          <div
            key={el._id}
            className=" m-3 p-2  pl-3 bg-gray-200 rounded-lg border-b-4 hover:shadow-lg border-orange-500"
          >
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              subject : {el.subject}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.subjectCode}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              sem : {el.sem}
            </p>
            <p className="capitalize text-lg text-gray-800 tracking-wide font-semibold hover:underline">
              marks :{" "}
              {el.marks < 0 ? (
                <span className="text-red-500">Ab</span>
              ) : (
                el.marks
              )}
            </p>
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
  arraytoImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => (binary += String.fromCharCode(el)));
    return window.btoa(binary);
  };
  selectChange = (e) => {
    const value = e.value;
    this.setState({
      internals_select: value,
    });
  };
  render() {
    const base64flag = "data:image/jpeg;base64,";
    const imgstr = this.arraytoImage(this.state.student.photo.data.data);
    this.img = base64flag + imgstr;

    return (
      <div>
        <div className="p-2 py-4 mx-3 mt-2 border rounded-lg ">
          <Button
            className="mx-4 float-right my-2"
            tag={Link}
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
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                name : {this.state.student.studentName}
              </p>
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                usn : {this.state.student.studentUsn}
              </p>
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                department : {this.state.student.dept}
              </p>
            </div>
          </div>
        </div>
        <div className="w-40 sm:w-64 m-3">
          <Select
            className="font-semibold"
            placeholder="Internals"
            options={this.options}
            defaultValue={{ label: "Internals 1", value: "Internals 1" }}
            onChange={this.selectChange}
          />
        </div>
        {this.state.internals_select === "Internals 1" ? (
          <div className="studentdisplay-content">{this.state.internals1}</div>
        ) : (
          ""
        )}
        {this.state.internals_select === "Internals 2" ? (
          <div className="studentdisplay-content">{this.state.internals2}</div>
        ) : (
          ""
        )}
        {this.state.internals_select === "Internals 3" ? (
          <div className="studentdisplay-content">{this.state.internals3}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
