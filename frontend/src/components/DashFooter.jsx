import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handlerGoHome = () => navigate('/');
  let goHomeButton = null;
  console.log(pathname);
  if (pathname !== '/') {
    goHomeButton = (
      <button className="icon-button" title="Home" onClick={handlerGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};
export default DashFooter;
