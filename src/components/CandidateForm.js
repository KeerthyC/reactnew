import React, { useState,useRef,useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, TextField, Button, Slider, Typography, Paper, Box } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { DropzoneArea } from 'material-ui-dropzone';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './CandidateForm.css'; // Import your custom CSS

import { useNavigate } from 'react-router-dom';
import HireflexLogo from '../hireflexglobal.jpg';
import HeinkenLogo from '../heineken.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from "react-router-dom";

const apiurl = process.env.REACT_APP_API_URL;



const validateName = (name) => {
    if (!name.trim()) {
        return "Name is required";
    }
    return "";
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return "Email is required";
    } else if (!emailRegex.test(email)) {
        return "Invalid email address";
    }
    return "";
};

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:\+\d{1,4})?\d{10}$/;
    if (!phoneNumber) {
        return "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber)) {
        return "Invalid phone number";
    }
    return "";
};


const CandidateForm = () => {
    const [errors, setErrors] = useState({
        lastWorkingDay: '',
        noticePeriodLength: '',
        on_notice_period: '',
    });
    const navigate = useNavigate();
    const { jobPost } = useParams();
    const [showResumeWarning, setShowResumeWarning] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const resumeRef = useRef(null);
    const lastWorkingDayRef = useRef(null);
    const noticePeriodLengthRef = useRef(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [questions, setQuestions] = useState([]); // State to store questions
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        current_salary: 1,
        expected_salary: 1,
        notice_period: new Date(),
        resume: null,
        on_notice_period: '', // 'yes' or 'no'
        last_working_day: null,
        notice_period_length: 30, // Default value, adjust as needed
        total_years_exp: 2,
        // job_posting: 'DS1411',
        ts_ex: 0,
    });
    //SA-20
    const [resumeError, setResumeError] = useState("");
    const logoToUse = jobPost && jobPost.startsWith("HF") ? HireflexLogo : HeinkenLogo;


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Adjust the API URL as per your backend setup
                const response = await axios.get(`${apiurl}/api/${jobPost}/questions`);
                setQuestions(response.data);
    
                // Check if job_posting needs to be updated
                if (response.data.length > 0) {
                    const jobPostingId = response.data[0].job_posting;
                    if (formData.job_posting !== jobPostingId) {
                        setFormData(prevFormData => ({ ...prevFormData, job_posting: jobPostingId }));
                    }
                }
    
                // console.log("Fetched Questions:", response.data); // Print fetched data to the console for testing
            } catch (error) {
                console.error('Error fetching questions:', error);
                // Handle error here
            }
        };
    
        fetchQuestions();
        // Remove formData.job_posting from the dependency array to avoid unnecessary re-renders
    }, []); // Empty dependency array to run only on component mount
    //SA-20
    const validateResume = () => {
        if (!formData.resume) {
            return "Please consider attaching a resume for a better evaluation.";
        }
        return "";
    };
    const validateOnNoticePeriod = (onNoticePeriod) => {
        if (!onNoticePeriod) {
            return "Selecting an option for notice period is required";
        }
        return "";
    };

    const validateNoticePeriodDate = (lastWorkingDay, onNoticePeriod) => {
        if (onNoticePeriod === 'yes' && !lastWorkingDay) {
            return "Notice period date is required";
        }
        return "";
    };

    
    
    const validateLastWorkingDay = (lastWorkingDay, onNoticePeriod) => {
        if (onNoticePeriod === 'yes' && !lastWorkingDay) {
            return "Last working day is required";
        }
        return "";
    };
    
    const validateNoticePeriodLength = (noticePeriodLength, onNoticePeriod) => {
        if (onNoticePeriod === 'no' && (!noticePeriodLength || noticePeriodLength <= 0)) {
            return "Notice period length is required";
        }
        return "";
    };
    const handleConfirmSubmit = async () => {
        // debugger;
        setConfirmDialogOpen(false);
        const formDataToSend = new FormData();
        // formDataToSend.append('name', formData.name);
        // formDataToSend.append('email', formData.email);
        // formDataToSend.append('phone_number', formData.phone_number);
        // formDataToSend.append('current_salary', formData.current_salary);
        // formDataToSend.append('expected_salary', formData.expected_salary);
        // formDataToSend.append('notice_period_length', formData.notice_period_length);
        // formDataToSend.append('total_years_exp', formData.total_years_exp);
        // formDataToSend.append('job_posting', formData.job_posting);
        // formDataToSend.append('ts_ex', formData.ts_ex);
        // formDataToSend.append('notice_period', formData.notice_period.toISOString().split('T')[0]); // Format date
        // if (formData.resume) {
        //     formDataToSend.append('resume', formData.resume);
        // }
        // console.log('Before appending to formDataToSend:', formData);
        Object.entries(formData).forEach(([key, value]) => {
            if (!key.startsWith('answer_') && key !== 'resume') {  // Exclude dynamic question keys and 'resume'
                formDataToSend.append(key, value);
            }
        });



    // Append dynamic question answers in the correct format
        questions.forEach(question => {
            const answerValue = formData[`answer_${question.id}`];
            if (answerValue !== undefined) {
                formDataToSend.append(`answers[${question.id}]`, answerValue);
            }
        });

        // Append resume if it exists
        if (formData.resume) {
            formDataToSend.append('resume', formData.resume);
        }
        try {

            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiurl}/api/initial_applications/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response.data);
            // Redirect or display success message
            navigate('/thank-you');
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error
        }
    };

    const handleSliderChange = (name) => (event, value) => {
        setFormData({ ...formData, [name]: value });
    };
    // const handleConfirmSubmit = async () => {
    //     setConfirmDialogOpen(false);
    //     // ... existing form submission logic
    // };
    

    const handleSubmit = async () => {
        // TODO: Add form validation before submission
// Perform validation
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneNumberError = validatePhoneNumber(formData.phone_number);
        // const lastWorkingDayError = validateLastWorkingDay(formData.lastWorkingDay, formData.onNoticePeriod);
        // const noticePeriodLengthError = validateNoticePeriodLength(formData.noticePeriodLength, formData.onNoticePeriod);
        // const onNoticePeriodError = validateOnNoticePeriod(formData.on_notice_period);
        // const noticePeriodDateError = validateNoticePeriodDate(formData.last_working_day, formData.on_notice_period);
        // debugger;
        const resumeError = validateResume();
        setResumeError(resumeError);

        setErrors({ name: nameError, email: emailError, phone_number: phoneNumberError,});
        if (!formData.resume) {
            setShowResumeWarning(true); // Show warning if no resume
        } else {
            setShowResumeWarning(false); // Hide warning if resume is attached
        }
        
        if (nameError || emailError || phoneNumberError || resumeError) {
            if (nameError && nameRef.current) {
                nameRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (emailError && emailRef.current) {
                emailRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (phoneNumberError && phoneRef.current) {
                phoneRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (resumeError && resumeRef.current) {
                phoneRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return; // Stop the form submission if there are errors
        }
        setConfirmDialogOpen(true);



    };

    return (
        <div className="candidate-form">
            <div className="logo-container">
                <img src={logoToUse} alt="Logo" className="logo" />
            </div>
            <Paper elevation={3} className="form-container">
                <TextField
                    ref={nameRef}
                    label="Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    error={!!errors.name}
                    helperText={errors.name || ''}
                    fullWidth
                />

                <TextField
                    ref={emailRef}
                    label="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    error={!!errors.email}
                    helperText={errors.email || ''}
                    fullWidth
                />

                <TextField
                    ref={phoneRef}
                    label="Phone Number"
                    value={formData.phone_number}
                    onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number || ''}
                    fullWidth
                />

                <Typography gutterBottom>Current CTC:<strong> {formData.current_salary}</strong> Lakhs</Typography>
                <Slider
                    value={formData.current_salary}
                    onChange={handleSliderChange('current_salary')}
                    aria-labelledby="current-salary-slider"
                    step={0.1}
                    min={1}
                    max={150}
                />

                <Typography gutterBottom>Expected CTC: <strong>{formData.expected_salary} </strong>Lakhs</Typography>
                <Slider
                    value={formData.expected_salary}
                    onChange={handleSliderChange('expected_salary')}
                    aria-labelledby="expected-salary-slider"
                    step={0.1}
                    min={1}
                    max={150}
                />
                <Typography gutterBottom>Your notice period or last day of working: <strong>{formData.notice_period_length} </strong>days</Typography>
                <Slider
                    value={formData.notice_period_length}
                    onChange={handleSliderChange('notice_period_length')}
                    aria-labelledby="notice-period-length-slider"
                    step={1}
                    min={1}
                    max={90}
                />
                <Typography gutterBottom>Whats your total years of experience : <strong>{formData.total_years_exp}</strong> Years</Typography>
                <Slider
                    value={formData.total_years_exp}
                    onChange={handleSliderChange('total_years_exp')}
                    aria-labelledby="total-years-exp-slider"
                    step={1}
                    min={1}
                    max={30}
                />
                {/* <Typography gutterBottom>How experienced are you with time series analysis : {formData.ts_ex} Years</Typography>
                <Slider
                    value={formData.ts_ex}
                    onChange={handleSliderChange('ts_ex')}
                    aria-labelledby="ts-ex-slider"
                    step={1}
                    min={1}
                    max={10}
                /> */}

{
    questions.map((question, index) => {
        // Check the type of question to decide the input component
        if (question.type === 'text') {
            return (
                <TextField
                    key={question.id}
                    label={question.question_text}
                    fullWidth
                    onChange={e => setFormData({ ...formData, [`answer_${question.id}`]: e.target.value })}
                    value={formData[`answer_${question.id}`] || ''}
                    margin="normal"
                    variant="outlined"
                />
            );
        } else if (question.type === 'slider') {
            return (
                <div key={question.id}>
                               <Typography gutterBottom>
                                    {question.question_text}: {formData[`answer_${question.id}`] || question.default_value || 0} {question.unit}
                                </Typography>
                    <Slider
                        value={formData[`answer_${question.id}`] || 0}
                        onChange={(e, value) => setFormData({ ...formData, [`answer_${question.id}`]: value })}
                        aria-labelledby="slider-question"
                        step={question.step || 0}
                        // marks
                        min={question.min_value || 0}
                        max={question.max_value || 50}
                    />
                </div>
            );
        } else {
            // Render other types of questions here if needed
            return null;
        }
    })
}


                <Typography gutterBottom>Resume</Typography>
                <DropzoneArea
                    ref={resumeRef}
                    onChange={files => setFormData({ ...formData, resume: files[0] })}
                    acceptedFiles={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                    maxFileSize={8000000}
                    dropzoneText="Drag and drop your resume here or click"
                />
                {resumeError && (
                    <Typography color="error" className="resume-error">
                        {resumeError}
                    </Typography>
                )}
                {/* {showResumeWarning && (
                    <Typography className="resume-warning">
                        Please consider attaching a resume for a better evaluation. You can still submit the form without it.
                    </Typography>
                )} */}
                <Button variant="contained" className="submit-button" onClick={handleSubmit}>
                    Submit
                </Button>


                <Typography variant="body2" color="textSecondary" align="center" className="disclaimer">
                    We respect your privacy. Your data will not be shared with third parties and will be destroyed after the recruitment process.
                </Typography>
                <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please review your information before submitting. If everything is correct, click 'Confirm' to proceed.
                    </DialogContentText>
                    {/* Optional: Display summary of form data */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSubmit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            </Paper>
            
        </div>
    );
};

export default CandidateForm;
