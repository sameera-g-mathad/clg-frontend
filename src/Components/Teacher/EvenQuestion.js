import React, { Component } from "react";
import {
  FormGroup,
  Button,
  Label,
  Input,
  Alert,
  CustomInput,
  FormText,
} from "reactstrap";
import "./../../App.css";
import { GoAlert } from "react-icons/go";
import { FaLightbulb } from "react-icons/fa";
export default class EvenQuestions extends Component {
  subquestCO = [];
  state = {
    subquestions: [],
    count: 0,
    question: "",
    total: 0,
    co: "",
    number: this.props.number,
    coToggle: false,
    coCount: 0,
  };
  alphas = ["a", "b", "c"];
  addTextbox = () => {
    if (this.state.count < 3)
      this.setState({
        count: this.state.count + 1,
        subquestions: [...this.state.subquestions, ""],
      });
  };
  removeTextbox = () => {
    this.state.subquestions.pop();
    if (this.state.count > 0)
      this.setState({
        subquestions: this.state.subquestions,
        count: this.state.count - 1,
      });
  };
  addQuestionValue = (e) => {
    const value = this.props.value[this.state.number];

    if (value === undefined) return;
    if (value !== "" || value !== 0 || value !== undefined)
      this.setState({
        question: value,
      });
  };
  addSubQuestionValue = (e, index) => {
    let sum = 0;
    if (parseInt(e.target.value))
      // eslint-disable-next-line
      this.state.subquestions[index] = {
        subquestions: parseInt(e.target.value) || "",
      };
    else return (e.target.value = "");
    this.setState({
      subquestions: this.state.subquestions,
    });
    for (let i = 0; i < this.state.subquestions.length; i++) {
      if (this.state.subquestions[i] !== "") {
        sum = sum + this.state.subquestions[i].subquestions;
        this.setState({
          total: sum,
        });
      }
    }
  };
  coChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.toUpperCase();
    this.setState({
      [name]: newValue || "",
    });
  };
  changeSwitch = (e) => {
    this.setState({
      coToggle: !this.state.coToggle,
      co: "",
    });
  };
  subQuestionCoChange = (e, index) => {
    const co = e.target.value || "";
    const newValue = co.toUpperCase();
    this.subquestCO.splice(index, 1, {
      subquestions: this.state.subquestions[index].subquestions,
      subco: newValue,
    });
    if (newValue.length === 3) {
      this.setState({
        coCount: this.state.coCount + 1,
      });
    }
    // console.log(this.subquestCO);
    // console.log(this.state.subquestions);
  };
  render() {
    return (
      <div>
        <div className="m-4 p-4 sm:border-l-4 sm:border-b-0 border-b-4 border-blue-600 bg-gray-200 rounded-lg shadow">
          <FormGroup>
            <Label className="font-bold text-2xl capitalize" for="questions">
              Enter the marks {this.state.number}:
            </Label>
            <Input
              type="text"
              id={`questions${this.props.number}`}
              name="question"
              value={this.state.question}
              onClick={this.addQuestionValue}
              readOnly={true}
            />
          </FormGroup>
          <FormGroup className="flex items-center flex-wrap">
            <Label className="font-semibold text-xl capitalize" for="cos">
              Enter CO:
            </Label>
            <Input
              style={{ width: "100px" }}
              disabled={this.state.coToggle}
              className="mx-2"
              type="text"
              id={`cos${this.props.number}`}
              name="co"
              value={this.state.co}
              autoComplete="off"
              maxLength={3}
              onChange={this.coChange}
            />
            <span className="flex items-center ">
              <CustomInput
                type="switch"
                id={`switch${this.props.number}`}
                onChange={this.changeSwitch}
              />
              <FormText color="primary" className="font-semibold  ">
                Click the switch if subquestions has different CO`s.
              </FormText>
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="questionsButton" className="font-semibold text-lg">
              Subquestions:
            </Label>
            <Button
              id="questionsButton"
              disabled={this.state.question === "" ? true : false}
              onClick={this.addTextbox}
              color="primary"
              className="mx-2"
            >
              Add
            </Button>
            <Button
              id="questionsButton"
              disabled={this.state.question === "" ? true : false}
              color="danger"
              onClick={this.removeTextbox}
            >
              Remove
            </Button>
          </FormGroup>
          <hr />
          {this.state.total !== this.state.question &&
          this.state.total !== 0 ? (
            <Alert className="flex flex-wrap" color="danger">
              <span className="flex items-center uppercase font-bold">
                <GoAlert className="mr-3" />
                Warning
              </span>
              :Entered marks does not match
            </Alert>
          ) : (
            ""
          )}
          {this.state.subquestions.map((question, index) => {
            return (
              <div key={index} className="flex">
                <FormGroup className="w-64 flex mr-4">
                  <Label className="mr-2 text-lg mt-1" for="subquestions">
                    {this.alphas[index]}:
                  </Label>
                  <Input
                    id="subquestions"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => this.addSubQuestionValue(e, index)}
                  />
                </FormGroup>
                <FormGroup className="w-32 flex">
                  <Label
                    style={{ display: this.state.coToggle ? "block" : "none" }}
                    className="mr-2 text-lg mt-1"
                    for="subco"
                  >
                    CO:
                  </Label>
                  <Input
                    style={{ display: this.state.coToggle ? "block" : "none" }}
                    type="text"
                    id="subco"
                    autoComplete="off"
                    maxLength={3}
                    onChange={(e) => {
                      this.subQuestionCoChange(e, index);
                    }}
                  />
                </FormGroup>
              </div>
            );
          })}
          {this.state.count >= 3 ? (
            <Alert className="flex flex-wrap" color="success">
              <span className="flex items-center font-bold uppercase">
                <FaLightbulb className="mr-3" />
                Note
              </span>
              :Only 3 questions can be added.
            </Alert>
          ) : (
            ""
          )}
          {this.state.total === this.state.question &&
          this.state.coToggle === false
            ? this.props.render({
                question: this.state.question,
                subquestions: this.state.subquestions,
                co: this.state.co,
              })
            : ""}

          {this.state.total === this.state.question &&
          this.state.coToggle === true &&
          this.state.coCount === this.state.count
            ? this.props.render({
                question: this.state.question,
                subquestions: this.subquestCO,
                co: "",
              })
            : ""}
          {this.state.total === 0 &&
          this.state.question !== "" &&
          this.state.co !== "" &&
          this.state.coToggle === false
            ? this.props.render({
                question: this.state.question,
                subquestions: [],
                co: this.state.co,
              })
            : ""}
        </div>
      </div>
    );
  }
}
