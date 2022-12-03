import {useEffect, useState} from 'react';
import axios from 'axios';
import Form from "./Form.js";
import './App.css';

// PSEUDO CODE
// An app that queries the Bored API for activities, and displays them on the page
// A dropdown that allows users to select an activity based on type of activity

// Step 1: When my App.js component mounts, make an API call to the Bored API 
        // To make the API call, I am going to use the axios library 
        // Do the API call insde a useEffect
        // Pass the second argument, a dependency array, to useEffect to prevent callback function being run every time our component re-renders
function App() {

  const [activities, setActivities] = useState([]);
  const [userChoice, setUserChoice] = useState('');

  useEffect(() => {
    axios({
      url: `http://www.boredapi.com/api/activity?type=${userChoice}`,
      method: "GET",
      dataResponse: "json",
      params: {
        query: "activity",
      },
    }).then((response) => {
      // console.log(response.data);
       setActivities(response.data.activity);
        });

     
  }, [userChoice]);

  // console.log(userChoice);

  return (
    <div className="App">
      <div className="wrapper">
          <body>
            <header>
              <h1>Bored App</h1>
              <h2>Please select an activity below.</h2>
            </header>
            <main>
              <div className="textContainer">
                <Form getUserChoice={setUserChoice}/>
                <p>{activities}</p>
              </div>
            </main>
            <footer>
              <p>Created @ <a href="https://junocollege.com/" target="blamk">Juno College of Technology</a></p>
            </footer>
          </body>
      </div>
    </div>
  );
}

export default App;








// Step 2: Once we get our data back, we will have to modify the response from the API so that includes type of activity data before saving it in state so it's ready to be used for filtering, and then store results of that call in state.
        // Map over the array of activities from the API and create a new property orientation to save on the activity objects. To create the property, we are using the type of activity
        // Create a piece of state to store the activities we are getting back from the API and then use that piece of state to display the activities on the page
        // Import useState into the component and create a piece of state to hold the activity objects
        // Now our state is ready to receive information from the API
        // Update then method after axios call to set state
        // Only pass the part of the response object that contains information on the activity

// Step 3: Display results on the page 
        // Our API data is stored in state now, and it is accessible everywhere in the App component. 
        // This means we can map over the activity state inside of the return statement
       

// Step 4: Filter the activities
        // We want our users to be able to filter these activities so we need to build another component to hold this filtering logic.
        // This component is going to be responsible for displaying the dropdown menu that allows the users to decide what orientation of activity they would like to see.  The logic for submitting this form is going to live in the <App/> component. This component will expect to receive a function as a prop.
        // We need to create a piece of state that will hold our user's choice and an event handler to listen for when the value of the select element changes, and then render it in the <App/> component.
        // Once we receive the user's orientation preference up in the App.js, we will use that info to filter our original list of activites to a smaller subset of activites oriented the way the user wants.
        // When we have finished filtering, we are going to want to put these activities in state, such that they will then be rendered to the page. That will trigger a re-render, which will let us return new JSX with our activites on the page.
