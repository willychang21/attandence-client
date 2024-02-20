import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useStore } from '../store/store.ts';
import axios from 'axios';

const AddAttendancePopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [netID, setNetID] = useState('');
  const [uin, setUIN] = useState('');
  const [classId, setClassId] = useState('');
  const [takenBy, setTakenBy] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(' ')[0]);
  const addRecord = useStore((state) => state.addRecord);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const combinedDateTime = new Date(`${date}T${time}`);
      const recordToSend = { netID, uin, classId, takenBy, shortcode, date: combinedDateTime };
      const response = await axios.post('http://localhost:3000/api/attendance', recordToSend);
      const savedRecord = response.data;
      addRecord(savedRecord);
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setNetID('');
    setUIN('');
    setClassId('');
    setTakenBy('');
    setShortcode('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().split(' ')[0]);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Attendance</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Attendance Record</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="netID"
              label="NetID"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={netID}
              onChange={(e) => setNetID(e.target.value)}
            />
            <TextField
              margin="dense"
              id="uin"
              label="UIN"
              type="text"
              fullWidth
              variant="outlined"
              value={uin}
              onChange={(e) => setUIN(e.target.value)}
            />
            <TextField
              margin="dense"
              id="classId"
              label="Class ID"
              type="text"
              fullWidth
              variant="outlined"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
            <TextField
              margin="dense"
              id="takenBy"
              label="Taken By"
              type="text"
              fullWidth
              variant="outlined"
              value={takenBy}
              onChange={(e) => setTakenBy(e.target.value)}
            />
            <TextField
              margin="dense"
              id="shortcode"
              label="Short Code"
              type="text"
              fullWidth
              variant="outlined"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
            <TextField
              margin="dense"
              id="date"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              margin="dense"
              id="time"
              label="Time"
              type="time"
              fullWidth
              variant="outlined"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAttendancePopup;
