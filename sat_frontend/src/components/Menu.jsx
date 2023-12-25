import { Button, Card, CardContent } from '@mui/material';
import React from 'react';
import backgroundImage from '../images/main-bg.webp'
import { useNavigate } from 'react-router-dom';
import { Add, Delete, MilitaryTechRounded, Update, ViewListRounded } from '@mui/icons-material';

export const Menu = () => {
  const navigate = useNavigate();
  const buttonStyle = {
    margin: '25px',
    backgroundColor: '#f89515',
    fontWeight: 'bolder',
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

  const insertData = () => {
    navigate("/insertData")
  }
  const viewAllData = () => {
    navigate("/satResults")
  }
  const updateScore = () => {
    navigate("/satResults")
  }
  const getRank = () => {
    navigate("/satResults")
  }
  const deleteData = () => {
    navigate("/satResults")
  }
  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <h2 style={headingStyle}>SAT Results Menu</h2>
          <div style={buttonContainerStyle}>
            <Button variant='contained' style={buttonStyle} onClick={insertData} endIcon={<Add />}>
              Insert Result
            </Button>
            <Button variant='contained' style={buttonStyle} onClick={viewAllData} endIcon={<ViewListRounded />} >
              View All Results
            </Button>
            <Button variant='contained' style={buttonStyle} onClick={getRank} endIcon={<MilitaryTechRounded />}>
              Get Rank
            </Button>
            <Button variant='contained' style={buttonStyle} onClick={updateScore} endIcon={<Update />}>
              Update Score
            </Button>
            <Button variant='contained' style={buttonStyle} onClick={deleteData} endIcon={<Delete />}>
              Delete Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
