import { Button, Container, Navbar } from 'react-bootstrap';
import "../../public/css/style.css"
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  label_button1: string;
  label_button2: string;
  onClickBtn1: () => void
  onClickBtn2: () => void
}

const Header: React.FC<HeaderProps> = ({ title, label_button1, label_button2, onClickBtn1, onClickBtn2}) => {

  return (
    <Navbar bg="light" expand="lg" className='sticky-top' id="container-navbar">
      <Container className='d-flex justify-content-between' id='container-header'>
        <Link to={"/"} className='navbar-brand text-dark' id='title-header'>
          {title}
        </Link>
        <div className='d-flex justify-content-around' id="buttons-container">
        <span className='d-flex gap-4'>
            <Button className={'btn btn-success'} onClick={onClickBtn1}>{label_button1}</Button>
            <Button className={'btn btn-primary'} onClick={onClickBtn2}>{label_button2}</Button>
        </span>
        </div>
        
      </Container>
    </Navbar>
  );
};

export default Header;
