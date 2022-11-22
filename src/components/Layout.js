import './Layout.css';
const Layout = ({ children }) => {
  return (
    <div className="siteContainer">
      <div className="navContainer"></div>
      <div className="mapContainer">{children}</div>
    </div>
  );
};

export default Layout;
