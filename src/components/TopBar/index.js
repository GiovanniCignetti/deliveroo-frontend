import "./index.css";
const Topbar = ({ logo }) => {
  return (
    <header>
      <div className="headerDiv">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Topbar;
