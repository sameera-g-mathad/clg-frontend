import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormFeedback,
  FormText,
} from "reactstrap";
import { MdLibraryAdd, MdDelete, MdClose } from "react-icons/md";
import { FaEye, FaSearch, FaFilter } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import Select from "react-select";
import { AiFillEdit } from "react-icons/ai";
import { Spinner } from "reactstrap";
import Axios from "axios";
import "./../../App.css";
import { RootContext } from "./../../RContext";
//import basket from "./basket.jpeg";
export default class Students extends Component {
  static contextType = RootContext;
  img = "";
  state = {
    cordinatorToken: JSON.parse(sessionStorage.getItem("cordinatorToken")),
    display: true,
    loading: true,
    students: [],
    select: 0,
    search: "",
    studentEmail: "",
    studentName: "",
    studentUsn: "",
    dept: JSON.parse(sessionStorage.getItem("dept")),
    dob: "",
    year: "",
    sem: "",
    section: "",
    deleteid: "",
    modalOpened: false,
    image: "",
    disabled: "",
    url: this.context.url,
    doberr: false,
    updatemodal: false,
    updateid: "",
    updatestudentName: "",
    updatestudentSem: 0,
    updatestudentYear: 0,
    failed: false,
    failedmsg: "",
    errmsg: "",
  };
  options = [
    {
      label: "All Years",
      value: 0,
    },
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
  ];
  yearOptions = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
  ];
  semOptions = [
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
  yearChange = (e) => {
    const value = e.value;
    this.setState({
      year: value,
    });
  };
  semChange = (e) => {
    const value = e.value;
    this.setState({
      sem: value,
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSection = (e) => {
    const { name, value } = e.target;
    if (value.match("^[a-zA-Z ]*$") != null)
      this.setState({
        [name]: value.toUpperCase(),
      });
  };
  buttonClicked = () => {
    this.setState({
      display: !this.state.display,
    });
  };
  arrayToImage = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((el) => {
      binary += String.fromCharCode(el);
    });
    return window.btoa(binary);
  };
  async componentDidMount() {
    try {
      const res = await Axios.get(`${this.state.url}/cordinator/students`, {
        headers: {
          dept: this.state.dept,
          authorization: this.state.cordinatorToken,
        },
      });

      const results = res.data.Students;
      const base64flag = "data:image/jpeg;base64,";
      let imgstr;
      const students = results.map((student) => {
        imgstr = this.arrayToImage(student.photo.data.data);
        this.img = base64flag + imgstr;
        return (
          <div
            key={student._id}
            name={student.studentName}
            year={student.year}
            className="flex items-center justify-evenly m-2 p-2 bg-gray-200 rounded-lg border-b-4  hover:shadow-lg border-teal-500"
          >
            <div className="py-2">
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                name : {student.studentName}
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                usn : {student.studentUsn}
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                department : {student.dept}
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                d.o.b : '{student.dob}'
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                year : {student.year}
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                semester : {student.sem}
              </p>
              <p className="capitalize text-lg text-gray-700 font-semibold hover:underline tracking-wider">
                section : {student.section}
              </p>
            </div>
            <div className="studentaction-content">
              <img
                className=" w-24 h-24 m-2 mb-4 rounded-full shadow border-2"
                src={this.img}
                alt="no"
              />
              <Button
                color="primary"
                outline
                tag={Link}
                to={{
                  pathname: `/cordinator/students/${student.studentUsn}`,
                  state: student,
                }}
                className="mb-2 capitalize"
              >
                <span className="flex justify-center font-semibold text-lg items-center">
                  <FaEye className="mr-1" />
                  view
                </span>
              </Button>
              <Button
                color="success"
                outline
                disabled={student.sem === 8 ? true : false}
                onClick={() =>
                  this.updateStudentdetails(
                    student._id,
                    student.studentName,
                    student.sem,
                    student.year
                  )
                }
                //onClick=
                // tag={Link}
                // to={{
                //   pathname: `/cordinator/students/update/${student.studentUsn}`,
                // }}
                className="mb-2 capitalize"
              >
                <span className="flex justify-center font-semibold text-lg items-center">
                  <AiFillEdit className="mr-1" />
                  update
                </span>
              </Button>
              <Button
                color="danger"
                outline
                onClick={(e) => this.collectStudent(student._id)}
                className="mb-2 capitalize"
              >
                <span className="flex justify-center font-semibold text-lg items-center">
                  <MdDelete className="mr-1" />
                  delete
                </span>
              </Button>
            </div>
          </div>
        );
      });
      this.setState({
        students: [...students],
        loading: false,
      });
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404) {
        return this.setState({
          loading: false,
          errmsg: err.response.data.message,
        });
      }
    }
  }

  collectStudent = (id) => {
    this.setState({
      deleteid: id,
      modalOpened: !this.state.modalOpened,
    });
  };
  deleteStudent = async () => {
    try {
      const id = this.state.deleteid;
      const res = await Axios.delete(`${this.state.url}/cordinator/students`, {
        headers: { id, authorization: this.state.cordinatorToken },
      });
      console.log(res);
      if (res.status === 204) window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  updateStudentdetails = (id, name, sem, year) => {
    const updatedsem = sem + 1;
    const updatedyear = sem % 2 === 0 ? year + 1 : year;
    this.setState({
      updatemodal: !this.state.updatemodal,
      updateid: id,
      updatestudentName: name,
      updatestudentSem: updatedsem,
      updatestudentYear: updatedyear,
    });
  };
  updateStudent = async () => {
    try {
      const { updateid: _id, updatestudentSem, updatestudentYear } = this.state;
      const res = await Axios.patch(
        `${this.state.url}/cordinator/students`,
        {
          _id,
          updatestudentSem,
          updatestudentYear,
        },
        { headers: { authorization: this.state.cordinatorToken } }
      );
      console.log(res);
      if (res.status === 200) window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  searchChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  selectChange = (e) => {
    const value = e.value;
    this.setState({
      select: value,
    });
  };
  submit = async (e) => {
    try {
      e.preventDefault();
      if (
        this.state.studentEmail === "" ||
        this.state.studentName === "" ||
        this.state.studentUsn === "" ||
        this.state.dept === "" ||
        this.state.dob === "" ||
        this.state.year === "" ||
        this.state.sem === "" ||
        this.state.section === ""
      ) {
        return this.setState({
          failed: true,
          failedmsg: "Please enter the fields specified",
        });
      }
      const {
        studentEmail,
        studentName,
        studentUsn,
        dept,
        dob,
        year,
        sem,
        section,
      } = this.state;
      const formdata = new FormData();
      formdata.append("photo", this.state.image, this.state.image.name);
      formdata.append("studentEmail", studentEmail);
      formdata.append("studentName", studentName);
      formdata.append("studentUsn", studentUsn);
      formdata.append("dept", dept);
      formdata.append("dob", dob);
      formdata.append("year", year);
      formdata.append("sem", sem);
      formdata.append("section", section);

      const res = await Axios.post(
        `${this.state.url}/cordinator/students`,
        formdata,
        {
          enctype: "multipart/form-data",
          headers: { authorization: this.state.cordinatorToken },
        }
      );
      console.log(res);
      if (res.status === 201 && res.data.status === "success")
        window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  imageChange = (e) => {
    if (e.target.files[0].size > 1024 * 1024 * 5) {
      this.setState({
        disabled: true,
      });
    }
    this.setState({
      image: e.target.files[0],
      disabled: false,
    });
  };
  handledob = (e) => {
    const { name, value } = e.target;
    if (value.match("^[0-9]{4}-[0-9][0-9]-[0-9][0-9]$") !== null) {
      const date = value.split("-");
      console.log(date);
      const year = parseInt(date[0]);
      const month = parseInt(date[1]);
      const day = parseInt(date[2]);
      if (year < 1995) return;
      if (month < 0 || month > 12) return;
      if (day < 0 || day > 31) return;
      if (month === 2 && day === 29 && year % 4 !== 0) return;
      if (
        (month === 1 ||
          month === 3 ||
          month === 5 ||
          month === 7 ||
          month === 8 ||
          month === 10 ||
          month === 12) &&
        day > 31
      )
        return;
      if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day > 30
      )
        return;
      this.setState({
        [name]: value,
        doberr: false,
      });
    } else {
      this.setState({
        doberr: true,
      });
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
            color="info"
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
          color="info"
        >
          <span className="mr-4">
            Add subjects to the '{this.state.dept}' department:
          </span>
          <Button
            className=" px-4 py-2"
            style={{ display: this.state.display ? "inline-block" : "none" }}
            color="info"
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
          <div className="p-4 mb-2 text-xl text-gray-800 capitalize rounded-lg font-bold bg-teal-400 border flex items-center justify-between">
            enter student details:
            <span className="text-gray-800" onClick={this.buttonClicked}>
              <MdClose />
            </span>
          </div>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold text-secondary capitalize"
              for="student-email"
            >
              student email:
            </Label>
            <Input
              id="student-email"
              type="email"
              name="studentEmail"
              value={this.state.studentEmail}
              autoComplete="off"
              autoFocus="on"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
              for="student-name"
            >
              student name:
            </Label>
            <Input
              id="student-name"
              type="text"
              name="studentName"
              value={this.state.studentName}
              autoComplete="off"
              autoFocus="on"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
              for="student-usn"
            >
              student usn:
            </Label>
            <Input
              id="student-usn"
              type="text"
              name="studentUsn"
              value={this.state.studentUsn}
              autoComplete="off"
              maxLength={10}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
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
              className="text-lg font-semibold  text-secondary capitalize"
              for="dob"
            >
              D.O.B:
            </Label>
            <Input
              id="dob"
              type="text"
              name="dob"
              maxLength={10}
              autoComplete="off"
              onChange={this.handledob}
            />
            <FormText
              color="danger"
              className="capitalize font-semibold "
              style={{ display: this.state.doberr ? "block" : "none" }}
            >
              the d.o.b must match the format YYYY-MM-DD .
            </FormText>
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
              for="year"
            >
              year:
            </Label>
            <Select
              id="year"
              options={this.yearOptions}
              placeholder="Ex: 4"
              onChange={this.yearChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
              for="sem"
            >
              sem:
            </Label>
            <Select
              id="sem"
              name="sem"
              isDisabled={this.state.year !== "" ? false : true}
              options={this.semOptions.filter((option) => {
                if (this.state.year !== "")
                  return (
                    this.state.year * 2 === option.value ||
                    this.state.year * 2 - 1 === option.value
                  );
                else return option;
              })}
              placeholder="Ex: 8"
              onChange={this.semChange}
            />
          </FormGroup>

          <FormGroup className="mx-8">
            <Label
              className="text-lg font-semibold  text-secondary capitalize"
              for="section"
            >
              section:
            </Label>
            <Input
              id="section"
              type="text"
              name="section"
              value={this.state.section}
              autoComplete="off"
              maxLength={1}
              onChange={this.handleSection}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label
              for="image"
              className="text-lg text-secondary  font-semibold "
            >
              Photo:
            </Label>
            <CustomInput
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={this.imageChange}
            />
            <FormFeedback
              style={{ display: this.state.disabled ? "block" : "none" }}
              className="font-semibold p-1 capitalize"
              color="danger"
            >
              File size should not exceed 5Mb.
            </FormFeedback>
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
              color="info"
              outline
              className="px-4 py-2  uppercase tracking-wide"
              type="submit"
            >
              add student
            </Button>
          </FormGroup>
        </Form>

        <div className="m-2 sm:m-4 flex justify-between">
          <FormGroup className="border-2 w-32 border-teal-500 p-1 rounded-lg  sm:w-64 text-gray-500 flex items-center">
            <FaSearch className="mr-2 text-teal-500 w-6" />
            <input
              className="w-16 sm:w-64 focus:outline-none"
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search By Name"
              value={this.state.search}
              onChange={this.searchChange}
            />
          </FormGroup>
          <FormGroup className="border-2 border-teal-500 p-1 rounded-lg w-32 sm:w-64 text-gray-500 flex items-center">
            <FaFilter className="mr-2 text-teal-500" />
            <Select
              className="w-32 sm:w-64 "
              styles={customStyles}
              placeholder="Year"
              onChange={this.selectChange}
              options={this.options}
            />
          </FormGroup>
        </div>
        {this.state.errmsg === "" ? (
          <div className="students-content">
            {this.state.students.filter((student) => {
              if (this.state.select !== 0) {
                if (this.state.search !== "")
                  return student.props.name.startsWith(this.state.search);
                else return student.props.year === this.state.select;
              } else if (this.state.search !== "")
                return student.props.name.startsWith(this.state.search);
              else return student;
            })}
          </div>
        ) : (
          <div className="mt-4 text-lg text-center font-semibold capitalize text-teal-500">
            {this.state.errmsg}
          </div>
        )}

        <Modal isOpen={this.state.updatemodal} centered={true}>
          <ModalHeader className="bg-green-600 text-white capitalize">
            are you sure?
          </ModalHeader>
          <ModalBody className="text-gray-700 font-semibold capitalize">
            do you want to update {this.state.updatestudentName} to{" "}
            {this.state.updatestudentSem} sem and {this.state.updatestudentYear}
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              className="capitalize"
              outline
              onClick={this.updateStudent}
            >
              update
            </Button>
            <Button
              className="capitalize"
              outline
              onClick={() => {
                this.setState({ updatemodal: !this.state.updatemodal });
              }}
            >
              cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalOpened} centered={true}>
          <ModalHeader className="bg-red-600 text-white capitalize">
            are you sure?
          </ModalHeader>
          <ModalBody className="text-gray-700 font-semibold capitalize">
            the student will be deleted from the database.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              className="capitalize"
              onClick={this.deleteStudent}
              outline
            >
              confirm
            </Button>
            <Button
              onClick={() => {
                this.setState({ modalOpened: !this.state.modalOpened });
              }}
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
