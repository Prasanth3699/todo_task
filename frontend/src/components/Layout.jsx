/* eslint-disable react/prop-types */

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-custom-svg bg-cover bg-center bg-no-repeat z-0"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
