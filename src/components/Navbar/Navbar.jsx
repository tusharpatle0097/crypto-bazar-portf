import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeTheme';

const Navbar = () => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    console.log(isDarkMode, "//??/")

    const darkButton = <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" className="text-primary text-2xl mr-2 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>
    const lightButton = <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="text-primary text-2xl mr-2 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    return (
        <div>
            <nav className={`flex rounded items-center justify-between flex-wrap p-6 lg:text-center ${isDarkMode?'bg-[#232126]':'bg-[#eae6f0]'}`}>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className={`font-semibold text-xl tracking-tight  ${isDarkMode?'text-white':'text-black'}`}>CryptoBazar</span>
                </div>

                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <div className="flex items-center cursor-pointer text-center">
                            <button onClick={toggleDarkMode} className='flex'> <span>{isDarkMode?darkButton:lightButton}</span> <span>{isDarkMode?'Enable Light mode':'Enable Dark Mode'}</span></button>
                            
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar