import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './Main.css'
import Main2 from './Main2';

interface props {
    updateMessage(m: string): void
}

interface rowSchema{
    id:number,
    title: string,
    body: string
}

const Main1: FC<props> = ({ updateMessage }) => {

    const [row, setRow] = useState<any[]>([]);

    const navigate = useNavigate();
    const goToFirst = () => {
        updateMessage("*Please Fill your details first*");
        navigate('/');
    }

    //Fetching data from API in JSON format
    const fetchData = async () => {
        const temp = await fetch("https://jsonplaceholder.typicode.com/posts");
        // To implement model interface of incoming data
        const tempJson: rowSchema[] = await temp.json();
        setRow(tempJson);
        // console.log(tempJson);
    }

    //Checking if user is trying to visit without filling the details
    useEffect(() => {
        let data:string|null = localStorage.getItem("user");
        // let data = localStorage.getItem("user");
        console.log(data);
        if (!data)
            goToFirst();
        else
        {
            localStorage.clear();
            fetchData();
        }
    }, [])


    //creating table columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'userId', headerName: 'User ID', width: 100 },
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
        },
        {
            field: 'body',
            headerName: 'Body',
            width: 400,
        }
    ];


    return (
        <div>
            <h1>Table Data</h1>
            <Box sx={{ height: 400, width: '100%', maxWidth: "1000px", margin: "auto" }}>
                <DataGrid
                    rows={row}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <Main2 />
        </div>
    )
}

export default Main1