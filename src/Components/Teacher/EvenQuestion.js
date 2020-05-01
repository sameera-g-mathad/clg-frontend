import React, { Component } from "react";
import { FormGroup, Button, Label, Input, Alert } from "reactstrap";
import "./../../App.css";
import { GoAlert } from "react-icons/go";
import { FaLightbulb } from "react-icons/fa";
export default class EvenQuestions extends Component {
  state = {
    subquestions: [],
    count: 0,
    question: "",
    total: 0,
    co: "",
    number: this.props.number,
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
    this.setState({
      question: value,
    });
  };
  addSubQuestionValue = (e, index) => {
    let sum = 0;
    // eslint-disable-next-line
    this.state.subquestions[index] = parseInt(e.target.value) || "";
    this.setState({
      subquestions: this.state.subquestions,
    });
    for (let i = 0; i < this.state.subquestions.length; i++) {
      if (this.state.subquestions[i] !== "") {
        sum = sum + this.state.subquestions[i];
        this.setState({
          total: sum,
        });
      }
    }
  };
  coChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value || "",
    });
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
              id="questions"
              name="question"
              value={this.state.question}
              onClick={this.addQuestionValue}
              readOnly={true}
            />
          </FormGroup>
          <FormGroup className="w-64">
            <Label className="font-semibold text-xl capitalize" for="cos">
              Enter CO:
            </Label>
            <Input
              type="text"
              id="cos"
              name="co"
              value={this.state.co}
              autoComplete="off"
              maxLength={3}
              onChange={this.coChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="questionsButton" className="font-semibold text-lg">
              Subquestions:
            </Label>
            <Button
              id="questionsButton"
              onClick={this.addTextbox}
              color="primary"
              className="mx-2"
            >
              Add
            </Button>
            <Button
              id="questionsButton"
              color="danger"
              onClick={this.removeTextbox}
            >
              Remove
            </Button>
          </FormGroup>
          <hr />
          {this.state.total > this.state.question ? (
            <Alert className="flex" color="danger">
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
              <FormGroup className="w-64 flex" key={index}>
                <Label className="mr-2 text-lg mt-1" for="subquestions">
                  {this.alphas[index]}:
                </Label>
                <Input
                  id="subquestions"
                  type="text"
                  value={question}
                  autoComplete="off"
                  onChange={(e) => this.addSubQuestionValue(e, index)}
                />
              </FormGroup>
            );
          })}
          {this.state.count >= 3 ? (
            <Alert className="flex" color="success">
              <span className="flex items-center font-bold uppercase">
                <FaLightbulb className="mr-3" />
                Note
              </span>
              :Only 3 questions can be added.
            </Alert>
          ) : (
            ""
          )}
          {this.props.render({
            question: this.state.question,
            subquestions: this.state.subquestions,
            co: this.state.co,
          })}
        </div>
      </div>
    );
  }
}
