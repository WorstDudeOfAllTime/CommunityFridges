import './Layout.css';
const Layout = ({ children }) => {
  return (
    <div className="siteContainer">
      <div className="navContainer">
        <h1 className="logo">Philadelphia Community Pantry/Fridge Locator</h1>
      </div>
      <div className="mapContainer">{children}</div>
    </div>
  );
};

export default Layout;
