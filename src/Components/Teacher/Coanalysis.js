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
    cofinal: "",
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
      console.log(this.performance, this.internals1, this.internals2);
      if (this.internals1.marks > 0) {
        this.performance[0].map((el, index) => {
          if (el.attended === true) {
            if (this.internals1.questionpaper[index].hasOwnProperty("co")) {
              if (
                this.coanalysis.hasOwnProperty([
                  this.internals1.questionpaper[index].co,
                ])
              )
                return this.coanalysis[
                  this.internals1.questionpaper[index].co
                ].push({
                  assigned: this.internals1.questionpaper[index].question,
                  scored: el.question,
                  number: index + 1,
                  internals: this.internals1.internals,
                });
              else
                return (this.coanalysis[
                  this.internals1.questionpaper[index].co
                ] = [
                  {
                    assigned: this.internals1.questionpaper[index].question,
                    scored: el.question,
                    number: index + 1,
                    internals: this.internals1.internals,
                  },
                ]);
            } else
              return this.internals1.questionpaper[index].subquestions.map(
                (sub, i) => {
                  if (sub.hasOwnProperty("subco")) {
                    if (this.coanalysis.hasOwnProperty(sub.subco))
                      return this.coanalysis[sub.subco].push({
                        assigned: sub.subquestions,
                        scored: el.subquestions[i],
                        number: index + 1,
                        sub_number: i + 1,
                        internals: this.internals1.internals,
                      });
                    else
                      return (this.coanalysis[sub.subco] = [
                        {
                          assigned: sub.subquestions,
                          scored: el.subquestions[i],
                          number: index + 1,
                          sub_number: i + 1,
                          internals: this.internals2.internals,
                        },
                      ]);
                  } else return "";
                }
              );
          } else return "";
        });
      }
      if (this.internals2.marks > 0) {
        this.performance[1].map((el, index) => {
          if (el.attended === true) {
            if (this.internals2.questionpaper[index].hasOwnProperty("co")) {
              if (
                this.coanalysis.hasOwnProperty([
                  this.internals2.questionpaper[index].co,
                ])
              )
                return this.coanalysis[
                  this.internals2.questionpaper[index].co
                ].push({
                  assigned: this.internals2.questionpaper[index].question,
                  scored: el.question,
                  number: index + 1,
                  internals: this.internals2.internals,
                });
              else
                return (this.coanalysis[
                  this.internals2.questionpaper[index].co
                ] = [
                  {
                    assigned: this.internals2.questionpaper[index].question,
                    scored: el.question,
                    number: index + 1,
                    internals: this.internals2.internals,
                  },
                ]);
            } else
              return this.internals2.questionpaper[index].subquestions.map(
                (sub, i) => {
                  if (sub.hasOwnProperty("subco")) {
                    if (this.coanalysis.hasOwnProperty(sub.subco))
                      return this.coanalysis[sub.subco].push({
                        assigned: sub.subquestions,
                        scored: el.subquestions[i],
                        number: index + 1,
                        sub_number: i + 1,
                        internals: this.internals2.internals,
                      });
                    else
                      return (this.coanalysis[sub.subco] = [
                        {
                          assigned: sub.subquestions,
                          scored: el.subquestions[i],
                          number: index + 1,
                          sub_number: i + 1,
                          internals: this.internals2.internals,
                        },
                      ]);
                  } else return "";
                }
              );
          } else return "";
        });
      }
      if (this.internals3.marks > 0) {
        this.performance[2].map((el, index) => {
          if (el.attended === true) {
            if (this.internals3.questionpaper[index].hasOwnProperty("co")) {
              if (
                this.coanalysis.hasOwnProperty([
                  this.internals3.questionpaper[index].co,
                ])
              )
                return this.coanalysis[
                  this.internals3.questionpaper[index].co
                ].push({
                  assigned: this.internals3.questionpaper[index].question,
                  scored: el.question,
                  number: index + 1,
                  internals: this.internals3.internals,
                });
              else
                return (this.coanalysis[
                  this.internals3.questionpaper[index].co
                ] = [
                  {
                    assigned: this.internals3.questionpaper[index].question,
                    scored: el.question,
                    number: index + 1,
                    internals: this.internals3.internals,
                  },
                ]);
            } else
              return this.internals3.questionpaper[index].subquestions.map(
                (sub, i) => {
                  if (sub.hasOwnProperty("subco")) {
                    if (this.coanalysis.hasOwnProperty(sub.subco))
                      return this.coanalysis[sub.subco].push({
                        assigned: sub.subquestions,
                        scored: el.subquestions[i],
                        number: index + 1,
                        sub_number: i + 1,
                        internals: this.internals3.internals,
                      });
                    else
                      return (this.coanalysis[sub.subco] = [
                        {
                          assigned: sub.subquestions,
                          scored: el.subquestions[i],
                          number: index + 1,
                          sub_number: i + 1,
                          internals: this.internals3.internals,
                        },
                      ]);
                  } else return "";
                }
              );
          } else return "";
        });
      }
      console.log(this.coanalysis);
      const cofinal = Object.keys(this.coanalysis).map((el, i) => {
        let assignedTotal = 0,
          scoredTotal = 0;
        const alpha = ["a", "b", "c"];
        return (
          <div
            key={i}
            className="m-4 border rounded-lg shadow-sm px-4 bg-gray-200"
          >
            <span className="text-gray-700 text-2xl font-bold  tracking-wider">
              {el} :
            </span>
            {this.coanalysis[el].map((co, si) => {
              assignedTotal = assignedTotal + co.assigned;
              scoredTotal = scoredTotal + co.scored;
              return (
                <div key={`${i}${si}`} className="px-2 flex flex-col">
                  <span className="text-xl font-semibold py-2 tracking-wide underline italic text-indigo-600">
                    {co.internals} :
                  </span>
                  <span className="px-2 py-1 capitalize tracking-wide font-medium text-green-600">
                    Question : {co.number}
                    {co.hasOwnProperty("sub_number")
                      ? alpha[co.sub_number]
                      : ""}
                  </span>

                  <span className="px-2 py-1 capitalize tracking-wide font-medium text-yellow-600">
                    assigned : {co.assigned}
                  </span>
                  <span className="px-2 py-1 capitalize tracking-wide font-medium text-red-600">
                    scored : {co.scored}
                  </span>
                </div>
              );
            })}
            <h5 className="py-2 tracking-wider text-blue-700">
              Total Performace = {scoredTotal} / {assignedTotal}
            </h5>
          </div>
        );
      });
      this.setState({
        cofinal: [...cofinal],
      });
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
        {this.state.cofinal}
      </div>
    );
  }
}
