import React, { Component } from "react";
import OddQuestion from "./OddQuestions";
import EvenQuestion from "./EvenQuestion";
import { Button, Alert } from "reactstrap";
import "./../../App.css";
import axios from "axios";
import { GoAlert } from "react-icons/go";
import { RootContext } from "./../../RContext";
import logo from "./../images/logo.png";
export default class Questions extends Component {
  static contextType = RootContext;
  location = this.props.location.state;
  arr = [];

  // paper=[]
  state = {
    teacherId: JSON.parse(sessionStorage.getItem("id")),
    teacherToken: JSON.parse(sessionStorage.getItem("teacherToken")),
    subject: this.location.subject,
    subjectCode: this.location.subjectCode,
    dept: this.location.dept,
    sem: this.location.sem,
    section: this.location.section,
    internals: this.location.internals,
    questions: this.location.questions,
    marks: this.location.marks,
    comparemarks: [],
    questionpaper: [],
    questionmarks: [],
    url: this.context.url,
  };
  submit = async () => {
    try {
      const subject = this.state.subject;
      const subjectCode = this.state.subjectCode;
      const internals = this.state.internals;
      const questions = this.state.questions;
      const marks = this.state.marks;
      const teacherId = this.state.teacherId;
      const { dept, sem, section } = this.state;
      const questionpaper = this.state.questionpaper.filter(
        (el) => el !== null
      );
      console.log(questionpaper);
      const res = await axios.post(
        `${this.state.url}/staff/set-paper/questions`,
        {
          subject,
          subjectCode,
          dept,
          sem,
          section,
          teacherId,
          internals,
          questions,
          marks,
          questionpaper,
        },
        { headers: { authorization: this.state.teacherToken } }
      );
      console.log(res);
      if (res.status === 200 && res.data.status === "success")
        this.props.history.push("/staff");
    } catch (err) {
      console.log(err.response);
    }
  };
  render() {
    for (let i = 1; i <= this.state.questions; i++) {
      i % 2 === 0
        ? this.arr.push(
            <EvenQuestion
              key={i}
              number={i}
              value={this.state.questionmarks}
              render={({ question, subquestions, co }) => {
                if (co === "") {
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    subquestions,
                  };
                } else if (subquestions.length === 0) {
                  console.log("working");
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    co,
                  };
                } else {
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    co,
                    subquestions,
                  };
                }
                console.log(this.state.questionpaper[i]);
                this.setState({
                  questionpaper: this.state.questionpaper,
                });
              }}
            />
          )
        : this.arr.push(
            <OddQuestion
              key={i}
              number={i}
              render={({ question, subquestions, co }) => {
                if (co === "")
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    subquestions,
                  };
                else if (subquestions.length === 0)
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    co,
                  };
                else {
                  // eslint-disable-next-line
                  this.state.questionpaper[i] = {
                    questionNumber: i,
                    question,
                    co,
                    subquestions,
                  };
                }
                console.log(this.state.questionpaper[i]);
                // eslint-disable-next-line
                this.state.comparemarks[i] = question;
                // eslint-disable-next-line
                this.state.questionmarks[i + 1] = question;
                this.setState({
                  questionpaper: this.state.questionpaper,
                });
              }}
            />
          );
    }
    const newarray = this.state.comparemarks.filter((el) => el > 0);
    let sum = 0;
    for (let i = 0; i < newarray.length; i++) {
      sum = sum + newarray[i];
    }
    let disable;
    sum !== this.state.marks && sum !== 0
      ? (disable = true)
      : (disable = false);
    return (
      <div className="m-4">
        <span className="flex items-center ">
          <img src={logo} alt="no logo" className="w-12 h-12" />
          <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
            gat website
          </span>
        </span>
        <div className="questions-container border m-4 rounded-lg bg-gray-200 shadow">
          <div className="uppercase tracking-wide font-bold text-gray-700">
            Subject:"{this.state.subject}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            Subject-Code:"{this.state.subjectCode}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            department:"{this.state.dept}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            semester:"{this.state.sem}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            section:"{this.state.section}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            Internals:"{this.state.internals}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            Questions:"{this.state.questions}"
          </div>
          <div className="uppercase tracking-wide font-bold text-gray-700">
            Total Marks:"{this.state.marks}"
          </div>
        </div>

        {this.arr}
        {disable === true ? (
          <Alert className="flex  " color="danger">
            <span className="flex items-center uppercase font-bold">
              <GoAlert />
              Warning
            </span>
            :Entered marks does not match Allocated marks
          </Alert>
        ) : (
          ""
        )}
        <div className="flex justify-center">
          <Button
            color="primary"
            onClick={this.submit}
            disabled={disable}
            className="px-4 py-2 capitalize tracking-wider"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
