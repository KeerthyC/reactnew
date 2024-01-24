import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import UserLogin1 from './User/UserLogin1';
import UserTest from './User/UserTest';
import UserPostmsg from './User/UserPostmsg';
import UserCompleted from './User/UserCompleted';
import UserRegistrationPage from './User/UserRegistration';
import Firebasecheck from './User/firebasecheck';
import Uservideo from './User/UserVideo';
import AdminUserLists from './admin/AdminUserList';
import Newdash from './admin/dashboard/Dashboard';
import DashCandidates from './admin/dashboard/Candidates';
import DashCandidatesList from './admin/dashboard/CandidatesTest';
import CandidateReview from './User/UserRating';
import SqlEditor from './User/MonacoEditor';
import ProtectedRoute from './admin/utils/ProtectedRoute';
import CandidateFilterWip from './admin/dashboard/CandidateFilterwip1';




import NotFoundPage  from './User/NotFoundPage';

//From Vysakh//


import CandidateForm from './components/CandidateForm';
import ThankYouPage from './components/ThankYouPage';
import JupyterNotebookComponent from './User/JupyterNotebookComponent';
import UserPremsg2 from './User/UserPremsg2';



const userdata = [
  {
    "id": 3,
    "name": "Vysakh Chandran",
    "email": "vysakh@gmail.com",
    "phone_number": "2323232323",
    "current_salary": "10.00",
    "expected_salary": "15.00",
    "applied_on": "2024-01-11T09:12:00.455267Z",
    "resume": "https://dev.heineken.londonladder.com/resumes/resumes/281603fe-b3f6-4550-80a4-8d9dfe5c4132.pdf",
    "notice_period_length": 60,
    "total_years_exp": 15,
    "job_posting_title": "DAE-981127",
    "uuid": "154389e9-3738-43f7-ac66-e362b569eb62",
    "user_current_status": "Screened",
    "comments": "njknka",
    "questions": [
        {
            "id": 3,
            "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
            "type": "slider",
            "answer_text": 2.0
        },
        {
            "id": 4,
            "question_text": "How many years have you spent working with various data modeling approaches",
            "type": "slider",
            "answer_text": 2.5
        },
        {
            "id": 5,
            "question_text": "Whats your experience in building ETL data pipelines",
            "type": "slider",
            "answer_text": 2.5
        },
        {
            "id": 6,
            "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
            "type": "slider",
            "answer_text": 2.5
        },
        {
            "id": 7,
            "question_text": "Whats your experience with Azure CI/CD and ML",
            "type": "slider",
            "answer_text": 2.0
        },
        {
            "id": 8,
            "question_text": "Whats your experience in version control systems like git",
            "type": "slider",
            "answer_text": 3.0
        }
    ]
},
{
    "id": 4,
    "name": "Test",
    "email": "vysakh@gmail.com",
    "phone_number": "2323232323",
    "current_salary": "13.90",
    "expected_salary": "44.70",
    "applied_on": "2023-12-27T09:40:17.015466Z",
    "resume": "https://dev.heineken.londonladder.com/resumes/resumes/d188965f-91a3-4757-bb1e-a9b36a2aab90.pdf",
    "notice_period_length": 60,
    "total_years_exp": 18,
    "job_posting_title": "DAE-981127",
    "uuid": "d3bd2a86-7139-40a4-841e-26df8b9c06a9",
    "user_current_status": "Theoretical Round",
    "comments": "bjjhjhj",
    "questions": [
        {
            "id": 3,
            "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
            "type": "slider",
            "answer_text": 3.0
        },
        {
            "id": 4,
            "question_text": "How many years have you spent working with various data modeling approaches",
            "type": "slider",
            "answer_text": 3.5
        },
        {
            "id": 5,
            "question_text": "Whats your experience in building ETL data pipelines",
            "type": "slider",
            "answer_text": null
        },
        {
            "id": 6,
            "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
            "type": "slider",
            "answer_text": null
        },
        {
            "id": 7,
            "question_text": "Whats your experience with Azure CI/CD and ML",
            "type": "slider",
            "answer_text": null
        },
        {
            "id": 8,
            "question_text": "Whats your experience in version control systems like git",
            "type": "slider",
            "answer_text": 1.5
        }
    ]
},
{
  "id": 5,
  "name": "Test",
  "email": "vysakh@gmail.com",
  "phone_number": "2323232323",
  "current_salary": "13.90",
  "expected_salary": "17.80",
  "applied_on": "2023-12-28T09:40:28.838143Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/8222f0d6-4c98-4c17-8b33-98996dcbaf57.pdf",
  "notice_period_length": 60,
  "total_years_exp": 18,
  "job_posting_title": "DAE-981127",
  "uuid": "6d4243d5-c813-4951-9b34-040a7d60416b",
  "user_current_status": "Managerial Round",
  "comments": "dfddgfdf",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 3.5
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.5
      }
  ]
},
{
  "id": 6,
  "name": "Vysakh Chandran",
  "email": "vysakh@gmail.com",
  "phone_number": "2323232323",
  "current_salary": "20.00",
  "expected_salary": "20.00",
  "applied_on": "2023-12-29T09:45:22.985113Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/3c67500e-e997-4902-bf78-892894e26995.pdf",
  "notice_period_length": 20,
  "total_years_exp": 20,
  "job_posting_title": "DS-981127",
  "uuid": "87ff9f08-d458-4b3e-864b-10cc35b3e994",
  "user_current_status": null,
  "comments": "huhi",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 2.0
      }
  ]
},
{
  "id": 7,
  "name": "aparna",
  "email": "hr@hireflexglobal.com",
  "phone_number": "8848217915",
  "current_salary": "5.60",
  "expected_salary": "9.90",
  "applied_on": "2023-12-27T10:21:30.954094Z",
  "resume": null,
  "notice_period_length": 50,
  "total_years_exp": 4,
  "job_posting_title": "DS-981127",
  "uuid": "927da018-8225-4d94-bf55-b43d62f12b8d",
  "user_current_status": "Shortlisted",
  "comments": "dsfsdfsdfsdfsdfsfsdf",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 0.5
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 8.5
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 8.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 10.0
      }
  ]
},
{
  "id": 8,
  "name": "Aparna",
  "email": "hr@hireflexglobal.com",
  "phone_number": "8848217915",
  "current_salary": "9.90",
  "expected_salary": "11.80",
  "applied_on": "2023-12-29T10:26:21.666002Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/10e7a496-f5e4-4c81-8ef1-ec2df6b617f8.pdf",
  "notice_period_length": 30,
  "total_years_exp": 8,
  "job_posting_title": "DS-981127",
  "uuid": "b39d2f6d-b6f3-48b0-9320-a70d346d3cfa",
  "user_current_status": "Screened",
  "comments": "hbvhj",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 6.5
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 4.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 8.5
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 3.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 7.5
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 3.5
      }
  ]
},
{
  "id": 9,
  "name": "Shana Mariyam K P",
  "email": "shanamariyam24@gmail.com",
  "phone_number": "8593049240",
  "current_salary": "1.00",
  "expected_salary": "5.00",
  "applied_on": "2023-12-29T11:36:24.205186Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/945762af-4d08-47a9-8925-044e9a0a845f.pdf",
  "notice_period_length": 11,
  "total_years_exp": 1,
  "job_posting_title": "DAE-981127",
  "uuid": "d5526c6d-0670-4138-8b9d-7529b94803d1",
  "user_current_status": "Shortlisted",
  "comments": "Fresher",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 10,
  "name": "Ruchit Rajendra Misal",
  "email": "mruchit25@gmail.com",
  "phone_number": "7507610359",
  "current_salary": "1.00",
  "expected_salary": "3.60",
  "applied_on": "2023-12-27T11:36:30.858833Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/ee402f3a-666b-45a7-93db-2e7b32b1fc88.pdf",
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DAE-981127",
  "uuid": "65af564d-a8b7-4c7d-80e6-f82a702b1a2e",
  "user_current_status": "Internal Interview",
  "comments": "Internship completed",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 0.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 11,
  "name": "Shimpi Pathak",
  "email": "shimpipathak5210@gmail.com",
  "phone_number": "9669456105",
  "current_salary": "6.70",
  "expected_salary": "18.80",
  "applied_on": "2023-12-26T11:37:37.683676Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/6e499e99-6454-43c5-90b8-09a979d6ea44.pdf",
  "notice_period_length": 59,
  "total_years_exp": 3,
  "job_posting_title": "DAE-981127",
  "uuid": "a75aa3b2-1da4-40b8-8ff2-cc8f77ffccb4",
  "user_current_status": "Internal Interview",
  "comments": "27 Jan|Offer-12growth in career| AWS|lake-1 Git- 3| databricks- 3| Data",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 3.5
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 3.5
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 3.0
      }
  ]
},
{
  "id": 12,
  "name": "SONU M",
  "email": "sonu2011007@gmail.com",
  "phone_number": "7012229745",
  "current_salary": "3.40",
  "expected_salary": "4.00",
  "applied_on": "2023-12-27T11:37:50.809877Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/b5416807-1212-4f42-91c0-61046c69a842.pdf",
  "notice_period_length": 10,
  "total_years_exp": 5,
  "job_posting_title": "DS-981127",
  "uuid": "c4205040-9e3e-4824-b0d7-5f8e7f017883",
  "user_current_status": "Shortlisted",
  "comments": "bhbjb",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 5.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.5
      }
  ]
},
{
  "id": 13,
  "name": "Abhishek Verma",
  "email": "abhishekverma54321@gmail.com",
  "phone_number": "9145823328",
  "current_salary": "12.00",
  "expected_salary": "15.00",
  "applied_on": "2023-11-27T11:38:26.732606Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/e5a138fc-2616-452a-8c71-fa01fa5d2c11.pdf",
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DS-981127",
  "uuid": "ba09caa2-b4aa-4679-a898-b8e5cb9dcb53",
  "user_current_status": "Screened",
  "comments": "Internship completed",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent workingwith time series forecasting",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 0.5
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 0.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.0
      }
  ]
},
{
  "id": 14,
  "name": "Shivani Gajbhiye",
  "email": "shivanigajbhiye8697@gmail.com",
  "phone_number": "7738888276",
  "current_salary": "6.30",
  "expected_salary": "10.30",
  "applied_on": "2023-11-27T11:38:27.028363Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/84b32dab-a7da-4838-a037-113aa55df681.pdf",
  "notice_period_length": 30,
  "total_years_exp": 3,
  "job_posting_title": "DAE-981127",
  "uuid": "6ab6b938-7716-4041-846d-6a4be160a930",
  "user_current_status": "Screened",
  "comments": "NNno Azure, nno delta or date lake, exp ctc- 9",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 0.0
      }
  ]
},
{
  "id": 15,
  "name": "Fahad Ahemad Mulla",
  "email": "fahadbin571@gmail.com",
  "phone_number": "9405034846",
  "current_salary": "1.00",
  "expected_salary": "1.00",
  "applied_on": "2023-12-27T11:40:18.789123Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/8a346a7a-1cf3-461b-b03d-25e90e0ae651.pdf",
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DAE-981127",
  "uuid": "f95643b0-2cc5-41ae-b866-0a62ad405775",
  "user_current_status": "Internal Interview",
  "comments": "Internship completed",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 0.5
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 0.5
      }
  ]
},
{
  "id": 16,
  "name": "Aniket Joglekar",
  "email": "joglekaraniket@yahoo.com",
  "phone_number": "8104926738",
  "current_salary": "6.40",
  "expected_salary": "8.00",
  "applied_on": "2023-11-27T11:41:18.597788Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/6ca39a92-0c43-4931-913a-b46d37c74645.pdf",
  "notice_period_length": 1,
  "total_years_exp": 3,
  "job_posting_title": "DAE-981127",
  "uuid": "24f71ab1-24bb-4a0a-bd5b-542d11a6b15a",
  "user_current_status": "Screened",
  "comments": "d",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 17,
  "name": "Priyanka Bairagi",
  "email": "bairagi.priyanka811@gmail.com",
  "phone_number": "7387837739",
  "current_salary": "3.00",
  "expected_salary": "6.00",
  "applied_on": "2023-11-27T11:42:04.615177Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/9f989fe5-e364-4fc3-98ff-629672822c76.pdf",
  "notice_period_length": 1,
  "total_years_exp": 5,
  "job_posting_title": "DS-981127",
  "uuid": "4580bd02-c691-4645-a96d-794e2423f82c",
  "user_current_status": "Screened",
  "comments": "d",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 18,
  "name": "Raghunandan Sahoo",
  "email": "raghusahoo751@gmail.com",
  "phone_number": "6370126336",
  "current_salary": "1.00",
  "expected_salary": "1.00",
  "applied_on": "2023-11-27T11:42:46.656714Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/5afd5e57-b782-4352-809c-14ea1e9850c3.pdf",
  "notice_period_length": 30,
  "total_years_exp": 2,
  "job_posting_title": "DAE-981127",
  "uuid": "9603e16b-893c-440f-b463-e69bfc0e5f10",
  "user_current_status": "Shortlisted",
  "comments": "",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.0
      }
  ]
},
{
  "id": 19,
  "name": "Jnanendra Kumar",
  "email": "jnanendra.dataanalyst@gmail.com",
  "phone_number": "9381793526",
  "current_salary": "8.00",
  "expected_salary": "12.00",
  "applied_on": "2023-12-27T11:43:33.472546Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/39b7713a-7a61-4978-bbb4-7d9c733a5821.docx",
  "notice_period_length": 15,
  "total_years_exp": 5,
  "job_posting_title": "DE-980511",
  "uuid": "5908449f-0918-436a-9302-399465d6ca4d",
  "user_current_status": "Screened",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 3.5
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 3.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 20,
  "name": "sagar singh rauthan",
  "email": "sagarsinghrauthan434@gmail.com",
  "phone_number": "7409708648",
  "current_salary": "1.00",
  "expected_salary": "10.70",
  "applied_on": "2023-11-27T11:44:11.433584Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/0059130e-3e62-4336-befb-b7de5e294d08.pdf",
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DS-981127",
  "uuid": "7bfa6a93-a58a-43b7-b673-37a7cf338aaa",
  "user_current_status": "Tried Calling",
  "comments": "No experience",
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 0.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent workingwith time series forecasting",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 21,
  "name": "Sumit Sunil Sartale",
  "email": "ssartale6@gmail.com",
  "phone_number": "9130674178",
  "current_salary": "1.00",
  "expected_salary": "5.00",
  "applied_on": "2023-11-27T11:44:14.864337Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/b423c0f4-1739-4880-8155-af8e73d54a2b.pdf",
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DAE-981127",
  "uuid": "b952babb-cf9d-461e-a037-17c6b6863dfb",
  "user_current_status": "Rejected",
  "comments": "Internship completed",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 0.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 0.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 22,
  "name": "Chirag Agrawal",
  "email": "chirag071857@gmail.com",
  "phone_number": "7413977981",
  "current_salary": "6.00",
  "expected_salary": "9.00",
  "applied_on": "2023-11-27T11:44:41.601193Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/47c91087-3aea-46a1-b997-52c6d59baff8.pdf",
  "notice_period_length": 10,
  "total_years_exp": 2,
  "job_posting_title": "DS-981127",
  "uuid": "e1ae9a3f-13f6-4e3e-bb6d-1b477703d580",
  "user_current_status": "Shortlisted",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 0.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 2.0
      }
  ]
},
{
  "id": 23,
  "name": "Vickrant Gawali",
  "email": "vickrantgawali9445@gmail.com",
  "phone_number": "8796282148",
  "current_salary": "4.70",
  "expected_salary": "7.00",
  "applied_on": "2023-11-27T11:44:43.653913Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/6606c96d-6a97-46c9-8426-badf0c144c18.pdf",
  "notice_period_length": 30,
  "total_years_exp": 2,
  "job_posting_title": "DAE-981127",
  "uuid": "e5d3bbf3-8066-4c19-aae9-6ff3d7a91121",
  "user_current_status": "Shortlisted",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.0
      }
  ]
},
{
  "id": 24,
  "name": "Ramanjot",
  "email": "simonmanchanda@gmail.com",
  "phone_number": "9557631025",
  "current_salary": "4.70",
  "expected_salary": "10.00",
  "applied_on": "2023-11-27T11:45:06.886758Z",
  "resume": null,
  "notice_period_length": 30,
  "total_years_exp": 2,
  "job_posting_title": "DAE-981127",
  "uuid": "d2e13373-f509-4988-92a4-f278482f03e8",
  "user_current_status": "Screened",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 2.5
      }
  ]
},
{
  "id": 25,
  "name": "Mohd Muaz",
  "email": "Muazmalik01@gmail.com",
  "phone_number": "8194022647",
  "current_salary": "7.00",
  "expected_salary": "10.50",
  "applied_on": "2023-11-27T11:45:37.114425Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/9acfd7e4-48ad-4f34-829d-cec2c7363934.pdf",
  "notice_period_length": 15,
  "total_years_exp": 2,
  "job_posting_title": "DS-981127",
  "uuid": "b80054dd-837e-4a94-a63c-0671a20b6617",
  "user_current_status": "Rejected",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "How long worked solely as a data scientist",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with time series forecasting",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 1.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 1.5
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.0
      }
  ]
},
{
  "id": 26,
  "name": "Samyak Ladhe",
  "email": "sngladhe@gmail.com",
  "phone_number": "9028815804",
  "current_salary": "1.00",
  "expected_salary": "3.20",
  "applied_on": "2023-11-27T11:46:00.475851Z",
  "resume": null,
  "notice_period_length": 1,
  "total_years_exp": 1,
  "job_posting_title": "DE-980511",
  "uuid": "aa0e1f4d-4a8b-4489-a3e5-bbae8d317b6a",
  "user_current_status": "Rejected",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 27,
  "name": "Sarthak Anand",
  "email": "sarthakanand119@gmail.com",
  "phone_number": "8826224077",
  "current_salary": "1.00",
  "expected_salary": "1.00",
  "applied_on": "2023-11-27T11:47:16.160280Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/02f2a50e-44fc-4e1e-b49a-d2acfbaa5c26.pdf",
  "notice_period_length": 60,
  "total_years_exp": 4,
  "job_posting_title": "DE-980511",
  "uuid": "7f171e71-a74e-4962-94ea-dd17af50015d",
  "user_current_status": "Rejected",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 28,
  "name": "Ramanjot",
  "email": "simonmanchanda@gmail.com",
  "phone_number": "9557631025",
  "current_salary": "4.60",
  "expected_salary": "10.10",
  "applied_on": "2023-11-27T11:47:17.122303Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/26419569-4e37-4376-b119-29a4de11eb00.pdf",
  "notice_period_length": 30,
  "total_years_exp": 2,
  "job_posting_title": "DE-980511",
  "uuid": "a9bb5807-0419-4cf9-9381-14e5af84be42",
  "user_current_status": "Screened",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 2.5
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 2.0
      }
  ]
},
{
  "id": 29,
  "name": "Pawan Gher",
  "email": "pawangher786@gmail.com",
  "phone_number": "8605036657",
  "current_salary": "3.00",
  "expected_salary": "5.90",
  "applied_on": "2023-11-27T11:48:41.060622Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/1a054599-dd13-41b6-b7f2-f1adf2819943.pdf",
  "notice_period_length": 1,
  "total_years_exp": 3,
  "job_posting_title": "DAE-981127",
  "uuid": "61eb7267-f589-43ea-85a9-f177be5cf517",
  "user_current_status": "Screened",
  "comments": "nagpur,  no communication",
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 0.5
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": null
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": null
      }
  ]
},
{
  "id": 30,
  "name": "Nandini Maheshwari",
  "email": "nandinimaheshwari2019@gmail.com",
  "phone_number": "9690956829",
  "current_salary": "13.00",
  "expected_salary": "12.90",
  "applied_on": "2023-11-27T11:49:19.721073Z",
  "resume": "https://dev.heineken.londonladder.com/resumes/resumes/2808bd4d-e10c-43de-9fd6-e4058ef35c42.pdf",
  "notice_period_length": 1,
  "total_years_exp": 3,
  "job_posting_title": "DE-980511",
  "uuid": "5b079329-5c30-402a-9091-b19a46a1dd4e",
  "user_current_status": "Shortlisted",
  "comments": null,
  "questions": [
      {
          "id": 3,
          "question_text": "Whats your experience in writing complex SQL for Spark-like data lake systems",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 4,
          "question_text": "How many years have you spent working with various data modeling approaches",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 5,
          "question_text": "Whats your experience in building ETL data pipelines",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 6,
          "question_text": "Whats your experience with using Databricks, Data Factory or DataLake",
          "type": "slider",
          "answer_text": 2.0
      },
      {
          "id": 7,
          "question_text": "Whats your experience with Azure CI/CD and ML",
          "type": "slider",
          "answer_text": 1.0
      },
      {
          "id": 8,
          "question_text": "Whats your experience in version control systems like git",
          "type": "slider",
          "answer_text": 1.0
      }
  ]
},
];






function App() {
  return (
    <>
    <Routes>   
    {/* <Route path ="/" element={<UserLogin1 />} /> */}
    <Route path ="/" element={<ThankYouPage />} />


    <Route path ="admindash" element={<AdminDashboard />} />
    
    <Route path ="user2" element={<UserLogin1 />} />
    <Route path ="user" element={<UserLogin1 />} />
    <Route path ="usertest" element={<UserTest />} />
    <Route path ="jupyter" element={<JupyterNotebookComponent />} />
    <Route path ="sql" element={<SqlEditor />} />
    <Route path ="usermsg" element={<UserPremsg2 />} />
    <Route path ="finish" element={<UserPostmsg />} />
    <Route path ="completed" element={<UserCompleted />} />
    <Route path ="register" element={<UserRegistrationPage />} />
    <Route path ="firebasetest" element={<Firebasecheck />} />
    <Route path ="adminheink" element={<AdminLogin />} />
    <Route path="/:jobPost/apply" element={<CandidateForm />} />
    <Route path="/thank-you" element={<ThankYouPage />} />
    <Route path="/video" element={<Uservideo />} />
    <Route path="/admin/users" element={<AdminUserLists />} />
    <Route path="newdash" element={<Newdash userdata={userdata} />} />
    <Route path="/admin/dash/candidates" element={<DashCandidates />} />
    <Route path="/admin/dash/candidatestests" element={<ProtectedRoute><DashCandidatesList /></ProtectedRoute>} />
    <Route path ="/:testName" element={<UserLogin1 />} />
    <Route path="/review" element={<CandidateReview />} />   
    <Route path="/admin/dash/filter" element={<CandidateFilterWip/>} />

    

    




  






    <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}

    </Routes>
    </>
  );
}

export default App;