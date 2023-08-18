import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './home.css'
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface props {
    message: string
}

const Home: FC<props> = ({ message }) => {

    const navigate = useNavigate();

    const saveDetails = (e: any) => {
        let name: string | null = (document.getElementById('name') as HTMLInputElement).value;
        let phone: string | null = (document.getElementById('phone') as HTMLInputElement).value;
        let email: string | null = (document.getElementById('email') as HTMLInputElement).value;
        // console.log(name);
        e.preventDefault();
        let obj = {
            name: name,
            phone: phone,
            email: email
        }
        console.log(obj);
        localStorage.setItem("user", JSON.stringify(obj));
        navigate('/main');
    }

    return (
        <div className='form'>
            <h2>{message}</h2>
            <h1>Enter Your Details</h1>
            <form onSubmit={(e) => { saveDetails(e) }}>
                <TextField fullWidth label="Enter your name" type='text' required id="name" variant="outlined" margin="normal" />
                <TextField fullWidth label="Enter your phone" type='phone' required id="phone" variant="outlined" margin="normal" />
                <TextField fullWidth label="Enter your email" type='email' required id="email" variant="outlined" margin="normal" />
                <Button variant="contained" type='submit'>Save</Button>
            </form>
        </div >
    )
}

export default Home