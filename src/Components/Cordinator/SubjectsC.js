import React, { Component } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { MdLibraryAdd, MdClose, MdDelete } from "react-icons/md";
import Axios from "axios";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import Select from "react-select";
import { RootContext } from "./../../RContext";

export default class Subjects extends Component {
  static contextType = RootContext;
  state = {
    display: true,
    subjects: [],
    subject: "",
    subjectCode: "",
    dept: JSON.parse(sessionStorage.getItem("dept")),
    semester: "",
    section: "",
    loading: true,
    search: "",
    selected: 0,
    url: this.context.url,
    deleteId: "",
    deleteModal: false,
    failed: false,
    failedmsg: "",
    errmsg: "",
  };
  options = [
    {
      label: "All Semesters",
      value: 0,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
    {
      label: 5,
      value: 5,
    },
    {
      label: 6,
      value: 6,
    },
    {
      label: 7,
      value: 7,
    },
    {
      label: 8,
      value: 8,
    },
  ];
  async componentDidMount() {
    try {
      const res = await Axios.get(`${this.state.url}/cordinator/subjects`, {
        headers: { dept: this.state.dept },
      });
      const result = res.data.Subjects;
      const mapped = result.map((el) => {
        return (
          <div
            key={el._id}
            sem={el.sem}
            name={el.subjectName}
            className="border-green-500 m-2 p-2 bg-gray-200 hover:shadow-lg border-b-4 sm:border-b-0 sm:border-l-4  rounded-lg"
          >
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline tracking-wider">
              SUBJECT : {el.subjectName}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline tracking-wider">
              SUBJECT-CODE : {el.subjectCode}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline tracking-wider">
              DEPARTMENT : {el.dept}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline tracking-wider">
              SEMESTER : {el.sem}
            </p>
            <p className="ml-4 text-lg font-semibold text-gray-700 capitalize hover:underline tracking-wider">
              SECTION : '{el.section}'-section
            </p>
            <div className="flex justify-center">
              <Button
                color="danger"
                disabled={el.assigned === true ? true : false}
                outline
                onClick={() =>
                  this.setState({
                    deleteId: el._id,
                    deleteModal: !this.state.deleteModal,
                  })
                }
              >
                <span className="flex justify-center font-semibold text-lg items-center">
                  <MdDelete className="mr-1" />
                  Delete
                </span>
              </Button>
            </div>
          </div>
        );
      });
      this.setState({
        subjects: [...mapped],
        loading: false,
      });
    } catch (err) {
      //console.log(err.response);
      if (err.response.status === 404) {
        return this.setState({
          loading: false,
          errmsg: err.response.data.message,
        });
      }
    }
  }
  buttonClicked = () => {
    this.setState({
      display: !this.state.display,
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = async (e) => {
    try {
      e.preventDefault();
      if (
        this.state.subject === "" ||
        this.state.subjectCode === "" ||
        this.state.dept === "" ||
        this.state.semester === "" ||
        this.state.section === ""
      ) {
        return this.setState({
          failed: true,
          failedmsg: "Please enter the fields specified",
        });
      }
      const {
        subject: subjectName,
        subjectCode,
        dept,
        semester: sem,
        section,
      } = this.state;
      const res = await Axios.post(`${this.state.url}/cordinator/subjects`, {
        subjectName,
        subjectCode,
        dept,
        sem,
        section,
      });
      console.log(res);
      if (res.status === 201 && res.data.status === "success")
        window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  selectChange = (e) => {
    const value = e.value;
    this.setState({
      selected: value,
    });
  };
  searchChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  deleteSubject = async () => {
    try {
      const _id = this.state.deleteId;
      const res = await Axios.delete(`${this.state.url}/cordinator/subjects`, {
        headers: { _id },
      });

      if (res.status === 200 && res.data.status === "success") {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  render() {
    const customStyles = {
      control: (base, state) => {
        return {
          ...base,
          border: "none",
          boxShadow: state.isFocused ? null : null,
        };
      },
    };

    if (this.state.loading)
      return (
        <div className="flex flex-col justify-center items-center">
          <Spinner
            color="success"
            style={{ width: "100px", height: "100px" }}
            type="grow"
          />
          <h4 className="text-gray-500">Loading...</h4>
        </div>
      );
    return (
      <div className="m-2">
        <Alert
          className="teacherc-alert p-4 m-2 text-lg font-bold capitalize"
          color="success"
        >
          <span className="mr-4">
            Add subjects to the '{this.state.dept}' department:
          </span>
          <Button
            className=" px-4 py-2"
            style={{ display: this.state.display ? "inline-block" : "none" }}
            color="success"
            onClick={this.buttonClicked}
          >
            <span className="flex justify-evenly items-center">
              <MdLibraryAdd />
              Add
            </span>
          </Button>
        </Alert>
        <Form
          style={{ display: this.state.display ? "none" : "block" }}
          className="border m-2 rounded-lg pb-2 "
          onSubmit={this.submit}
        >
          <div className="p-4 mb-2 text-xl text-gray-800 capitalize rounded-lg font-bold bg-green-400 border flex items-center justify-between">
            enter subject details:
            <span className="text-gray-800" onClick={this.buttonClicked}>
              <MdClose />
            </span>
          </div>
          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="subject"
            >
              subject:
            </Label>
            <Input
              id="subject"
              type="text"
              name="subject"
              value={this.state.subject}
              autoComplete="off"
              autoFocus={true}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="subjectcode"
            >
              subject-code:
            </Label>
            <Input
              id="subjectcode"
              type="text"
              name="subjectCode"
              value={this.state.subjectCode}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="dept"
            >
              department:
            </Label>
            <Input
              id="dept"
              type="text"
              name="dept"
              value={this.state.dept}
              readOnly={true}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="semester"
            >
              semester:
            </Label>
            <Input
              id="semester"
              type="text"
              name="semester"
              autoComplete="off"
              maxLength={1}
              pattern="[0-9]{1}"
              value={this.state.semester}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="section"
            >
              section:
            </Label>
            <Input
              id="section"
              type="text"
              name="section"
              autoComplete="off"
              maxLength={1}
              value={this.state.section}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Alert
            isOpen={this.state.failed}
            toggle={() => {
              this.setState({ failed: !this.state.failed });
            }}
            className="mx-8  font-semibold capitalize"
            color="danger"
          >
            <span className="flex items-center">
              <FiAlertCircle className="mr-3" />
              {this.state.failedmsg}
            </span>
          </Alert>
          <FormGroup className="flex justify-center">
            <Button
              color="success"
              outline
              className="px-4 py-2  uppercase tracking-wide"
              type="submit"
            >
              add subject
            </Button>
          </FormGroup>
        </Form>
        <div className="m-2 sm:m-4 flex justify-between">
          <FormGroup className="border-2 w-32 border-green-500 p-1 rounded-lg  sm:w-64 text-gray-500 flex items-center">
            <FaSearch className="mr-2 text-green-500 w-6" />
            <input
              className="w-16 sm:w-64 focus:outline-none"
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search"
              value={this.state.search}
              onChange={this.searchChange}
            />
          </FormGroup>
          <FormGroup className="border-2 w-32 p-1 rounded-lg border-green-500 sm:w-64 text-gray-500 flex items-center">
            <FaFilter className="mr-2 text-green-500" />
            <Select
              className="w-32 sm:w-64 "
              styles={customStyles}
              placeholder="Sem"
              onChange={this.selectChange}
              options={this.options}
            />
          </FormGroup>
        </div>
        {this.state.errmsg === "" ? (
          <div className="subjects-content">
            {this.state.subjects.filter((subject) => {
              if (this.state.selected !== 0) {
                if (
                  this.state.search !== "" &&
                  subject.props.sem === this.state.selected
                )
                  return subject.props.name.startsWith(this.state.search);
                else return subject.props.sem === this.state.selected;
              } else if (this.state.search !== "")
                return subject.props.name.startsWith(this.state.search);
              else return subject;
            })}
          </div>
        ) : (
          <div className="mt-4 text-lg text-center font-semibold capitalize text-green-500">
            {this.state.errmsg}
          </div>
        )}
        <Modal isOpen={this.state.deleteModal} centered={true}>
          <ModalHeader className="bg-red-600 text-white capitalize">
            are you sure?
          </ModalHeader>
          <ModalBody className="text-gray-700 font-semibold capitalize">
            this subject will be deleted from the database.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              className="capitalize"
              onClick={this.deleteSubject}
              outline
            >
              confirm
            </Button>
            <Button
              onClick={() =>
                this.setState({ deleteModal: !this.state.deleteModal })
              }
              className="capitalize"
              outline
            >
              cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
