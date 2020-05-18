import React, { Component } from "react";
import { RootContext } from "./../../RContext";
import Axios from "axios";
export default class Coanalysis extends Component {
  static contextType = RootContext;
  internals1 = "";
  internals2 = "";
  internals3 = "";
  coanalysis = {};
  performance = [];
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
      console.log(this.student);
      this.student.internals1.map((el) => {
        if (el.subject === this.state.subject)
          return (this.performance[0] = el.performance);
        else return "";
      });
      this.student.internals2.map((el) => {
        if (el.subject === this.state.subject)
          return (this.performance[1] = el.performance);
        else return "";
      });
      this.student.internals3.map((el) => {
        if (el.subject === this.state.subject)
          return (this.performance[2] = el.performance);
        else return "";
      });

      this.internals1 = Internals[0];
      this.internals2 = Internals[1];
      this.internals3 = Internals[2];
      console.log(this.internals1);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
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
