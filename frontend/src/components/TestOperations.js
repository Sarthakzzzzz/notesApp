import React, { useState } from "react";
import { notesAPI, userAPI } from "../services/api";

function TestOperations({ user }) {
  const [testResults, setTestResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const addResult = (operation, success, message) => {
    setTestResults(prev => [...prev, { operation, success, message, time: new Date().toLocaleTimeString() }]);
  };

  const runAllTests = async () => {
    setTesting(true);
    setTestResults([]);

    // Test 1: Create Note
    try {
      const createResponse = await notesAPI.create({
        title: "Test Note",
        content: "This is a test note",
        userId: parseInt(user.id),
        username: user.username,
        email: user.email
      });
      addResult("CREATE Note", true, `Created note with ID: ${createResponse.data.id}`);
      
      // Test 2: Get Note by ID
      try {
        const getResponse = await notesAPI.getById(createResponse.data.id);
        addResult("GET Note by ID", true, `Retrieved note: ${getResponse.data.title}`);
        
        // Test 3: Update Note
        try {
          const updateResponse = await notesAPI.update(createResponse.data.id, {
            title: "Updated Test Note",
            content: "This note has been updated"
          });
          addResult("UPDATE Note", true, `Updated note: ${updateResponse.data.title}`);
        } catch (error) {
          addResult("UPDATE Note", false, error.message);
        }
        
        // Test 4: Delete Note
        try {
          await notesAPI.delete(createResponse.data.id);
          addResult("DELETE Note", true, "Note deleted successfully");
        } catch (error) {
          addResult("DELETE Note", false, error.message);
        }
        
      } catch (error) {
        addResult("GET Note by ID", false, error.message);
      }
    } catch (error) {
      addResult("CREATE Note", false, error.message);
    }

    // Test 5: Get All Notes
    try {
      const allNotesResponse = await notesAPI.getAll(parseInt(user.id));
      addResult("GET All Notes", true, `Retrieved ${allNotesResponse.data.length} notes`);
    } catch (error) {
      addResult("GET All Notes", false, error.message);
    }

    // Test 6: Get Profile
    try {
      const profileResponse = await userAPI.getProfile();
      addResult("GET Profile", true, `Profile: ${profileResponse.data.username}`);
    } catch (error) {
      addResult("GET Profile", false, error.message);
    }

    setTesting(false);
  };

  if (user.role !== 'ADMIN') {
    return <div className="main-content">Access denied. Admin only.</div>;
  }

  return (
    <div className="main-content">
      <h2>API Operations Test</h2>
      
      <button 
        className="btn btn-primary" 
        onClick={runAllTests} 
        disabled={testing}
        style={{ marginBottom: '2rem' }}
      >
        {testing ? "Running Tests..." : "Run All Tests"}
      </button>

      {testResults.length > 0 && (
        <div>
          <h3>Test Results:</h3>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
            {testResults.map((result, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '0.5rem', 
                  margin: '0.5rem 0',
                  borderLeft: `4px solid ${result.success ? '#28a745' : '#dc3545'}`,
                  background: result.success ? '#d4edda' : '#f8d7da'
                }}
              >
                <strong>{result.operation}</strong> - {result.time}<br/>
                <span style={{ color: result.success ? '#155724' : '#721c24' }}>
                  {result.success ? '✅' : '❌'} {result.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestOperations;