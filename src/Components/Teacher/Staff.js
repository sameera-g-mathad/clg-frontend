import React, { Component } from "react";
import { Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import auth from "./auth";
import "./../../App.css";

import Axios from "axios";
export default class Staff extends Component {
  img = "";
  state = {
    url: this.props.match.url,
    teacherid: JSON.parse(localStorage.getItem("id")),
    teacher: [],
    subjects: [],
    loading: true,
    subjectDetails: [],
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
      const { teacherid } = this.state;
      const res = await Axios.get("http://127.0.0.1:4000/staff", {
        headers: { teacherid },
      });
      const teacherRes = [res.data.staffDetails];
      const sub1Res = [res.data.subject1];
      const sub2Res = [res.data.subject2];
      let imgstr;
      const base64flag = "data:image/jpeg;base64,";
      const teacher = teacherRes.map((teacher) => {
        imgstr = this.arrayToImage(teacher.photo.data.data);
        this.img = base64flag + imgstr;
        return (
          <div key={teacher._id} className="h-full flex items-center flex-wrap">
            <img
              className="w-24 h-24 m-2 ml-4 rounded-full shadow "
              alt=""
              src={this.img}
            />
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-700 uppercase hover:underline">
                Name : {teacher.name}
              </p>
              <p className="text-lg font-semibold text-gray-700  hover:underline">
                EMAIL : {teacher.email}
              </p>
              <p className="text-lg font-semibold text-gray-700 uppercase hover:underline">
                dept : "{teacher.dept}"
              </p>
            </div>
          </div>
        );
      });
      const sub1 = sub1Res.map((subject) => {
        return (
          <div id={subject._id}>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SUBJECT : {subject.subjectName}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 uppercase hover:underline">
              SUBJECT-CODE : {subject.subjectCode}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              DEPARTMENT : {subject.dept}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SEMESTER : {subject.sem}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SECTION : '{subject.section}'-section
            </p>
          </div>
        );
      });
      const sub2 = sub2Res.map((subject) => {
        return (
          <div id={subject._id}>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SUBJECT : {subject.subjectName}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 uppercase hover:underline">
              SUBJECT-CODE : {subject.subjectCode}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              DEPARTMENT : {subject.dept}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SEMESTER : {subject.sem}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline">
              SECTION : '{subject.section}'-section
            </p>
          </div>
        );
      });
      this.setState({
        teacher: [...teacher],
        subjects: [...sub1, ...sub2],
        loading: false,
        subjectDetails: [...sub1Res, ...sub2Res],
      });
    } catch (err) {
      console.log(err);
    }
  }
  setsubjectDetails = (subject) => {
    sessionStorage.clear();
    return sessionStorage.setItem("subject", JSON.stringify(subject));
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
      <div className="teacher-container mx-4 ">
        <div className="teacher-details border hover:shadow-lg mt-4 bg-blue-200 rounded-lg ">
          <Button
            className="mx-4 float-right my-2"
            tag={Link}
            to="/"
            color="danger"
            onClick={() => {
              localStorage.clear();
              auth.logout();
            }}
          >
            Logout
          </Button>
          {this.state.teacher}
        </div>
        <div className="teacher-subject1  border-2 border-purple-500 bg-gray-200 mb-4  hover:shadow-lg rounded-lg  ">
          <p className="bg-purple-500 w-full rounded-b text-purple-800 tracking-widest font-semibold underline text-lg  uppercase  p-4">
            subject details:
          </p>
          <div className="p-4">
            {this.state.subjects[0]}
            <div className="flex justify-end ">
              <Button
                color="primary"
                outline
                tag={Link}
                to={{
                  pathname: `${this.state.url}/set-paper`,
                  state: { subject: this.state.subjectDetails[0] },
                }}
              >
                Set Paper
              </Button>
              <Button
                color="success"
                outline
                className="ml-4"
                onClick={() =>
                  this.setsubjectDetails(this.state.subjectDetails[0])
                }
                tag={Link}
                to={`${this.state.url}/students`}
              >
                Students
              </Button>
            </div>
          </div>
        </div>
        <div className="teacher-subject2 border-2 border-red-500 bg-gray-200  mb-4 hover:shadow-lg rounded-lg ">
          <p className="bg-red-500 rounded-b w-full text-red-800 tracking-widest font-semibold underline text-lg  uppercase  p-4">
            subject details:
          </p>
          <div className="p-4">
            {this.state.subjects[1]}
            <div className="flex justify-end ">
              <Button
                color="primary"
                outline
                tag={Link}
                to={{
                  pathname: `${this.state.url}/set-paper`,
                  state: { subject: this.state.subjectDetails[1] },
                }}
              >
                Set Paper
              </Button>
              <Button
                color="success"
                outline
                className="ml-4"
                onClick={() =>
                  this.setsubjectDetails(this.state.subjectDetails[1])
                }
                tag={Link}
                to={`${this.state.url}/students`}
              >
                Students
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
