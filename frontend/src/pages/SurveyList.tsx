import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { surveyApi, Survey } from '../services/survey';
import debounce from 'lodash/debounce';

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const data = await surveyApi.getAll();
      setSurveys(data);
      setFilteredSurveys(data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setIsSearching(true);
      const filtered = surveys.filter(survey =>
        survey.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSurveys(filtered);
      setIsSearching(false);
    }, 300),
    [surveys]
  );

  useEffect(() => {
    fetchSurveys();
  }, []);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        await surveyApi.delete(id);
        fetchSurveys();
      } catch (error) {
        console.error('Error deleting survey:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Surveys</h1>
          <Link to="/surveys/new">
            {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Create New Survey
            </Button> */}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search surveys by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            {searchTerm && !isSearching && (
              <p className="mt-2 text-sm text-gray-500">
                Found {filteredSurveys.length} survey{filteredSurveys.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {filteredSurveys.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? `No surveys found matching "${searchTerm}"`
                : 'No surveys found'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSurveys.map((survey) => (
              <div key={survey.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{survey.title}</h2>
                  <p className="text-gray-600 mb-4">{survey.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Link to={`/surveys/${survey.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                          View
                        </Button>
                      </Link>
                      <Link to={`/surveys/${survey.id}/edit`}>
                        <Button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(survey.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </Button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      survey.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {survey.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyList; 