
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Dashboard from './Components/Dashboard';
// import Hospital from './Components/Hospital';
// import SchoolRecord from './Components/SchoolRecord';
// import Record from './Record';
// import FetchApi from './Components/FetchApi';
import BookList from './Components/BookList';
// import Student from './Components/Student';
// import TvList from './Components/TvList';


function App() {
  return (
    <div>
      <Router>
        <Container>
          <Row>
            <Col sm={12}>
              <Routes>
                {/* <Route path='/' element={<Dashboard />}></Route> */}
                {/* <Route path='/' element={<Hospital />}></Route> */}
                {/* {<Route path="/" element={<SchoolRecord />}></Route>} */}
                {/* {<Route path="/" element={<Record />}></Route>} */}
                {/* {<Route path="/" element={<FetchApi />}></Route>} */}
                {<Route path="/" element={<BookList />}></Route>}
                {/* {<Route path="/" element={<Student />}></Route>} */}
                {/* {<Route path="/" element={<Child />}></Route>} */}
                {/* {<Route path="/" element={<CRUDWITHCLASS1 />}></Route>} */}
                {/* {<Route path="/" element={<TvList />}></Route>} */}




              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
