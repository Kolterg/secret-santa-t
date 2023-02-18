import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Landing from './pages/landing/landing';
import Add from './pages/add/add';
import GetInTouchPage from './pages/getInTouch/getInTouch';

function App() {
  return (
    <div className="app wrapper">
      <Router>
        <header className="app-header">
          <Link to={''} className="link" >Головна</Link>
          <Link to={'add'} className="link" >Створити кімнату</Link>
          <Link to={'toch'} className="link" >Зв'язатися</Link>
        </header>
        <div className='contentBox'>
          <Routes className='content'>
            <Route path={'/'} element={<Landing />} />
            <Route path={'/add'} element={<Add />} />
            <Route path={'/toch'} element={<GetInTouchPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
