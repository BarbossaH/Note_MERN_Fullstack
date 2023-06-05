import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import Notes from './features/notes/Notes';
import Users from './features/users/Users';
import Surprise from './features/countdown/Countdown';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/count" element={<Surprise />}></Route>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
