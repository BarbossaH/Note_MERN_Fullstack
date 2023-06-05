import DashLayout from './DashLayout';

const Layout = (props) => {
  return (
    <div>
      <DashLayout />
      {props.children}
    </div>
  );
};
export default Layout;
