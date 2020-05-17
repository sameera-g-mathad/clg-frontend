import React, { Component } from "react";
import { RootContext } from "./../../RContext";
import Axios from "axios";
export default class Coanalysis extends Component {
  static contextType = RootContext;
  img = "";
  student = this.props.location.state.student;
  state = {
    url: this.context.url,
    teacherid: JSON.parse(localStorage.getItem("id")),
    subject: this.props.location.state.subject,
  };
  arrayToImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => (binary += String.fromCharCode(el)));
    return window.btoa(binary);
  };
  async componentDidMount() {
    try {
      const res = await Axios.get(`${this.state.url}${this.props.match.url}`, {
        headers: {
          teacherId: this.state.teacherid,
          subject: this.state.subject,
        },
      });
      const Internals = res.data.Internals;
      console.log(Internals);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    console.log(this.props);
    const imgage64falg = "data:image/jpeg;base64,";
    let imgstr = this.arrayToImage(this.student.photo.data.data);
    this.img = imgage64falg + imgstr;
    return (
      <div>
        <div className=" border rounded-lg  m-4 sm:flex  p-4 sm:p-0 ">
          <div className="flex items-center mb-2 sm:mr-16 sm:mb-0">
            <img
              className="border rounded-full w-24 h-24"
              src={this.img}
              alt="not present"
            />
          </div>
          <div>
            <p className="capitalize font-semibold font-sans text-gray-700">
              name : {this.student.studentName}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              usn : {this.student.studentUsn}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              subject : {this.state.subject}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              sem : {this.student.sem}
            </p>

            <p className="capitalize font-semibold font-sans text-gray-700">
              section : {this.student.section}
            </p>

            <p className="capitalize font-semibold font-sans text-gray-700">
              dept : {this.student.dept}
            </p>
          </div>
        </div>
        <h4 className="m-4 capitalize text-gray-700 tracking-wider">
          Course outcome analysis
        </h4>
      </div>
    );
  }
}
