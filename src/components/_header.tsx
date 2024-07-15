import { Button, Container, Navbar } from 'react-bootstrap';
import "../../public/css/style.css"

interface HeaderProps {
  title: string;
  label_button1: string;
  label_button2: string;
}

const Header: React.FC<HeaderProps> = ({ title, label_button1, label_button2 }) => {

  return (
    <Navbar bg="light" expand="lg" id="container-navbar">
      <Container className='d-flex justify-content-between' id='container-header'>
        <Navbar.Brand href="#home" id='title-header' className='text-dark'>{title}</Navbar.Brand>
        <span className='d-flex gap-4'>
            <Button className={'btn btn-primaty'}>{label_button1}</Button>
            <Button className={'btn btn-success'}>{label_button2}</Button>
        </span>
      </Container>
    </Navbar>
  );
};

export default Header;
