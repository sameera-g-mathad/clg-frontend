import React, { Component } from "react";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
export default class Student extends Component {
  static contextType = RootContext;
  img = "";
  state = {
    url: this.context.url,
    student: this.props.location.state.student,
  };
  componentDidMount() {
    const internals1 = this.state.student.internals1.map((sub) => {
      return <div key={sub._id} internals="internals1"></div>;
    });
  }
  arraytoImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => (binary += String.fromCharCode(el)));
    return window.btoa(binary);
  };
  render() {
    const base64flag = "data:image/jpeg;base64,";
    const imgstr = this.arraytoImage(this.state.student.photo.data.data);
    this.img = base64flag + imgstr;
    console.log(this.state.student);
    return (
      <div>
        <div className="p-2 py-4   border rounded-lg ">
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
      </div>
    );
  }
}
