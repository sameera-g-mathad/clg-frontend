import React, { Component } from "react";
import Axios from "axios";
import { Input, Alert } from "reactstrap";
import "./../../App.css";
import { FaLightbulb } from "react-icons/fa";
import { RootContext } from "./../../RContext";
export default class Internals extends Component {
  static contextType = RootContext;
  details = this.props.location.state;
  match = this.props.match.path;
  color = "";
  state = {
    url: this.context.url,
    questionpaper: [],
    performance: "",
    allocated: 0,
    scored: 0,
  };
  async componentDidMount() {
    try {
      const { subject, subjectCode, sem, section, internal } = this.details;
      const res = await Axios.get(`${this.state.url}${this.match}`, {
        headers: { subject, subjectCode, sem, section, internal },
      });
      const studentperformance = this.details.internals.filter((el) => {
        if (el.subject === subject) return el;
        else return "";
      });
      const fperformance = studentperformance[0];
      const performance = fperformance.performance;
      if (internal === "Internal 1") this.color = "indigo-400";
      if (internal === "Internal 2") this.color = "green-400";
      if (internal === "Internal 3") this.color = "orange-400";
      const paper = res.data.found;
      const questionpaper = paper.questionpaper;
      const questions = questionpaper.map((que, index) => {
        return (
          <div
            key={que._id}
            className={`internals-container sm:border-l-4 sm:border-b-0 border-b-4  border-${this.color}  m-3 p-2 rounded-lg bg-gray-200 hover:shadow-lg`}
          >
            <div id={`question-container${index}`}>
              <span className="flex items-center flex-wrap  capitalize font-semibold text-lg text-gray-700">
                <span className=" mr-2">{que.questionNumber}.</span>
                Marks scored for the question:{" "}
                <span className="w-64 ml-2 flex justify-between items-center">
                  <Input
                    bsSize="sm"
                    className="mx-2"
                    value={performance[index].question}
                    readOnly={true}
                  />

                  <span className="mx-2 text-3xl">/</span>
                  <Input
                    bsSize="sm"
                    readOnly={true}
                    value={que.question}
                    className="mx-2"
                  />
                </span>
              </span>
              <hr />
              {que.hasOwnProperty("co") ? (
                <span className="w-24 text-lg text-gray-700 ml-2 font-semibold uppercase tracking-widest flex items-center">
                  co: <Input readOnly={true} value={que.co} />
                </span>
              ) : (
                ""
              )}

              <span>
                {que.subquestions.length >= 1 ? (
                  que.subquestions.map((sub, i) => {
                    const alpha = ["a", "b", "c"];

                    return (
                      <span
                        key={i}
                        className="w-full flex flex-wrap  items-center"
                      >
                        <span className="font-semibold text-gray-700 mx-2">
                          {alpha[i]} :
                        </span>
                        <span className=" font-semibold capitalize ">
                          marks obtained for subquestion :
                        </span>
                        <span className="w-64 ml-3 flex items-center">
                          <Input
                            bsSize="sm"
                            maxLength={2}
                            className="mx-2"
                            readOnly={true}
                            value={
                              performance[index].attended === true
                                ? performance[index].subquestions[i]
                                : 0
                            }
                          />
                          <span className="mx-2 text-3xl">/</span>
                          <Input
                            bsSize="sm"
                            readOnly={true}
                            value={sub.subquestions}
                            className="mx-2"
                          />
                          {sub.hasOwnProperty("subco") ? (
                            <span className="ml-2 w-64">
                              <Input
                                value={sub.subco}
                                readOnly={true}
                                bsSize="sm"
                              />
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </span>
                    );
                  })
                ) : (
                  <div>
                    <br />

                    <Alert className="flex flex-wrap" color="warning">
                      <span className="flex items-center font-bold uppercase">
                        <FaLightbulb className="mr-2" />
                        Note :
                      </span>
                      <span className="capitalize">
                        there are no sub-Questions.
                      </span>
                    </Alert>
                    <br />
                  </div>
                )}
              </span>
            </div>
          </div>
        );
      });
      this.setState({
        questionpaper: [...questions],
        allocated: paper.marks,
        scored: fperformance.marks,
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  arraytoImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => (binary += String.fromCharCode(el)));
    return window.btoa(binary);
  };
  render() {
    const base64flag = "data:image/jpeg;base64,";
    const imgstr = this.arraytoImage(this.details.student.photo.data.data);
    this.img = base64flag + imgstr;
    return (
      <div>
        <div
          className={`p-2 py-4 mx-3 mt-2 shadow bg-gray-700 border-2  border-${this.color} rounded-lg `}
        >
          <div className="flex items-center flex-wrap">
            <img
              className="rounded-full w-32 ml-2 sm:mr-12"
              src={this.img}
              alt=""
            />
            <div className="ml-2">
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold hover:underline`}
              >
                name : {this.details.student.studentName}
              </p>
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold hover:underline`}
              >
                usn : {this.details.student.studentUsn}
              </p>
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold hover:underline`}
              >
                department : {this.details.student.dept}
              </p>
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold hover:underline`}
              >
                section : "{this.details.student.section}"
              </p>
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold hover:underline`}
              >
                internals : {this.details.internal}
              </p>
              <p
                className={`capitalize text-lg text-${this.color} tracking-widest font-semibold `}
              >
                Marks obtained:
                <span className="w-48  flex justify-between items-center">
                  <Input
                    bsSize="sm"
                    className="mx-2 pl-4"
                    readOnly={true}
                    value={this.state.scored}
                  />
                  <span className="mx-2 text-3xl">/</span>
                  <Input
                    bsSize="sm"
                    value={this.state.allocated}
                    readOnly={true}
                    className="mx-2 pl-4 "
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>{this.state.questionpaper}</div>
      </div>
    );
  }
}
