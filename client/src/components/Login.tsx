import { useState, ChangeEvent  } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import { LoginInterface } from '../types/Authentication';
import toast from 'react-hot-toast';
import { postForm } from '../axios/Api';

const Login: React.FC = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginInterface>({ email: '', password: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        if(!formData.email){
          toast("Please fill in the credentials")
          return
        }
        const res = await postForm('/login',formData)
        if(res.data.success){
          toast.success("login succesfull")
          localStorage.setItem("token",res.data.token)
          navigate('/')
        }else{
          toast.error(res.data.message)
        }
      }catch(error){
        // eslint-disable-next-line no-console
        console.log(error);
      }
   
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Card>
      <Card.Body>
        <h1 className="mb-4 text-center">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </Form>
        <p>Not member? <Link to="/signup"><span>SIGNUP</span></Link></p>
      </Card.Body>
    </Card>
  </div>
  );
};

export default Login;