import { Link } from "react-router-dom"

export const HeaderComponent = ({ selectHeader, title }) => {
    if (selectHeader === 1) {
        return <HeaderComponentTitle title={title} />
    } else if (selectHeader === 2) {
        return <HeaderComponentWithLinks title={title} />
    } else {
        return null; 
    }
}

const HeaderComponentTitle = ({ title }) => {
    return(
        <header className="text-center bg-blue-500 p-4 shadow-md">
            <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
        </header>
    )
}

const HeaderComponentWithLinks = ({ title }) => {
    return(
        <header className="flex items-center justify-between bg-blue-500 p-4 shadow-md">
            <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            <div className="flex space-x-4 text-white">
                <Link 
                    to="/" 
                    className="cursor-pointer hover:text-blue-200 transition duration-300">
                    Home
                </Link>
                <Link 
                    to="/about" 
                    className="cursor-pointer hover:text-blue-200 transition duration-300">
                    Quem somos
                </Link>
                <Link 
                    to="/contact" 
                    className="cursor-pointer hover:text-blue-200 transition duration-300">
                    Contatos
                </Link>
            </div>
        </header>
    )
}
