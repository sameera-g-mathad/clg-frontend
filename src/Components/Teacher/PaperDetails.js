import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Label, FormGroup, Input, Button, FormText } from "reactstrap";
import { RootContext } from "./../../RContext";
import Axios from "axios";
export default class PaperDetails extends Component {
  static contextType = RootContext;
  match = this.props.match.url;
  subjectDetails = this.props.history.location.state.subject;
  state = {
    teacherId: JSON.parse(sessionStorage.getItem("id")),
    teacherToken: JSON.parse(sessionStorage.getItem("teacherToken")),
    subject: this.subjectDetails.subjectName,
    subjectCode: this.subjectDetails.subjectCode,
    sem: this.subjectDetails.sem,
    dept: this.subjectDetails.dept,
    section: this.subjectDetails.section,
    internals: "",
    questions: "",
    marks: "",
    url: this.context.url,
    wInfo: false,
    wIngomsg: "",
  };
  options = [
    {
      label: "Internal 1",
      value: "Internal 1",
    },
    {
      label: "Internal 2",
      value: "Internal 2",
    },
    {
      label: "Internal 3",
      value: "Internal 3",
    },
  ];
  async componentDidMount() {
    try {
      const {
        teacherId,
        subject,
        subjectCode,
        dept,
        sem,
        section,
      } = this.state;
      const res = await Axios.get(`${this.state.url}/staff/set-paper`, {
        headers: {
          teacherId,
          subject,
          subjectCode,
          dept,
          sem,
          section,
          authorization: this.state.teacherToken,
        },
      });

      const internals = res.data.found.map((internal) => {
        return internal.internals;
      });
      this.options.map((el) => {
        if (internals.includes(el.value)) return (el.isDisabled = true);
        else return el;
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  selectChange = (e) => {
    const value = e.value;
    this.setState({
      internals: value,
    });
  };
  questionsChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: parseInt(value) || "",
    });
  };
  marksChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: parseInt(value) || "",
    });
  };
  checkMarks = () => {
    if (
      this.state.internals === "" ||
      this.state.marks === "" ||
      this.state.questions === ""
    ) {
      return this.setState({
        wInfo: true,
        wIngomsg: "Enter the fields present",
      });
    }
    if (this.state.marks % 2 === 0 && this.state.questions % 2 === 0) {
      this.props.history.push({
        pathname: `${this.match}/questions`,
        state: this.state,
      });
    } else {
      this.setState({
        wInfo: true,
        wIngomsg: "Entered questions and marks should be a even number",
      });
    }
  };
  render() {
    return (
      <div>
        <div className="flex justify-between  p-3">
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
        <div className="flex justify-center">
          <div className=" border  sm:w-1/2 w-full rounded-lg hover:shadow-lg bg-gray-100 ">
            <p className="w-full bg-red-500 uppercase font-bold text-lg tracking-wide p-4 rounded-lg ">
              enter details
            </p>
            <FormGroup className="mx-8 my-2">
              <Label for="subject" className="font-bold">
                Subject:
              </Label>
              <Input
                className="capitalize"
                id="subject"
                value={this.state.subject}
                readOnly={true}
              />
            </FormGroup>

            <FormGroup className="mx-8 my-2">
              <Label for="sub-code" className="font-bold">
                Subject-Code:
              </Label>
              <Input
                id="sub-code"
                value={this.state.subjectCode}
                readOnly={true}
              />
            </FormGroup>

            <FormGroup className="mx-8 my-2">
              <Label for="dept" className="font-bold">
                department:
              </Label>
              <Input id="dept" value={this.state.dept} readOnly={true} />
            </FormGroup>
            <FormGroup className="mx-8 my-2">
              <Label for="semester" className="font-bold">
                semester:
              </Label>
              <Input id="semester" value={this.state.sem} readOnly={true} />
            </FormGroup>
            <FormGroup className="mx-8 my-2">
              <Label for="section" className="font-bold">
                section:
              </Label>
              <Input id="section" value={this.state.section} readOnly={true} />
            </FormGroup>
            <FormGroup className="mx-8 my-2">
              <Label for="internals" className="font-bold">
                Internals:
              </Label>
              <Select
                className="font-semibold"
                id="internals"
                options={this.options}
                onChange={this.selectChange}
              />
            </FormGroup>

            <FormGroup className="mx-8 my-2">
              <Label for="questions" className="font-bold">
                Questions:
              </Label>
              <Input
                id="questions"
                name="questions"
                value={this.state.questions}
                onChange={this.questionsChange}
                autoComplete="off"
                placeholder="Ex :8"
                maxLength={2}
              />
            </FormGroup>

            <FormGroup className="mx-8 my-2">
              <Label for="marks" className="font-bold">
                Marks:
              </Label>
              <Input
                id="marks"
                name="marks"
                onChange={this.marksChange}
                autoComplete="off"
                placeholder="Ex :30"
                maxLength={2}
              />
            </FormGroup>
            <FormGroup className="flex justify-center flex-wrap">
              <FormText
                style={{ display: this.state.wInfo ? "block" : "none" }}
                color="danger"
                className="capitalize font-semibold"
              >
                {this.state.wIngomsg}
              </FormText>
            </FormGroup>
            <FormGroup className="mt-2  flex justify-center">
              <Button
                className="px-4 py-2 tracking-wider"
                onClick={this.checkMarks}
                color="success"
              >
                Next
              </Button>
            </FormGroup>
          </div>
        </div>
      </div>
      // <div className="details-container">
      //   <div className="details-back border"></div>
      //   <div className="details-content border">

      //   </div>
      // </div>
    );
  }
}
