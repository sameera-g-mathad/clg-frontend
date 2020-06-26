import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  FormText,
} from "reactstrap";
import Select from "react-select";
import Axios from "axios";
import { RootContext } from "./../../RContext";
export default class EditStaff extends Component {
  static contextType = RootContext;
  state = {
    cordinatorToken: JSON.parse(sessionStorage.getItem("cordinatorToken")),
    id: this.props.match.params.id,
    url: this.context.url,
    flag: false,
    count: 0,
    loading: true,
    tname: "",
    email: "",
    dept: "",
    semester1: "",
    section1: "",
    semester2: "",
    section2: "",
    options1: [],
    options2: [],
    subject1: "",
    subject2: " ",
  };
  options1 = [];
  async componentDidMount() {
    try {
      const res = await Axios.get(
        `${this.state.url}/cordinator/staff/${this.state.id}`,
        { headers: { authorization: this.state.cordinatorToken } }
      );
      const result = res.data.Teacher;
      this.setState({
        tname: result.name,
        email: result.email,
        dept: result.dept,
        loading: false,
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  handleSem = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: parseInt(value) || "",
    });
  };
  handleSection1 = (e) => {
    const { name, value } = e.target;
    if (value.match("^[a-zA-Z ]*$") != null)
      this.setState(
        {
          [name]: value.toUpperCase(),
        },
        async () => {
          try {
            const semester1 = this.state.semester1;
            const section1 = this.state.section1;
            const dept = this.state.dept;
            if (this.state.section1 !== "") {
              const res1 = await Axios.get(
                `${this.state.url}/cordinator/staff/${this.state.id}`,
                {
                  headers: {
                    dept,
                    semester1,
                    section1,
                    authorization: this.state.cordinatorToken,
                  },
                }
              );
              const result1 = res1.data.subject1.map((el) => {
                return {
                  label: el.subjectName,
                  value: el._id,
                };
              });
              this.options1 = [...result1];
            }
          } catch (err) {
            console.log(err.response);
          }
        }
      );
  };
  handleSection2 = (e) => {
    const { name, value } = e.target;
    if (value.match("^[a-zA-Z ]*$") != null)
      this.setState(
        {
          [name]: value.toUpperCase(),
        },
        async () => {
          try {
            const semester2 = this.state.semester2;
            const section2 = this.state.section2;
            const dept = this.state.dept;
            if (this.state.section2 !== "") {
              const res2 = await Axios.get(
                `${this.state.url}/cordinator/staff/${this.state.id}`,
                {
                  headers: {
                    dept,
                    semester2,
                    section2,
                    authorization: this.state.cordinatorToken,
                  },
                }
              );
              const result2 = res2.data.subject2.map((el) => {
                return {
                  label: el.subjectName,
                  value: el._id,
                };
              });
              this.options2 = [...result2];
            }
          } catch (err) {
            console.log(err.response);
          }
        }
      );
  };
  selectChange2 = (e) => {
    const value = e.value;
    this.setState({
      subject2: value,
    });
  };
  selectChange1 = (e) => {
    const value = e.value;
    this.setState({
      subject1: value,
    });
  };
  submit = async (e) => {
    try {
      e.preventDefault();
      const _id = this.state.id;
      const subject1 = this.state.subject1;
      const subject2 = this.state.subject2;
      const res = await Axios.patch(
        `${this.state.url}/cordinator/staff/${this.state.id}`,
        { _id, subject1, subject2 },
        { headers: { authorization: this.state.cordinatorToken } }
      );
      console.log(res);
      if (res.status === 200 && res.data.status === "success")
        this.props.history.push("/cordinator/staff");
    } catch (err) {
      console.log(err.response);
    }
  };

  render() {
    if (this.state.loading)
      return (
        <div className="flex flex-col justify-center items-center">
          <Spinner
            color="warning"
            style={{ width: "100px", height: "100px" }}
            type="grow"
          />
          <h4 className="text-gray-500">Loading...</h4>
        </div>
      );
    return (
      <div>
        <Form className="mt-4" onSubmit={this.submit}>
          <p className="mx-8 p-4 text-xl bg-yellow-500 rounded-lg text-gray-700 font-bold  capitalize">
            edit details
          </p>
          <FormGroup className="mx-12">
            <Label for="name" className="text-lg text-secondary  font-semibold">
              Name:
            </Label>
            <Input
              className="capitalize"
              type="text"
              id="name"
              name="tname"
              value={this.state.tname}
              autoComplete="off"
              autoFocus="on"
              readOnly={true}
            />
          </FormGroup>

          <FormGroup className="mx-12">
            <Label for="name" className="text-lg text-secondary  font-semibold">
              Email:
            </Label>
            <Input
              type="email"
              id="name"
              name="email"
              value={this.state.email}
              autoComplete="off"
              readOnly={true}
            />
          </FormGroup>

          <FormGroup className="mx-12">
            <Label for="name" className="text-lg text-secondary  font-semibold">
              Department:
            </Label>
            <Input
              type="dept"
              id="name"
              name="dept"
              value={this.state.dept}
              maxLength={3}
              autoComplete="off"
              readOnly={true}
            />
          </FormGroup>

          <Label
            for="sem"
            className="mx-12 text-lg text-secondary  font-semibold"
          >
            Subject 1:
          </Label>
          <FormGroup className="mx-12 border rounded-lg p-4">
            <Label
              for="semester1"
              className="mb-2 text-md text-secondary font-semibold"
            >
              Semester Handled:
            </Label>
            <Input
              type="text"
              id="semester1"
              name="semester1"
              value={this.state.semester1}
              onChange={this.handleSem}
              maxLength={1}
              placeholder="Ex: 8"
              autoComplete="off"
            />

            <Label
              for="section"
              className="my-2 text-md text-secondary font-semibold"
            >
              Section Handled:
            </Label>
            <Input
              type="text"
              id="section1"
              name="section1"
              value={this.state.section1}
              pattern="[a-zA-Z]{1}"
              readOnly={this.state.semester1 === "" ? true : false}
              onChange={this.handleSection1}
              maxLength={1}
              placeholder="Ex: 'J'"
              autoComplete="off"
            />

            <Label
              for="subject1"
              className="my-2 text-md text-secondary  font-semibold"
            >
              Subject:
            </Label>
            <div
              onClick={() =>
                this.setState({
                  options1: this.options1,
                })
              }
            >
              <Select
                id="subject1"
                options={this.state.options1}
                className="capitalize"
                onChange={this.selectChange1}
              />
            </div>
          </FormGroup>

          <Label
            for="sem"
            className="mx-12 text-lg text-secondary  font-semibold"
          >
            Subject 2:
          </Label>
          <FormGroup className="mx-12 border rounded-lg p-4">
            <Label
              for="semester2"
              className="mb-2 text-md text-secondary font-semibold"
            >
              Semester Handled:
            </Label>
            <Input
              id="semester2"
              type="text"
              name="semester2"
              value={this.state.semester2}
              onChange={this.handleSem}
              maxLength={1}
              placeholder="Ex: 8"
              autoComplete="off"
            />

            <Label
              for="section2"
              className="my-2 text-md text-secondary  font-semibold"
            >
              Section:
            </Label>
            <Input
              id="section2"
              type="text"
              name="section2"
              value={this.state.section2}
              pattern="[a-zA-Z]{1}"
              readOnly={this.state.semester2 === "" ? true : false}
              onChange={this.handleSection2}
              maxLength={1}
              placeholder="Ex: 'J'"
              autoComplete="off"
            />

            <Label
              for="subject2"
              className="my-2 text-md text-secondary  font-semibold"
            >
              Subject:
            </Label>
            <div
              onClick={() =>
                this.setState({
                  options2: this.options2,
                })
              }
            >
              <Select
                id="subject2"
                options={this.state.options2}
                className="capitalize"
                onChange={this.selectChange2}
              />
            </div>
          </FormGroup>

          <FormGroup className="flex justify-center">
            <Button
              disabled={
                this.state.semester1 === this.state.semester2 &&
                this.state.section1 === this.state.section2 &&
                this.state.subject1 === this.state.subject2
                  ? true
                  : false
              }
              color="primary"
              outline
              className="px-4 py-2  uppercase tracking-wide"
              type="submit"
            >
              submit
            </Button>
          </FormGroup>
          <FormGroup className="flex justify-center">
            <FormText
              color="danger"
              className="capitalize font-semibold text-lg"
              style={{
                display:
                  this.state.semester1 === this.state.semester2 &&
                  this.state.section1 === this.state.section2 &&
                  this.state.subject1 === this.state.subject2
                    ? "block"
                    : "none",
              }}
            >
              subject details cannot be same
            </FormText>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
