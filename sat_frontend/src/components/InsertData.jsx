import { Button, Card, CardContent, TextField } from '@mui/material';
import React from 'react';
import backgroundImage from '../images/main-bg.webp'
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import SatApis from '../service/SatApis';
import swal from 'sweetalert';
import { Home } from '@mui/icons-material';

export const InsertData = () => {
    const navigate = useNavigate();
    const initialData = {
        name: "",
        address: "",
        city: "",
        country: "",
        pinCode: "",
        satScore: ""
    }
    const [data, setData] = useState(initialData);
    const handleName = (e) => {
        setData({ ...data, name: e.target.value });
    }
    const handleAddress = (e) => {
        setData({ ...data, address: e.target.value });
    }
    const handleCity = (e) => {
        setData({ ...data, city: e.target.value });
    }
    const handleCountry = (e) => {
        setData({ ...data, country: e.target.value });
    }
    const handlePin = (e) => {
        setData({ ...data, pinCode: e.target.value });
    }
    const handleSatScore = (e) => {
        setData({ ...data, satScore: e.target.value });
    }
    const handleReset = (e) => {
        navigate("/")
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = {
            name: data.name,
            address: data.address,
            city: data.city,
            country: data.country,
            pinCode: data.pinCode,
            satScore: data.satScore
        };
        SatApis.insertData(newData).then(res => {
            if (res.data === null || res.data.name === null) {
                return swal("Something went wrong !!", "Details should not be empty", "warning");
            } else {
                swal("Successfully Done !!", "Details Submission is completed", "success");
                navigate("/")
            }
        }).catch(err => {
            swal("Something went wrong !!", "Details are already present with this name", "error");
            navigate("/insertData")
            e.preventDefault();
        })
    }
    const buttonStyle = {
        margin: '8px'
    };

    const cardStyle = {
        width: 'fit-content',
        padding: '16px',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        position: 'absolute',
        left: '250px',
        top: '50%',
        transform: 'translateY(-50%)',
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: '20px',
        position: 'relative',
    };

    const headingStyle = {
        marginBottom: '20px',
        marginTop: '20px',
        fontSize: '50px',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    const buttonContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gridGap: '8px',
    };

    return (
        <div style={containerStyle}>
            <Card style={cardStyle}>
                <CardContent>
                    <h2 style={headingStyle}>Enter Details</h2>
                    <div style={buttonContainerStyle}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleName} />
                        <TextField id="outlined-basic" label="Address" variant="outlined" onChange={handleAddress} />
                        <TextField id="outlined-basic" label="City" variant="outlined" onChange={handleCity} />
                        <TextField id="outlined-basic" label="Country" variant="outlined" onChange={handleCountry} />
                        <TextField id="outlined-basic" label="Pin Code" variant="outlined" onChange={handlePin} />
                        <TextField id="outlined-basic" label="Sat Score" variant="outlined" onChange={handleSatScore} />
                        <Button variant='contained' style={buttonStyle} endIcon={<SendIcon />} size='small' onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant='contained' type='button' style={{ ...buttonStyle, backgroundColor: '#f28e04' }} endIcon={<Home />} size='small' onClick={handleReset}>
                            Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
