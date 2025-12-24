import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, addNewStudent, deleteStudent } from '../features/students/studentSlice';

const StudentComponent = () => {

  const { list: students, loading } = useSelector(state => state.students);
  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(()=> {
    console.log('hare')
    dispatch(fetchStudents());
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewStudent(student));
    setStudent({ id: '', firstName: '', lastName: '', email: '' });
  };

  return (
    <div>
      <h2>Student Management</h2>

      <form onSubmit={handleSubmit}>
      
        <input
          type="text"
          placeholder="First Name"
          value={student.firstName}
          onChange={e => setStudent({ ...student, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={student.lastName}
          onChange={e => setStudent({ ...student, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
        />
        <button type="submit">Add Student</button>
      </form>

      <h3>Student List</h3>
     
      <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
               {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>
                      <button onClick={() => dispatch(deleteStudent(student.id))}>Delete</button>
                    </td>
                    
                  </tr>
                ))}
          </tbody>
        </table>
    </div>
  );
};

export default StudentComponent;