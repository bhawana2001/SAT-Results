import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import backgroundImage from '../images/main-bg.webp'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import SatApis from '../service/SatApis';
import WestIcon from '@mui/icons-material/West';
import IconButton from '@mui/material/IconButton';
import { Delete, MilitaryTechRounded, ModeEditRounded } from '@mui/icons-material';


export const GetAllResults = () => {
  const cardStyle = {
    width: 'fit-content',
    padding: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    position: 'absolute',
    left: '0px',
    top: '26%',
    transform: 'translateY(-50%)'
  };
  const tableContainerStyle = {
    maxHeight: '80vh',
    maxWidth: '135vh',
    overflowY: 'auto',
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
    marginTop: '300px',
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
  };
  const tableRowtyle = {
    backgroundColor: 'orange',

  }
  const tableStyle = {
    backgroundColor: '#79c5d2'
  }
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const fetchAllResults = async () => {
    try {
      const response = await SatApis.getAllData();
      setResults(response.data);
    } catch (error) {
      swal("Something went wrong !!", "Error in fetching results", "error");
    }
  };

  useEffect(() => {
    fetchAllResults();
  }, []);

  const handleReload = () => {
    navigate("/")
  }

  //delete data
  const handleDelete = async (name) => {
    try {
      // Show confirmation dialog
      const confirmDelete = await swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Yes, delete it!"],
        dangerMode: true,
      });

      if (confirmDelete) {
        // Perform deletion
        await SatApis.deleteResultByName(name);
        // Remove the deleted result from the state
        setResults(results.filter(result => result.name !== name));
        swal("Deleted!", "Your result has been deleted.", "success");
      }
    } catch (error) {
      swal("Error", "Could not delete the file.", "error");
    }
  };

  //fetch rank
  const handleGetRank = async (name) => {
    try {
      const fetchedRank = await SatApis.getRankByName(name);
      swal({
        title: `🏆 Rank Achieved!`,
        text: `${name} achieved rank:`,
        icon: null,
        buttons: false,
        content: {
          element: 'h1',
          attributes: {
            innerHTML: fetchedRank,
            style: 'font-size: 40px; margin-top: 20px;',
          },
        },
        closeOnClickOutside: false,
        timer: 10000,
        buttons: {
          close: {
            text: 'Close',
            value: null,
            visible: true,
            className: 'swal-close-button',
          },
        },
      }).then((value) => {
        if (value === 'close') {
          navigate("/satResults")
        }
      });
    } catch (error) {
      swal("Error", "Could not fetch rank.", "error");
    }
  };

  // Update data
  const handleUpdate = async (name, currentScore) => {
    try {
      const newScore = await swal({
        title: `Update SAT Score for ${name}`,
        text: `Current SAT Score: ${currentScore}`,
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Enter new SAT score',
            type: 'number',
          },
        },
        buttons: {
          cancel: 'Cancel',
          confirm: 'Update',
        },
      });

      if (newScore === null || newScore === "") {
        swal('Cancelled', 'No changes made', 'info');
      } else {
        const confirmUpdate = await swal({
          title: 'Are you sure?',
          text: `Update ${name}'s SAT Score to ${newScore}?`,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });

        if (confirmUpdate) {
          const parsedScore = parseInt(newScore);
          await SatApis.updateScoreByName(name, parsedScore);
          swal('Updated!', 'SAT score has been updated', 'success');
          fetchAllResults();
        } else {
          swal('Cancelled', 'No changes made', 'info');
        }
      }
    } catch (error) {
      swal('Error', 'Could not update SAT score', 'error');
    }
  };


  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <h2 style={headingStyle}>List of All SAT's Results <Tooltip title='Go Back To Home'><IconButton size='large' onClick={handleReload}>
            <WestIcon size='large' />
          </IconButton></Tooltip></h2>
          <div style={tableContainerStyle}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={tableRowtyle}>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>SAT Score</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Gat Rank</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index} style={tableStyle}>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>{result.address}</TableCell>
                      <TableCell>{result.city}</TableCell>
                      <TableCell>{result.country}</TableCell>
                      <TableCell>{result.pincode}</TableCell>
                      <TableCell>{result.satScore}</TableCell>
                      <TableCell>{result.passed ? <Button variant='contained' color='success' size='small'>Passed</Button> : <Button variant='contained' color='error' size='small'>Failed</Button>}</TableCell>
                      <TableCell><Tooltip title='Get Rank'><IconButton onClick={() => handleGetRank(result.name)}><MilitaryTechRounded /></IconButton></Tooltip></TableCell>
                      <TableCell><Tooltip title='Update Result'><IconButton onClick={() => handleUpdate(result.name, result.satScore)}><ModeEditRounded /></IconButton></Tooltip></TableCell>
                      <TableCell><Tooltip title='Delete Result'><IconButton onClick={() => handleDelete(result.name)}><Delete /></IconButton></Tooltip></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
