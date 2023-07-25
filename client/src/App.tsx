import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import NewNote from "./components/NewNote";
import Home from "./components/Home";
import Layout from "./Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SingleNote from "./components/SingleNote";

function App() {
  return (
    <Container className="my-4">
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-note" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<SingleNote />} />
          {/* <Route path="edit" element={<h1>edit</h1>} /> */}
        </Route>
        <Route path="*" element={<h1> Not Found</h1>} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;
