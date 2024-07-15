import "./Siderbar.scss";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import Overview from "../Overview/Overview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav />
      <Search />
      <div className="overview-main">
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />

      </div>
    </div>
  );
};

export default Sidebar;
