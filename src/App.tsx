import './App.css'
import AttendanceTable from './components/AttendanceTable';
import AddAttendancePopup from './components/AddAttendancePopup';
import { Container } from '@mui/material';


function App() {
  return (
    <Container>
      <h1>Attendance Records</h1>
      <AddAttendancePopup />
      <AttendanceTable />
    </Container>
  );
}

export default App
