import React,{useEffect, useState} from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import '../App.css';
import axios from 'axios';
const OverallStudents = () => {
    const [overallData, setOverallData] = useState(null);
    const [genderWise, setGenderWise] = useState(null);
    const [typeWise,setTypeWise]=useState(null);
    const [ageGroupData, setAgeGroupData] = useState(null);
    useEffect(() => {
        const fetchOverallData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/average-student-scores');
                setOverallData(response.data);
            } catch (error) {
                console.error('Error fetching overall average scores:', error);
            }
        };

        fetchOverallData();
    }, []);

    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/student-gender-wise-average-scores');
                setGenderWise(response.data);
            } catch (error) {
                console.error('Error fetching gender-wise average scores:', error);
            }
        };

        fetchGenderData();
    }, []);
    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/student-status-wise-average-scores');
                setTypeWise(response.data);
            } catch (error) {
                console.error('Error fetching gender-wise average scores:', error);
            }
        };

        fetchTypeData();
    }, []);
    const genderData = {
        labels: ['Physical', 'Environmental', 'Psychological', 'Social'],
        datasets: [
            {
                label: 'Male',
                data: genderWise && genderWise.male
                    ? [genderWise.male.averagePh, genderWise.male.averageEh, genderWise.male.averageMh, genderWise.male.averageSh]
                    : [0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Female',
                data: genderWise && genderWise.Female
                    ? [genderWise.Female.averagePh, genderWise.Female.averageEh, genderWise.Female.averageMh, genderWise.Female.averageSh]
                    : [0, 0, 0, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };


    const employeeData = {
        labels: ['Physical', 'Psychological', 'Environmental', 'Social'],
        datasets: [
            {
                label: 'Post-Graduate',
                data: [
                    typeWise && typeWise.postgraduate ? typeWise.postgraduate.averagePh : 0,
                    typeWise && typeWise.postgraduate ? typeWise.postgraduate.averageEh : 0,
                    typeWise && typeWise.postgraduate ? typeWise.postgraduate.averageMh : 0,
                    typeWise && typeWise.postgraduate ? typeWise.postgraduate.averageSh : 0
                ],
                backgroundColor: '#FF6384',
            },
            {
                label: 'Under-Graduate',
                data: [
                    typeWise && typeWise.undergraduate ? typeWise.undergraduate.averagePh : 0,
                    typeWise && typeWise.undergraduate ? typeWise.undergraduate.averageEh : 0,
                    typeWise && typeWise.undergraduate ? typeWise.undergraduate.averageMh : 0,
                    typeWise && typeWise.undergraduate ? typeWise.undergraduate.averageSh : 0
                ],
                backgroundColor: '#36A2EB',
            },
        ],
    };
    
    
    const options = {
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
    };

    useEffect(() => {
        const fetchAgeGroupData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/student-semester-wise-average-scores');
                setAgeGroupData(response.data);
            } catch (error) {
                console.error('Error fetching age group-wise average scores:', error);
            }
        };

        fetchAgeGroupData();
    }, []);

    const ageData = {
        labels: Object.keys(ageGroupData || {}),
        datasets: [
            {
                label: 'Physical',
                data: Object.values(ageGroupData || {}).map(data => data.averagePh),
                borderColor: '#FF6384',
                fill: false,
            },
            {
                label: 'Environmental',
                data: Object.values(ageGroupData || {}).map(data => data.averageEh),
                borderColor: '#36A2EB',
                fill: false,
            },
            {
                label: 'Psychological',
                data: Object.values(ageGroupData || {}).map(data => data.averageMh),
                borderColor: '#FFCE56',
                fill: false,
            },
            {
                label: 'Social',
                data: Object.values(ageGroupData || {}).map(data => data.averageSh),
                borderColor: '#4BC0C0',
                fill: false,
            },
        ],
    };
    return (
        <div className="container mx-auto p-6" style={{ paddingTop: '100px' }}>
            <h1 className="text-3xl font-bold mb-6">Overall Health of University Students</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Overall Health Pie Chart</h2>
                    <div className="chart-container">
                    {overallData ? (
                            <Pie
                                data={{
                                    labels: ['Physical', 'Environmental', 'Psychological', 'Social'],
                                    datasets: [
                                        {
                                            data: [
                                                overallData['averagePh'], 
                                                overallData['averageEh'], 
                                                overallData['averageMh'], 
                                                overallData['averageSh'], 
                                            ],
                                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                                        },
                                    ],
                                }}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                
                {/* Card for Gender chart */}
                <div className="card1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Domain Scores by Gender</h2>
                    <div className="chart-container">
                        <Bar data={genderData} />
                    </div>
                </div>
            </div>

            {/* Card for Employee Type chart */}
            <div className="card1 bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Domain Scores by Degree</h2>
                <div className="chart-container2">
                    <Bar data={employeeData} options={options} />
                </div>
            </div>

            {/* Card for Age Group chart */}
            <div className="card1 bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Domain Scores by Semester</h2>
                <div className="chart-container2">
                    <Line data={ageData}  />
                </div>
            </div>
        </div>
    );
};

export default OverallStudents;
