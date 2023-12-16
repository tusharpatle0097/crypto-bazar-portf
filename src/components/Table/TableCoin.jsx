import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { DarkModeContext } from '../context/DarkModeTheme';


const TableCoin = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);


    useEffect(() => {
        cryptoData();
    }, []);

    const cryptoData = () => {
        axios.get(`https://api.coingecko.com/api/v3/coins/?localization=false&sparkline=true`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Filtered items based on search term
    const filteredItems = currentItems.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className='mt-5'>
            <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 mb-4 bg-green-200"
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className={`${isDarkMode ? 'TableCoinDark' : 'TableCoinLight'}`}>
                    <TableHead>
                        <TableRow>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>No.</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Coin</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Symbol</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Price</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>24h</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>24h Volume</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Market</div></TableCell>
                            <TableCell><div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Last 7 days</div></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{indexOfFirstItem + index + 1}</div> </TableCell>
                                <TableCell>
                                    <div className={`flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        <img className='w-[25px]' src={item.image.small} alt="" />
                                        {item.name}
                                    </div>
                                </TableCell>

                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{item.symbol}</div> </TableCell>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>$ {item.market_data?.current_price?.usd}</div> </TableCell>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{item.market_data?.price_change_24h}</div> </TableCell>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{item.market_data?.total_volume?.usd}</div> </TableCell>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{item.market_data?.market_cap?.usd}</div> </TableCell>
                                <TableCell > <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{item.market_data?.price_change_percentage_7d}</div> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="flex justify-center mt-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                >
                    {'<'}
                </button>
                {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                    onClick={handleNextClick}
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default TableCoin;
