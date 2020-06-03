import React, { Component } from "react";
import "./../../App.css";
export default class SingleStudent extends Component {
  student = this.props.location.state;
  int2 = "";
  int3 = "";
  img = "";
  state = {
    internals1: this.student.internals1,
    internals2: this.student.internals2,
    internals3: this.student.internals3,
    display_details: [],
  };
  componentDidMount() {
    const result = this.state.internals1.map((el) => {
      this.state.internals2.map((sub) => {
        if (el.subject === sub.subject) return (this.int2 = sub.marks);
        else return "";
      });
      this.state.internals3.map((sub) => {
        if (el.subject === sub.subject) return (this.int3 = sub.marks);
        else return "";
      });

      return (
        <div
          key={el._id}
          className=" m-3 p-2  pl-3 bg-gray-200 rounded-lg border-b-4 hover:shadow-lg border-yellow-500"
        >
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline px-2">
            subject : {el.subject}
          </p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline px-2">
            sem : {el.subjectCode}
          </p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline px-2">
            sem : {el.sem}
          </p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline px-2"></p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline flex justify-between px-2 ">
            <span>internals 1</span>
            {el.marks < 0 ? (
              <span className="text-red-500 pr-8">'A'</span>
            ) : (
              <span className="pr-8">{el.marks}</span>
            )}
          </p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline  flex justify-between px-2">
            <span>internals 2</span>
            {this.int2 < 0 ? (
              <span className="text-red-500 pr-8">'A'</span>
            ) : (
              <span className="pr-8">
                {this.int2 === "" ? <span>'-'</span> : this.int2}
              </span>
            )}
          </p>
          <p className="capitalize text-lg text-gray-800 tracking-wider font-semibold hover:underline  flex justify-between px-2">
            <span>internals 3</span>
            {this.int3 < 0 ? (
              <span className="text-red-500 pr-8">'A'</span>
            ) : (
              <span className="pr-8">
                {this.int3 === "" ? <span>'-'</span> : this.int3}
              </span>
            )}
          </p>
        </div>
      );
    });
    this.setState({
      display_details: [...result],
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
    const imgstr = this.arraytoImage(this.student.photo.data.data);
    this.img = base64flag + imgstr;
    return (
      <div>
        <div className="p-2 py-4 mx-3 mt-2 border rounded-lg ">
          <div className="flex items-center flex-wrap">
            <img
              className="rounded-full w-32 ml-2 sm:mr-12"
              src={this.img}
              alt=""
            />
            <div className="ml-2">
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                name : {this.student.studentName}
              </p>
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                usn : {this.student.studentUsn}
              </p>
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                department : {this.student.dept}
              </p>
              <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                section : "{this.student.section}"
              </p>
            </div>
          </div>
        </div>
        <div className="studentdisplay-content">
          {this.state.display_details}
        </div>
      </div>
    );
  }
}
