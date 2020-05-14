import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button, FormGroup } from "reactstrap";
import Axios from "axios";
import "./../../App.css";
import { FaSearch } from "react-icons/fa";
export default class StudentT extends Component {
  subject = JSON.parse(sessionStorage.getItem("subject"));
  img = "";
  internals1 = "";
  internals2 = "";
  internals3 = "";
  state = {
    loading: true,
    students: [],
    search: "",
  };
  arrayToImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => {
      binary += String.fromCharCode(el);
    });
    return window.btoa(binary);
  };
  async componentDidMount() {
    try {
      const { dept, sem, section } = this.subject;
      const res = await Axios.get("http://127.0.0.1:4000/staff/students", {
        headers: { dept, sem, section },
      });
      console.log(res);
      const result = res.data.Students;
      const base64flag = "data:image/jpeg;base64,";
      let imgstr;
      const students = result.map((student) => {
        imgstr = this.arrayToImage(student.photo.data.data);
        this.img = base64flag + imgstr;
        return (
          <div
            key={student._id}
            name={student.studentName}
            year={student.year}
            className=" m-3 p-2 bg-gray-200 rounded-lg border-b-4 hover:shadow-lg border-blue-500"
          >
            <div className="p-2 flex  justify-between ">
              <div className="py-2">
                <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  name : {student.studentName}
                </p>
                <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  usn : {student.studentUsn}
                </p>
                <p className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  department : {student.dept}
                </p>
              </div>
              <div>
                <img
                  className=" w-24 h-24 mb-4 rounded-full shadow border-2"
                  src={this.img}
                  alt="no"
                />
              </div>
            </div>
            <hr />
            <div className="flex flex-col justify-evenly">
              <div className="p-2 internals-content">
                <span className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  internals 1 :
                </span>
                {student.internals1.map((sub) => {
                  // eslint-disable-next-line
                  if (sub.subject === this.subject.subjectName) {
                    // eslint-disable-next-line
                    this.internals1 = parseInt(sub.marks);
                    return "";
                  } else return "";
                })}
                <span>
                  {this.internals1 !== "" ? (
                    this.internals1 <= 0 ? (
                      <span className="font-semibold text-red-500">Ab</span>
                    ) : (
                      <span className="font-semibold">{this.internals1}</span>
                    )
                  ) : (
                    "-"
                  )}
                </span>

                <Button
                  tag={Link}
                  disabled={this.internals1 !== "" ? true : false}
                  to={{
                    pathname: `/staff/students/internals1/${student.studentUsn}`,
                    state: {
                      name: student.studentName,
                      usn: student.studentUsn,
                      subject: this.subject.subjectName,
                      section: student.section,
                      sem: student.sem,
                      dept: student.dept,
                      photo: student.photo,
                    },
                  }}
                  color="primary"
                  outline
                  size="sm"
                  className=" px-3"
                >
                  Add
                </Button>
                {(this.internals1 = "")}
              </div>
              <div className="p-2  internals-content">
                <span className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  internals 2 :
                </span>
                {student.internals2.map((sub) => {
                  // eslint-disable-next-line
                  if (sub.subject === this.subject.subjectName) {
                    // eslint-disable-next-line
                    this.internals2 = parseInt(sub.marks);
                    return "";
                  } else return "";
                })}
                <span>
                  {this.internals2 !== "" ? (
                    this.internals2 <= 0 ? (
                      <span className="font-semibold text-red-500">Ab</span>
                    ) : (
                      <span className="font-semibold">{this.internals2}</span>
                    )
                  ) : (
                    "-"
                  )}
                </span>
                <Button
                  color="primary"
                  outline
                  disabled={this.internals2 !== "" ? true : false}
                  size="sm"
                  tag={Link}
                  to={{
                    pathname: `/staff/students/internals2/${student.studentUsn}`,
                    state: {
                      name: student.studentName,
                      usn: student.studentUsn,
                      subject: this.subject.subjectName,
                      section: student.section,
                      sem: student.sem,
                      dept: student.dept,
                      photo: student.photo,
                    },
                  }}
                  className=" px-3"
                >
                  Add
                </Button>
              </div>
              <div className="p-2  internals-content">
                <span className="capitalize text-lg text-gray-800 font-semibold hover:underline">
                  internals 3 :
                </span>
                {student.internals3.map((sub) => {
                  // eslint-disable-next-line
                  if (sub.subject === this.subject.subjectName) {
                    // eslint-disable-next-line
                    this.internals3 = parseInt(sub.marks);
                    return "";
                  } else return "";
                })}
                <span>
                  {this.internals3 !== "" ? (
                    this.internals3 <= 0 ? (
                      <span className="font-semibold text-red-500">Ab</span>
                    ) : (
                      <span className="font-semibold">{this.internals3}</span>
                    )
                  ) : (
                    "-"
                  )}
                </span>
                <Button
                  color="primary"
                  disabled={this.internals3 !== "" ? true : false}
                  outline
                  size="sm"
                  tag={Link}
                  to={{
                    pathname: `/staff/students/internals3/${student.studentUsn}`,
                    state: {
                      name: student.studentName,
                      usn: student.studentUsn,
                      subject: this.subject.subjectName,
                      section: student.section,
                      sem: student.sem,
                      dept: student.dept,
                      photo: student.photo,
                    },
                  }}
                  className=" px-3"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        );
      });
      this.setState({
        students: [...students],
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }
  searchChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    if (this.state.loading)
      return (
        <div className="flex flex-col justify-center items-center">
          <Spinner
            color="primary"
            style={{ width: "100px", height: "100px" }}
            type="grow"
          />
          <h4 className="text-gray-500">Loading...</h4>
        </div>
      );
    return (
      <div>
        <div className="flex justify-between border rounded-lg p-3">
          <div className="flex justify-center mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wider">
            clg website
          </div>
          <Link
            className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="/staff"
          >
            Back
          </Link>
        </div>
        <div className="flex justify-center m-4">
          <FormGroup className="border-2 p-1 rounded-lg border-blue-500 w-64 text-blue-500 flex items-center">
            <FaSearch className="mr-2" />
            <input
              className="focus:outline-none"
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search"
              value={this.state.search}
              onChange={this.searchChange}
            />
          </FormGroup>
        </div>
        <div className="staff-students">
          {this.state.students.filter((student) => {
            if (this.state.search !== "")
              return student.props.name.startsWith(this.state.search);
            else return student;
          })}
        </div>
      </div>
    );
  }
}
