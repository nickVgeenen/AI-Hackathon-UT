// netlify/functions/settings.js
const settingsData = require('../../db.json').settings; // Adjust path if necessary

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        body: JSON.stringify(settingsData),
      };
    }

    if (event.httpMethod === "PATCH") {
        const data = JSON.parse(event.body);
        // Handle the PATCH logic (e.g., updating settings in a database)

        return {
          statusCode: 200,
          body: JSON.stringify(settingsData),
        };
      }

      
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: error.message }),
    };
  }
};
