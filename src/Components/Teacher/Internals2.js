import React, { Component } from "react";
import Axios from "axios";
import {
  Input,
  Alert,
  Button,
  FormGroup,
  Label,
  CustomInput,
  FormText,
  Spinner,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FaLightbulb } from "react-icons/fa";
import "./../../App.css";
import { RootContext } from "./../../RContext";
//import error from "./error.png";
import { Link } from "react-router-dom";
export default class Internals2 extends Component {
  static contextType = RootContext;
  location = this.props.history.location.state;
  subarr = [];
  questionarr = [];
  marks = [];
  img = "";
  state = {
    teacherid: JSON.parse(sessionStorage.getItem("id")),
    teacherToken: JSON.parse(sessionStorage.getItem("teacherToken")),
    section: this.location.section,
    sem: this.location.sem,
    dept: this.location.dept,
    subject: this.location.subject,
    subjectCode: "",
    internals: "Internal 2",
    usn: this.location.usn,
    name: this.location.name,
    photo: this.location.photo,
    questionpaper: [],
    allocatedMarks: 0,
    marks: 0,
    url: this.context.url,
    loading: true,
    failed: false,
    failedmsg: "",
    disabled: false,
    modalOpen: false,
    checked: false,
    performance: [
      {
        question: 0,
      },
    ],
  };
  questionChange = (e, index, question) => {
    const value = parseInt(e.target.value) || "" || 0;
    let sum = 0;
    // eslint-disable-next-line
    if (value <= question) {
      // eslint-disable-next-line
      this.state.performance[index] = {
        question: value,
        attended: true,
      };
      console.log(this.state.performance);
      this.questionarr.splice(index, 1, value);
    } else e.target.value = "";
    if (index % 2 !== 0) {
      if (this.questionarr[index] >= this.questionarr[index - 1]) {
        this.marks.splice(index / 2, 1, this.questionarr[index]);
      } else {
        this.marks.splice(index / 2, 1, this.questionarr[index - 1]);
      }
      for (let i = 0; i < this.marks.length; i++) {
        sum = sum + this.marks[i];
      }
      this.setState({
        marks: sum,
      });
    }
  };
  subChange = (e, index, i, sub) => {
    const value = parseInt(e.target.value) || "" || 0;
    let sum = 0;
    if (value <= sub && value !== "") {
      this.subarr[index].splice(i, 1, value);
      console.log(this.subarr);
      for (let i = 0; i < this.subarr[index].length; i++) {
        sum = sum + this.subarr[index][i];
      }
      if (sum <= this.state.performance[index].question)
        // eslint-disable-next-line
        this.state.performance[index] = {
          question: this.state.performance[index].question,
          attended: true,
          subquestions: [...this.subarr[index]],
        };
      else e.target.value = "";
      console.log(this.state.performance);
    } else {
      e.target.value = "";
      this.subarr[index].splice(i, 1);
    }

    if (sum !== this.state.performance[index].question) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  };
  notAttended = (e, index) => {
    const checked = e.target.checked;
    let sum = 0;
    if (checked === true) {
      // eslint-disable-next-line
      this.state.performance[index] = {
        question: 0,
        attended: false,
      };
      this.questionarr.splice(index, 1, 0);

      if (this.questionarr[index] >= this.questionarr[index - 1]) {
        this.marks.splice(index / 2, 1, this.questionarr[index]);
      } else {
        this.marks.splice(index / 2, 1, this.questionarr[index - 1]);
      }
      if (index === 0) {
        this.marks.splice(index / 2, 1, 0);
      }
      for (let i = 0; i < this.marks.length; i++) {
        sum = sum + this.marks[i];
      }
      this.setState({
        marks: sum,
      });
      document.getElementById(
        `question-container${index}`
      ).style.pointerEvents = "none";
    } else {
      document.getElementById(
        `question-container${index}`
      ).style.pointerEvents = "auto";
    }
  };
  submit = async (e) => {
    try {
      e.preventDefault();
      console.log(this.state.performance);
      const { subject, subjectCode, sem, performance, marks } = this.state;
      const res = await Axios.patch(
        `${this.state.url}/staff/students/internals2/${this.state.usn}`,
        { internals2: { subject, subjectCode, sem, performance, marks } },
        { headers: { authorization: this.state.teacherToken } }
      );
      console.log(res);
      if (res.status === 200) {
        this.props.history.push({ pathname: "/staff/students" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  absentSubmit = async () => {
    try {
      const subject = this.state.subject;
      const marks = -1;
      const sem = this.state.sem;
      const subjectCode = this.state.subjectCode;
      const res = await Axios.patch(
        `${this.state.url}/staff/students/internals2/${this.state.usn}`,
        { internals2: { subject, subjectCode, sem, marks } },
        { headers: { authorization: this.state.teacherToken } }
      );
      console.log(res);
      if (res.status === 200) {
        this.props.history.push({ pathname: "/staff/students" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  async componentDidMount() {
    try {
      const { teacherid, subject, sem, section, dept, internals } = this.state;
      const res = await Axios.get(
        `${this.state.url}/staff/students/internals2/${this.state.usn}`,
        {
          headers: {
            teacherid,
            subject,
            sem,
            section,
            dept,
            internals,
            authorization: this.state.teacherToken,
          },
        }
      );

      const paper = res.data.found;
      console.log(paper);
      this.setState({
        allocatedMarks: paper.marks,
        subjectCode: paper.subjectCode,
      });
      const questionpaper = paper.questionpaper;

      const questions = questionpaper.map((que, index) => {
        return (
          <div
            key={que._id}
            className="internals-container sm:border-l-4 sm:border-b-0 border-b-4  border-blue-500  m-4 p-2 rounded-lg bg-gray-200 hover:shadow-lg"
          >
            <FormGroup className="flex">
              <Label className="mr-4" for={`not-attended${index}`}>
                Not attended ?
              </Label>
              <CustomInput
                id={`not-attended${index}`}
                onChange={(e) => this.notAttended(e, index)}
                type="checkbox"
              />
              <FormText inline={false}>
                Do not enter the marks if checkbox is clicked
              </FormText>
            </FormGroup>
            <div id={`question-container${index}`}>
              <span className="flex items-center flex-wrap  capitalize font-semibold text-lg text-gray-700">
                <span className=" mr-2">{que.questionNumber}.</span>
                Marks scored for the question:{" "}
                {this.questionarr.splice(index, 0, 0)}
                <span className="w-64 ml-2 flex justify-between items-center">
                  <Input
                    bsSize="sm"
                    className="mx-2"
                    maxLength={2}
                    onChange={(e) => {
                      this.questionChange(e, index, que.question);
                    }}
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
                    this.subarr[index] = [0];
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
                            onChange={(e) =>
                              this.subChange(e, index, i, sub.subquestions)
                            }
                            required={true}
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
        loading: false,
      });
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({
          loading: false,
          failed: true,
          failedmsg: err.response.data.message,
        });
      }
    }
  }
  arrayToImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => {
      binary += String.fromCharCode(el);
    });
    return window.btoa(binary);
  };
  render() {
    let imgstr = "";
    const base64flag = "data:image/jpeg;base64,";
    imgstr = this.arrayToImage(this.state.photo.data.data);
    this.img = base64flag + imgstr;
    if (this.state.loading) {
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
    }
    if (this.state.failed) {
      return (
        <div className="flex flex-col justify-center items-center">
          <img src="" alt="" />
          <p className="capitalize text-gray-800  text-lg font-semibold">
            {this.state.failedmsg}
          </p>
          <span className="capitalize text-gray-800 font-semibold">
            click here to return <Link to="/staff">Back</Link>
          </span>
        </div>
      );
    }
    return (
      <div>
        <div className=" border rounded-lg  m-4 sm:flex  p-4 sm:p-0 ">
          <div className="flex items-center mb-2 sm:mr-8 sm:mb-0">
            <img
              className="border rounded-full w-24 h-24"
              src={this.img}
              alt="not present"
            />
          </div>
          <div className="sm:mr-8">
            <p className="capitalize font-semibold font-sans text-gray-700">
              name:{this.state.name}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              usn:{this.state.usn}
            </p>

            <p className="capitalize font-semibold font-sans text-gray-700">
              sem:{this.state.sem}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              section:{this.state.section}
            </p>
          </div>
          <div>
            <p className="capitalize font-semibold font-sans text-gray-700">
              subject:{this.state.subject}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              dept:{this.state.dept}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              internals:{this.state.internals}
            </p>
            <p className="capitalize font-semibold font-sans text-gray-700">
              Marks obtained:
              <span className="w-48  flex justify-between items-center">
                <Input
                  bsSize="sm"
                  className="mx-2"
                  readOnly={true}
                  value={this.state.marks}
                  // value={this.state.performance.question[index]}
                />
                <span className="mx-2 text-3xl">/</span>
                <Input
                  bsSize="sm"
                  value={this.state.allocatedMarks}
                  readOnly={true}
                  className="mx-2 pl-4 "
                />
              </span>
            </p>
          </div>
        </div>
        <Alert className="m-4 flex flex-wrap items-center" color="danger">
          Absent for {this.state.internals}?
          <Button
            onClick={() => {
              this.setState({ modalOpen: !this.state.modalOpen });
            }}
            className="ml-4 tracking-wider"
            color="danger"
          >
            Absent
          </Button>
        </Alert>
        <Form>
          {this.state.questionpaper}
          <Alert className="m-4 capitalize font-semibold tracking-widest">
            {this.state.name} has scored {this.state.marks}/
            {this.state.allocatedMarks}
          </Alert>
          <div className="flex justify-center">
            <Button
              className="px-4 py-2 mb-2 uppercase tracking-wide"
              color="primary"
              outline
              type="submit"
              disabled={this.state.disabled}
              onClick={this.submit}
            >
              submit
            </Button>
          </div>
          <Alert
            color="danger"
            style={{ display: this.state.disabled ? "block" : "none" }}
            className="m-4"
          >
            Enter marks correctly...
          </Alert>
        </Form>
        <Modal isOpen={this.state.modalOpen} centered={true}>
          <ModalHeader className="bg-red-600 tracking-wider">
            Warning
          </ModalHeader>
          <ModalBody className="text-gray-700 capitalize">
            The student was absent for {this.state.internals}.
          </ModalBody>
          <ModalFooter>
            <Button
              outline
              color="danger"
              className="capitalize tracking-wider"
              onClick={this.absentSubmit}
            >
              confirm
            </Button>
            <Button
              outline
              className="capitalize tracking-wider"
              onClick={() => {
                this.setState({ modalOpen: !this.state.modalOpen });
              }}
            >
              cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
