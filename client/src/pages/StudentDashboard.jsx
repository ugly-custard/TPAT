import React, { useEffect, useState } from "react";
import "../styles/StudentDashboard.css";
import TeacherCard from "../components/TeacherCard";

function StudentDashboard() {

  const [teachers, setTeachers] = useState([])
  const [student, setStudent] = useState({})

  const getStudentInfo = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken;
      const response = await fetch('http://localhost:5000/api/students/getstudentbyid', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authtoken
        }
      })
      if (response.status === 200) {
        const data = await response.json();
        setStudent(data);
        console.log(data)
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }



  const getTeachers = async () => {
    try {
      const response = await fetch("/api/teachers");
      const jsonData = await response.json();
      setTeachers(jsonData.teachers);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTeachers()
    getStudentInfo()
  }, [])

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>{student.name}</h2>
      <p>{student.email}</p>
      <p>{student.phone}</p>
      <p>Rate Your Teachers</p>
      {teachers.map((teacher) => {
        console.log(teacher.teacherID);
        return (
          <TeacherCard
            key={teacher.teacherID}
            id={teacher.teacherID}
            name={teacher.name}
            email={teacher.email}
            phone={teacher.phone}
            score={teacher.reviewScore}
          />
        );
      })}
    </div>
  );
}

export default StudentDashboard;
