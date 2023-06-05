import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = () => {
  return (
    <div>
      <DashHeader />
      <div className="dash-container"></div>
      <DashFooter />
    </div>
  );
};
export default DashLayout;
