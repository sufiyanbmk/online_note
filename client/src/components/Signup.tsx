import React, { useState, ChangeEvent } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import { SignupInterface } from '../types/Authentication';
import toast from 'react-hot-toast';
import { isValidEmail, isValidName, validatePassword } from '../utils/Validation';
import { postForm } from '../axios/Api';

const Signup: React.FC = () => {

    const navigate = useNavigate()
  const [formData, setFormData] = useState<SignupInterface>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if (!formData.email || !formData.name || !formData.password) {
          toast.error('Please fill in the credentials');
        } else {
          if (!isValidName(formData.name)) {
            toast.error('Enter a valid name');
          }
          if(!isValidEmail(formData.email)){
              toast.error("Enter valid email")
          }
          if (validatePassword(formData.password)) {
            toast.error(validatePassword(formData.password));
          }else if(formData.password!==formData.confirmPassword){
            console.log(formData.password, formData.confirmPassword)
            toast.error('password mismatch')
          }
          if (
            isValidName(formData.name) &&
            !validatePassword(formData.password) &&
            formData.password===formData.confirmPassword &&
            isValidEmail(formData.email)
          ) {
            // delete formData.confirmpassword
            const { email } = formData
            const existUser = await postForm('/existUser',{email})
            console.log(existUser);
            if (existUser.data.success) {
              postForm('/register',formData).then(()=>{
                navigate('/login')
              })
            } else {
              toast.error('The email is already registered')
            }
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card>
        <Card.Body>
          <h1 className="mb-4 text-center">Signup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
          <p>Already Login <Link to="/login"><span>LOGIN</span></Link></p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
