import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Label, FormGroup, Input, Button, FormFeedback } from "reactstrap";
// eslint-disable-next-line
import Axios from "axios";
export default class PaperDetails extends Component {
  match = this.props.match.url;
  subjectDetails = this.props.history.location.state.subject;
  state = {
    subject: this.subjectDetails.subjectName,
    subjectCode: this.subjectDetails.subjectCode,
    sem: this.subjectDetails.sem,
    dept: this.subjectDetails.dept,
    section: this.subjectDetails.section,
    internals: "",
    questions: "",
    marks: "",
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
    // try {
    //   const { subject, subjectCode, dept, sem, section } = this.state;
    //   const res = await Axios.get("http://127.0.0.1:3000/staff/set-paper", {
    //     headers: { subject, subjectCode, dept, sem, section }
    //   });
    //   const found = res.data.found;
    //   const result = found.map(data => {
    //     return data.internals;
    //   });
    //   console.log(result);
    //   const neww = this.options.filter(option => {
    //     return result.map(value => {
    //       return value.localeCompare(option.value);
    //     });
    //   });
    //   console.log(neww);
    //   // this.options = this.options.filter(option);
    // } catch (err) {
    //   console.log(err.response);
    // }
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
  render() {
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
        <div className="flex justify-center">
          <div className=" border   w-1/2 rounded-lg hover:shadow-lg bg-gray-100 ">
            <p className="w-full bg-red-500 uppercase font-bold text-lg tracking-wide p-4 rounded-lg ">
              enter details
            </p>
            <FormGroup className="mx-8 my-2">
              <Label for="subject" className="font-bold">
                Subject:
              </Label>
              <Input id="subject" value={this.state.subject} readOnly={true} />
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
              <FormFeedback className="capitalize">
                Questions must be even number
              </FormFeedback>
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
              <FormFeedback className="capitalize">
                marks must be multiple of 10
              </FormFeedback>
            </FormGroup>

            <FormGroup className="mt-2 flex justify-center">
              <Button
                className="px-4 py-2"
                tag={Link}
                to={{
                  pathname: `${this.match}/questions`,
                  state: this.state,
                }}
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
