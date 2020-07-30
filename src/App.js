import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
// eslint-disable-next-line
import Home from "./Components/Home";
//teachers
import Stafflogin from "./Components/Teacher/Stafflogin";
import Staff from "./Components/Teacher/Staff";
import Questions from "./Components/Teacher/Questions";
import StudentsT from "./Components/Teacher/StudentT";
import PaperDetails from "./Components/Teacher/PaperDetails";
import Internals1 from "./Components/Teacher/Internals1";
import Internals2 from "./Components/Teacher/Internals2";
import Internals3 from "./Components/Teacher/Internals3";
import Coanalysis from "./Components/Teacher/Coanalysis";
import ResetPassword from "./Components/Teacher/ResetPassword";
import SetNewPassword from "./Components/Teacher/SetNewPassword";
//students
import Studentlogin from "./Components/Students/Studentlogin";
import Student from "./Components/Students/Student";
import Internals from "./Components/Students/Internals";

//cordinator
import Cordinator from "./Components/Cordinator/Cordinator";
import Cordinatorlogin from "./Components/Cordinator/Cordinatorlogin";
// eslint-disable-next-line
import { Protected } from "./Protected";
import { ProtectedC } from "./ProtectedC";
import { ProtectedS } from "./ProtectedS";

// eslint-disable-next-line

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />

        {
          //Staff
        }

        <Route
          exact
          path="/staff-login"
          render={(props) => <Stafflogin {...props} />}
        />
        <Route exact path="/staff" render={(props) => <Staff {...props} />} />
        <Route exact path="/staff/set-paper" component={PaperDetails} />
        <Route exact path="/staff/set-paper/questions" component={Questions} />
        <Route exact path="/staff/students" component={StudentsT} />
        <Route
          exact
          path="/staff/students/internals1/:id"
          component={Internals1}
        />
        <Route
          exact
          path="/staff/students/internals2/:id"
          component={Internals2}
        />
        <Route
          exact
          path="/staff/students/internals3/:id"
          component={Internals3}
        />
        <Route exact path="/staff/co-analysis/:id" component={Coanalysis} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route
          exact
          path="/resetPassword/:resetToken"
          component={SetNewPassword}
        />
        {
          //Cordinator
        }
        <ProtectedC path="/cordinator" component={Cordinator} />
        <Route exact path="/cordinator-login" component={Cordinatorlogin} />

        {
          //Student
        }
        <Route exact path="/student-login" component={Studentlogin} />
        <ProtectedS exact path="/student" component={Student} />
        <ProtectedS exact path="/student/internals" component={Internals} />
      </Switch>
    </div>
  );
}

export default App;
