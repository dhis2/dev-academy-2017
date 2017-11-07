import React from 'react';
import ReactDOM from 'react-dom';

// Import the init function from D2
import { init } from 'd2/lib/d2';

const rootEl = document.getElementById('root');

// Prepare the D2 init config:
const initConfig = {
  baseUrl: 'http://localhost:8080/dhis/api',
  schemas: ['user', 'dataSet'],
  headers: { authorization: `Basic ${btoa('admin:district')}` }
};

// User component - renders a single user
function User({ user }) {
  return <div><a href={user.href}>{user.displayName}</a></div>;
}

// User list component - renders a list of User components
function UserList({ users }) {
  return (
    <div>
      <h3>Got {users.size} users:</h3>
      {users.toArray().map(user => <User user={user} key={user.id} />)}
    </div>
  );
}

console.info('Initializing D2...');

init(initConfig)
  .then(d2 => {
    console.info('D2 initialized:', d2);
    window.d2 = d2;

    d2.models.dataSets.list()
      .then(dataSets => {
        const dataSet = dataSets.toArray()[0];
        dataSet.name = dataSet.name + '!';
        
        return dataSet.save();
      })
      .then(res => { console.info('Saved data set:', res); })
      .catch(err => { console.warn('Failed to save data set:'. err); });

    d2.models.dataSets.list().then(users => {
      ReactDOM.render(<UserList users={users} />, rootEl);
    });
  })
  .catch(error => {
    console.warn('D2 failed to initialize:', error);
  })
