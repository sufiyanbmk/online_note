import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  const navigate = useNavigate()
  return (
    <Navbar className="bg-body-tertiary m-4">
      <Container>
        <Navbar.Brand href="/">ONLINE NOTE</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant='danger' onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')}}>LOG OUT</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;