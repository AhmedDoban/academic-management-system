# Academic Management System

![Project Image](https://github.com/AhmedDoban/academic-management-system/assets/73547094/587e1b5f-654d-4da3-9e6f-9ecc2d46d41a)

## Overview

Our Graduation Project, the Academic Management System, revolutionizes academic interactions by integrating course materials, assessments, communication tools, and administrative functions into a centralized platform. This system caters to students, instructors, parents, and administrators, fostering collaboration and enhancing the educational experience through innovative features.

## Introduction

The Academic Management System is an online software system designed to support teaching and learning in an educational setting. It facilitates online teaching and learning by providing tools for instructors to engage with students effectively. It also offers features like TODO notes and library access to support students in their studies.

## Features

### Student Page

- Access courses and submit assignments.
- Engage with peers through discussion forums.
- View course materials, including videos.
- Participate in live video calls and chat sessions with instructors and classmates.
- Complete exams online.

### Instructor Page

- Create and manage courses.
- Upload course materials and schedule video lectures.
- Conduct live video calls for virtual office hours.
- Provide feedback on assignments and administer exams.
- Facilitate communication with students through chat.

### Parent Page

- Monitor child's academic progress, including exam scores and attendance records.
- Access course materials and view video lectures.
- Communicate with instructors regarding child's performance.
- Participate in video calls with instructors to discuss child's education.

### Admin Page

- Oversee system functionality and manage user accounts.
- Monitor course activity and generate reports on student performance and system usage.
- Provide technical support to users and ensure smooth operation of the system.

## Future Enhancements

As part of our commitment to continuous improvement, future enhancements to the Academic Management System may include:

- Integration with learning analytics tools for insights into student engagement and learning outcomes.
- Enhanced security features to protect user data and ensure compliance with privacy regulations.
- Integration with external video conferencing platforms for seamless communication and collaboration.
- Accessibility improvements to ensure usability by all users, including those with disabilities.

Our Graduation Project aims to redefine academic management, offering a comprehensive solution that empowers users to achieve their educational goals effectively and efficiently.

## 🚀 [Demo](https://academic-management-system-git-main-ahmeddoban.vercel.app)

## Project Screenshots

![Screenshot 1](https://github.com/AhmedDoban/academic-management-system/assets/73547094/86a21ac8-ff2c-4cf2-8fb1-7e383ffcbb69)
![Screenshot 2](https://github.com/AhmedDoban/academic-management-system/assets/73547094/ae53a8f1-fe41-4dd4-920a-312fab109f7c)
![Screenshot 3](https://github.com/AhmedDoban/academic-management-system/assets/73547094/67f5179d-709d-4ac3-8fa8-33568e5c324b)

## 🧐 Additional Features

<details open >
<summary>Student Classroom</summary>

The classroom feature provides the following functionalities:

- **Exam**: Allows instructors to create and manage exams for students.
- **Course videos**: Enables instructors to upload and manage course videos for students to access.
- **Summary**: Allows instructors to provide summary notes or key points for each lesson.
- **Call Room**: Facilitates live video calls for virtual meetings or discussions.
- **Notification**: Sends notifications to students regarding important updates or announcements.
- **Inquiry**: Allows students to ask questions or seek clarification from instructors.
- **Chat**: Enables real-time communication between students and instructors.
- **Chat Bot**: Provides automated assistance or responses to common inquiries.

</details>

<details open>
<summary>Instructor Page</summary>

The instructor page offers the following features for course management and communication:

- **Create / update / delete Exams**: Instructors can create, update, or delete exams for assessment purposes.
- **Show / Hide Course videos**: Allows instructors to control the visibility of course videos for students.
- **Create / update / delete Summary**: Provides the ability to create, update, or delete summary notes for each lesson.
- **Call Room**: Enables instructors to host live video calls for virtual office hours or discussions.
- **Notification**: Sends notifications to students regarding course updates or announcements.
- **Answer / update / delete Inquiry**: Instructors can respond to student inquiries, update responses, or delete inquiries if necessary.
- **Chat**: Facilitates communication between instructors and students through real-time chat.

</details>

<details open>
<summary>Other features</summary>

These additional features enhance the overall functionality and user experience of the system:

- **Classroom Table**: Provides a centralized overview of classroom activities, schedules, and assignments.
- **Todo**: Allows students to create and manage to-do lists to stay organized with their tasks.
- **Notes**: Provides a platform for students to take and manage lecture notes for easy reference.
- **Library**: Offers access to an online library of resources and materials to support student learning.
- **Parent Page**: Enables parents to monitor their child's academic progress, communicate with instructors, and stay informed about their child's education.

</details>

## Installation

### Requirements

Before proceeding with the installation, make sure you have the following prerequisites installed on your system:

- Node.js
- MongoDB
- npm (Node.js package manager, usually comes with Node.js installation)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AhmedDoban/academic-management-system.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd academic-management-system
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env` file in the root directory of the project and specify the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/academic_management_system
   ```

   Replace `mongodb://localhost:27017/academic_management_system` with your MongoDB connection URI.

5. **Start the application:**

   ```bash
   npm start
   ```

6. **Access the application:**

   Open a web browser and navigate to `http://localhost:3000` to access the Academic Management System.

7. **Set up admin account:**

   Upon accessing the application for the first time, you'll be prompted to create an admin account. Follow the on-screen instructions to complete the setup.

8. **Enjoy using the Academic Management System!**

   You're all set! Explore the features and functionalities of the system to manage academic activities efficiently.
