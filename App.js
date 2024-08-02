import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [apiEndpoint, setApiEndpoint] = useState('https://example.vercel.app/bfhl'); // Update this with your actual API endpoint

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputData);
      axios.post(apiEndpoint, { data: jsonData })
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Invalid JSON input:', error);
    }
  };

  const handleReset = () => {
    setInputData('');
    setResponse({});
    setSelectedOptions([]);
  };

  const renderResponse = () => {
    if (Object.keys(response).length === 0) {
      return null;
    }

    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredResponse.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredResponse.numbers = response.numbers;
      } else if (option === 'Highest Alphabet') {
        filteredResponse.highest_alphabet = response.highest_alphabet;
      }
    });

    return (
      <div>
        {Object.keys(filteredResponse).map((key, index) => (
          <div key={index}>
            <h4>{key}</h4>
            <ul>
              {filteredResponse[key].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={inputData} onChange={handleInputChange} placeholder="Enter JSON data" />
        <br />
        <select multiple value={selectedOptions} onChange={handleSelectChange}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest Alphabet">Highest Alphabet</option>
        </select>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      {renderResponse()}
    </div>
  );
}

export default App;