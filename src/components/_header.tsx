import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';

interface HeaderProps {
  title: string;
  label_button1: string;
  label_button2: string;
}

const Header: React.FC<HeaderProps> = ({ title, label_button1, label_button2 }) => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand href="#home" className='text-light'>{title}</Navbar.Brand>
        <span className='d-flex gap-4'>
            <Button className='btn btn-success'>{label_button1}</Button>
            <Button className='btn btn-primary'>{label_button2}</Button>
        </span>
      </Container>
    </Navbar>
  );
};

export default Header;
