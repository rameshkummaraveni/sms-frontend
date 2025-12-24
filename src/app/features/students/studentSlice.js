import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false,
  error: null,
  showForm: false // local UI state
};

//Get All Students details
export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async () => {
        const response = await axios.get('http://localhost:8080/api/students');
        return response.data; // return array of students
    }
);

// Add New Student details
export const addNewStudent = createAsyncThunk(
  'students/addStudentAsync',
  async (student) => {
    const response = await axios.post(
      'http://localhost:8080/api/students', 
      student
    );
    return response.data; // the saved student returned from backend
  }
);

// Add New Student details
export const deleteStudent = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    return id; // the saved student returned from backend
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.showForm = !state.showForm;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchStudents.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchStudents.rejected, (state) => { state.loading = false; state.error = 'Failed to load students'; })

      .addCase(addNewStudent.pending, (state) => { state.loading = true; })
      .addCase(addNewStudent.fulfilled, (state, action) => { state.loading = false; state.list.push(action.payload); })
      .addCase(addNewStudent.rejected, (state) => { state.loading = false; state.error = 'Failed to add student'; })

      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.id !== action.payload);
      });
  }
});

export const { toggleForm } = studentSlice.actions;

export default studentSlice.reducer;