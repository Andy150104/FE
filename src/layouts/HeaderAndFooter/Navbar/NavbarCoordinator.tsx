import { Link } from "react-router-dom";
import "../../../css/navbarManager.css";
export const NavbarCoordinator = () => {
    return (
        <div>
      <div className="nav-workplace" role="banner" id="headerSmallerHeight">
        <nav className="navbar navbar-expand-md navbar-dark nav-custom" id="nav-workplace">
          <div className="container-fluid">
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample06"
              aria-controls="navbarsExample06"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-5" id="navbarsExample06">
              <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <li
                      className="nav-item dropdown"
                  >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="dropdown04"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                      Manage Course
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                      <Link className="dropdown-item" to="/coordinator/course" id="dropdown-inAdmin-item">
                        Course
                      </Link>
                      <Link className="dropdown-item" to="/coordinator/course" id="dropdown-inAdmin-item">
                        View Course By Table
                      </Link>
                    </div>
                  </li>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <li
                      className="nav-item dropdown"
                  >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="dropdown04"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                      Create Course
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                      <Link className="dropdown-item" to="/coordinator/createCourse" id="dropdown-inAdmin-item">
                        Create and add mentor to course
                      </Link>
                      <Link className="dropdown-item" to="/coordinator/createIntern" id="dropdown-inAdmin-item">
                        Add intern to course
                      </Link>
                    </div>
                  </li>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/coordinator/createSchedule">Create Interview Schedule</Link>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/coordinator/report">Create Report</Link>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/coordinator/ShowSchedule">View Schedule Of Each Cadidate</Link>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/coordinator/feedback">Feedback</Link>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/coordinator/viewFeedback">View Course Feedbacks</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
        </div>
    );
}