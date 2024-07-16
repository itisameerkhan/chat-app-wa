import "./Siderbar.scss";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import Overview from "../Overview/Overview";
import OverviewMain from "../OverviewMain/OverviewMain";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav />
      <Search />
      <div className="overview-main">
        <Overview />
        <OverviewMain />
      </div>
    </div>
  );
};

export default Sidebar;
