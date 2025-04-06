import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface Question {
  text: string;
  type: 'text';
  required: boolean;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  questions: Question[];
  responses: any[];
  createdAt: string;
  updatedAt: string;
}

const SurveyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/surveys/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Fetched survey data:', response.data);
      setSurvey(response.data);
    } catch (error: any) {
      console.error('Error fetching survey:', error);
      toast.error(error.response?.data?.message || 'Failed to load survey');
      navigate('/surveys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, [id, navigate]);

  // Add focus event listener to refresh data when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      fetchSurvey();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const exportToDocx = async () => {
    if (!survey) return;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: survey.title,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: survey.description,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Status: ${survey.isActive ? 'Active' : 'Inactive'}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Total Responses: ${survey.responses?.length || 0}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Questions:",
                bold: true,
                size: 28,
              }),
            ],
          }),
          ...survey.questions.map((question, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `Question ${index + 1}: ${question.text}`,
                  size: 24,
                }),
                new TextRun({
                  text: question.required ? " (Required)" : "",
                  italics: true,
                  size: 24,
                }),
              ],
            })
          ),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${survey.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_report.docx`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Survey not found</p>
        <button
          onClick={() => navigate('/surveys')}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          Return to Surveys
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/surveys/${survey.id}/edit`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Survey
            </button>
            <button
              onClick={exportToDocx}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to Docx
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{survey.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Status</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  survey.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {survey.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Responses</h2>
                <span className="text-gray-600">{survey.responses?.length || 0}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Questions</h2>
            {!survey.questions || survey.questions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">No questions added yet</p>
                <button
                  onClick={() => navigate(`/surveys/${id}/edit`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Add Questions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {survey.questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">Question {index + 1}</p>
                        <p className="text-gray-600 mt-1">{question.text}</p>
                        {question.required && (
                          <span className="text-xs text-red-600 mt-1 inline-block">* Required</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyView; 