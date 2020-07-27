import React, { Component } from "react";
import { Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import auth from "./auth";
import "./../../App.css";
import logo from "./../images/logo.png";
import image1 from "./../images/image1.jpg";
import Axios from "axios";
export default class Staff extends Component {
  img = "";
  state = {
    url: this.props.match.url,
    teacherToken: JSON.parse(sessionStorage.getItem("teacherToken")),
    teacherid: JSON.parse(sessionStorage.getItem("id")),
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
        headers: { teacherid, authorization: this.state.teacherToken },
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
              <p className="text-lg font-semibold text-white uppercase hover:underline">
                Name : {teacher.name}
              </p>
              <p className="text-lg font-semibold text-white  hover:underline">
                EMAIL : {teacher.email}
              </p>
              <p className="text-lg font-semibold text-white uppercase hover:underline">
                dept : "{teacher.dept}"
              </p>
            </div>
          </div>
        );
      });
      const sub1 = sub1Res.map((subject) => {
        return (
          <div id={subject._id}>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              SUBJECT : {subject.subjectName}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider uppercase hover:underline">
              SUBJECT-CODE : {subject.subjectCode}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              DEPARTMENT : {subject.dept}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              SEMESTER : {subject.sem}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              SECTION : '{subject.section}'-section
            </p>
          </div>
        );
      });
      const sub2 = sub2Res.map((subject) => {
        return (
          <div id={subject._id}>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize  hover:underline">
              SUBJECT : {subject.subjectName}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider uppercase hover:underline">
              SUBJECT-CODE : {subject.subjectCode}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              DEPARTMENT : {subject.dept}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
              SEMESTER : {subject.sem}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 tracking-wider capitalize hover:underline">
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
      console.log(err.response);
    }
  }
  setsubjectDetails = (subject) => {
    // sessionStorage.clear();
    return sessionStorage.setItem("subject", JSON.stringify(subject));
  };
  render() {
    if (this.state.loading)
      return (
        <div>
          <div className="flex justify-between  p-3">
            <span className="flex items-center">
              <img src={logo} alt="no logo" className="w-12 h-12" />
              <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
                gat website
              </span>
            </span>
            <Link
              className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
              to="/"
              onClick={() => sessionStorage.clear()}
            >
              logout
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Spinner
              color="primary"
              style={{ width: "100px", height: "100px" }}
              type="grow"
            />
            <h4 className="text-gray-500">Loading...</h4>
          </div>
        </div>
      );
    return (
      <div>
        <div className="flex justify-between items-center  px-3 pt-3">
          <span className="flex items-center">
            <img src={logo} alt="no logo" className="w-12 h-12" />
            <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              gat website
            </span>
          </span>
          <Link
            className="mx-2 text-black font-semibold capitalize hover:text-black hover:no-underline tracking-wider"
            to="/"
            onClick={() => {
              sessionStorage.clear();
              auth.logout();
            }}
          >
            logout
          </Link>
        </div>
        <div className="teacher-container mx-4 ">
          <div
            className="teacher-details  tracking-wider border hover:shadow-lg mt-4  rounded-lg "
            style={{
              backgroundImage: 'url("' + image1 + '")',
              backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {this.state.teacher}
          </div>
          <div className="teacher-subject1  bg-gray-100 mb-4  hover:shadow-lg rounded-lg  ">
            <p className="bg-blue-300 w-full rounded-lg text-gray-700 tracking-widest font-semibold  text-lg  uppercase  p-4">
              subject details:
            </p>
            <div className="p-4">
              {this.state.subjects[0]}
              <div className="flex justify-end tracking-wider">
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
          <div className="teacher-subject2  bg-gray-100  mb-4 hover:shadow-lg rounded-lg ">
            <p className="bg-green-400 rounded-lg w-full text-gray-700 tracking-widest font-semibold  text-lg  uppercase  p-4">
              subject details:
            </p>
            <div className="p-4">
              {this.state.subjects[1]}
              <div className="flex justify-end tracking-wider">
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
      </div>
    );
  }
}
