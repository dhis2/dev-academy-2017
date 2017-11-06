import React from 'react';
import ReactDOM from 'react-dom';

// Get the root DOM element where the React app will be rendered
const rootEl = document.querySelector('#root');

// Set the 'Authorization' header to authenticate with the DHIS instance
const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('admin:district')}`
  }
};

// Component for displaying a single user
function User({ user }) {
  return <div><a href={user.href}>{user.name}</a></div>;
}

// Component for displaying a list of users
function UserList({ users }) {
  return (
    <div>
      <h3>{users.length} users:</h3>
      <div>{users.map((user) => <User user={user}/>)}</div>
    </div>
  );
}

// Fetch the list of users
fetch('http://localhost:8080/dhis/api/users?fields=:all', fetchOptions)
  // Parse the results as JSON
  .then((fetchResult) => fetchResult.json())
  // Use the data to render a list of users
  .then((jsonData) => {
    ReactDOM.render(<UserList users={jsonData.users} />, rootEl);
  })
  // Handle errors
  .catch((error) => { console.warn('Error:', error); });
