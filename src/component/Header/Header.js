import { DASHBOARD, HABITS, TODO } from "../../constants/route";
import "./Header.css";
function Header({ setCurrentPage }) {
  return (
    <div className="left-leaned-header">
      <div className="site-header">
        <h1>sorted.</h1>
      </div>
      <div className="site-navigation card">
        <ul className="main-navigation">
          <li onClick={() => setCurrentPage(DASHBOARD)}>Dashboard</li>
          <li onClick={() => setCurrentPage(TODO)}>Today's goals</li>
          <li onClick={() => setCurrentPage(HABITS)}>Habits</li>
          {/* <li>Statistics</li> */}
          {/* <li>Settings</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
