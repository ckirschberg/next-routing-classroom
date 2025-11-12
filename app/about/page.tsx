'use client';

import { MyButton } from "../components/MyButton";

function greeting(name: string) {
    console.log("Hello " + name.toUpperCase());
}
greeting("123");

type Student = {
    name: string;
    email: string;    
};

function printStudentAndReturn(student: Student): string {
    console.log("Name: " + student.name);
    console.log("Email: " + student.email);
    return student.name;
}

function printStudents(students: Student[]) {
    for (const student of students) {
        console.log("Name: " + student.name);
        console.log("Email: " + student.email);
    }
}

export default function AboutPage() {

    const student: Student = {
        name: "John Doe",
        email: "Lx5aU@example.com"
    }
    const name: string = printStudentAndReturn(student);

    const students: Student[] = [{
            name: "John Doe",
            email: "Lx5aU@example.com"
        },
        {
            name: "Jane Doe",
            email: "jane.doe@me.com"
        }
    ];
    printStudents(students);

    const handleClick = () => {
        alert("Hej")
    }

    return (
        <div>
            <h1>About Page</h1>
            <MyButton label="HEJ DAYAN!" onClick={handleClick}/>
        </div>
    );
}