import { Link } from "react-router-dom"

export const HeaderComponent = ({ selectHeader, title }) => {
    return (
        <>
            <header className="bg-blue-500 p-4 shadow-md">
                <div className={selectHeader === 1 ? "text-center" : "flex items-center justify-between"}>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    {selectHeader === 2 && (
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
                    )}
                </div>
            </header>
            <nav className="bg-white-100 flex justify-end space-x-4 pr-2">
                <button 
                    className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition duration-300"
                    
                    >
                    Login
                </button>
                <button 
                    className="bg-green-700 text-white mt-2 px-4 py-2 rounded-md font-bold hover:bg-green-500 transition duration-300"
                    
                    >
                    Criar Conta
                </button>
            </nav>
        </>
    )
}
