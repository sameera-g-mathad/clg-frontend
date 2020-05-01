import React, { Component } from 'react'
import {Switch,Link,Route} from "react-router-dom"
import Teachers from "./TeachersC"
import EditStaff from "./EditStaffC"
import Subjects from "./SubjectsC"
import Students from "./StudentsC"
import SingleStudent from "./SingleStudent"
import updateStudent from "./updateStudent"
export default class Cordinator extends Component {
    render() {
        return (
            <div>
            <nav className="w-screen flex justify-end rounded-lg shadow-sm border-b-2 bg-gray-300 p-4">
                <Link to="/cordinator/staff" 
                className="hover:text-blue-500  mr-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide">Teachers</Link>
                <Link to="/cordinator/subjects" 
                className="text-black hover:text-green-500  mr-4 font-semibold uppercase hover:text-black hover:no-underline tracking-wide">Subjects</Link>
                <Link to="/cordinator/students"
                className="text-black hover:text-teal-500   mr-4 font-semibold uppercase hover:text-black hover:no-underline tracking-wide">Students</Link>
            </nav>
                <Switch>
                    {/*Teacher*/}
                    <Route exact path="/cordinator/staff" component={Teachers} />
                    <Route exact path="/cordinator/staff/:id" component={EditStaff}/>


                    {/*Subjects*/}
                    <Route exact path="/cordinator/subjects" component={Subjects}/>

                    {/*Students */}
                    <Route exact path="/cordinator/students" component={Students}/>
                    <Route exact path="/cordinator/students/:usn" component={SingleStudent}/>
                    <Route exact path="/cordinator/students/update/:usn" component={updateStudent} />
                </Switch>
            </div>
        )
    }
}
