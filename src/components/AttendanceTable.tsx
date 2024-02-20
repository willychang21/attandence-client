// AttendanceTable.tsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Paper, TextField, Button, Grid, Toolbar } from '@mui/material';
import { useStore } from '../store/store';
import axios from 'axios';

const AttendanceTable: React.FC = () => {
    const { records, setRecords, removeRecord } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/attendance');
                setRecords(response.data); // Use setRecords to update the state with fetched data
            } catch (error) {
                console.error('Failed to fetch records:', error);
            }
        };

        fetchRecords();
    }, [setRecords]);

    const handleDelete = async (_id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/attendance/${_id}`);
            removeRecord(_id);
        } catch (error) {
            console.error('Failed to delete record:', error);
        }
    };

    const handleSearch = async () => {
        // Implement search functionality. This example fetches all and filters on the frontend for simplicity.
        // For a large dataset, implement backend search and call it here.
        if (!searchQuery) {
            // Fetch all records if search query is empty
            const response = await axios.get('http://localhost:3000/api/attendance');
            setRecords(response.data);
        } else {
            // Example frontend filter, replace with API call for backend filtering
            const filteredRecords = records.filter(record => record.netID.includes(searchQuery) || record.uin.includes(searchQuery));
            setRecords(filteredRecords);
        }
    };

    return (
        <>
            <Paper style={{ margin: '16px', padding: '16px' }}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Search by NetID or UIN"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ height: 56 }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearch}
                                style={{ height: 56, boxSizing: 'border-box' }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>NetID</TableCell>
                            <TableCell>UIN</TableCell>
                            <TableCell>Class ID</TableCell>
                            <TableCell>Taken By</TableCell>
                            <TableCell>Short Code</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record, index) => {
                                const recordDate = new Date(record.date);
                                const displayDate = recordDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                const displayTime = recordDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                                return (
                                    <TableRow key={record._id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{record.netID}</TableCell>
                                        <TableCell>{record.uin}</TableCell>
                                        <TableCell>{record.classId}</TableCell>
                                        <TableCell>{record.takenBy}</TableCell>
                                        <TableCell>{record.shortcode}</TableCell>
                                        <TableCell>{displayDate}</TableCell>
                                        <TableCell>{displayTime}</TableCell> {/* Display time here */}
                                        <TableCell>
                                            <Button onClick={() => handleDelete(record._id)} color="error">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>

                </Table>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
        </>
    );
};

export default AttendanceTable;
