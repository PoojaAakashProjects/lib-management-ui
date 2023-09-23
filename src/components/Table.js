import { v5 as uuidv5 } from 'uuid';
import React, { useState, useEffect } from 'react';
import './Books.css'
import EditPopup from './EditPopup';
import AddPopup from './AddPopup';
import Features from './Features';
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';



const Table = (props) => {
    const namespace = "64bf8c86-e828-4b15-8cd9-c7a608498383";

    const [books, setBooks] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [updatedData, setUpdatedData] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [filterByTitle, setFilterTitle] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [filterApplied,setFilterApplied] = useState({});
    const [isFiltersApplied , setIsFiltersApplied] = useState(false)

    const onFilterInputchange = (value) => {
        setFilterTitle(value);
    }

    const onFilterApply = (filterData) => {
        setFilterApplied(filterData)
    }

    const handleClearFilters = () => {
        setFilterApplied({});
        setIsFiltersApplied(false);
    }

    const fetchAllBooks = async () => {
        try {
            console.log('send filter data ',filterApplied)
            let url = `${process.env.REACT_APP_BACKEND_URL}/get-books-list?page=${page}&pageSize=${pageSize}`;
            let headers = {
                "Content-Type": "application/json"
            }
            let requestOptions = {
                headers,
                "method":"POST",
                "body":JSON.stringify(filterApplied)
            }
            const booksResponse = await fetch(url, requestOptions);
            const response = await booksResponse.json();
            console.log(response)
            if (booksResponse.status === 200) {
                setBooks(response.data);
                setTotalPages(response.totalPages);
            }


        } catch (error) {
            setDataFetched(true);
        }
    }


    useEffect(() => {
        fetchAllBooks();
        setDeleted(false);
        setUpdatedData(false);
        setIsAdding(false);
        
    }, [deleted, updatedData, page, pageSize,filterApplied])

    //pagination methods
    const handlePageChange = (newPage) => {

        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const onCancel = () => {
        setIsEditing(false);
        setIsAdding(false);
    }

    //add a book
    const onAdd = async (data) => {
        console.log('add data ', data);
        try {

            let id = uuidv5(data.title.toLowerCase() + data.author.toLowerCase(), namespace);
            data['bookId'] = id
            let dataarr = []
            dataarr.push(data)
            const url = `${process.env.REACT_APP_BACKEND_URL}/add-book`;
            let headers = {
                "Content-Type": "application/json",
            }
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dataarr),
            };
            const res = await fetch(url, requestOptions);
            const resJSON = await res.json();
            if (resJSON.success === true) {
                setIsAdding(false);
                setUpdatedData(true);
            }

        } catch (error) {

        }
    }

    const handleAdd = () => {
        setIsAdding(true);
    }

    //edit a book
    const onSave = async (data) => {
        console.log('saved data ', data)
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/update-book`;
            let headers = {
                "Content-Type": "application/json",
            }
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            };
            const res = await fetch(url, requestOptions);
            const resJSON = await res.json();
            if (resJSON.success === true) {
                setUpdatedData(true);
                setIsEditing(false);
            }

        } catch (error) {

        }
    }

    const handleEdit = (title, author, genre, publicationYear, bookId) => {
        let obj = { title, author, genre, publicationYear, bookId }
        setEditRow(obj);
        setIsEditing(true)
    }

    //delete a book
    const handleDelete = async (title, author) => {
        try {

            let id = uuidv5(title.toLowerCase() + author.toLowerCase(), namespace);
            const url = `${process.env.REACT_APP_BACKEND_URL}/delete-book?id=${id}`;
            let headers = {
                "method": "DELETE",
                "Content-Type": "application/json"
            }
            const res = await fetch(url, headers);
            const resJSON = await res.json();
            if (resJSON.success === true) {
                setDeleted(true);
            }

        } catch (error) {

        }
    }

    return (
        <div>
            {
                isEditing && <EditPopup data={editRow} onSave={onSave} onCancel={onCancel} />
            }
            {
                !isAdding && !isEditing &&
                <div className='container'>
                    <div className='table-container'>
                        <Features onClickAdd={handleAdd} onFilterInputchange={onFilterInputchange}
                            handlePageChange={handlePageChange} page={page} totalPages={totalPages}
                            onFilterApply = {onFilterApply} handleClearFilters = {handleClearFilters}
                            isFiltersApplied={isFiltersApplied} setIsFiltersApplied ={setIsFiltersApplied}
                        />
                        <table>
                            <tr className='table-header'>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Publication year</th>
                                <th></th>
                                <th></th>
                            </tr>

                            {
                                books.length ?
                                    books.filter((item) => {
                                        return filterByTitle === '' ? item : item.title.toLowerCase().includes(filterByTitle)
                                    }).
                                        map((item, index) => {
                                            return (
                                                <tr className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                                                    <td><Link state={item} to={`/details/${item?.bookId}`}>{item.title}</Link> </td>
                                                    <td>{item.author}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.publicationYear}</td>
                                                    <td><button onClick={() => handleDelete(item.title, item.author)}>Delete</button></td>
                                                    <td><button onClick={() => handleEdit(item.title, item.author, item.genre, item.publicationYear, item.bookId)}>Edit</button></td>
                                                </tr>)
                                        })
                                    :
                                    <div style={{ fontSize: "50px", display: "flex", alignItem: "center" }}> <CircularProgress /></div>
                            }
                        </table>
                    </div>
                </div>
            }

            {
                isAdding && <AddPopup onAdd={onAdd} onCancel={onCancel} />
            }


        </div>


    )
}

export default React.memo(Table)