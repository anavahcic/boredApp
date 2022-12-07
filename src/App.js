import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';
import firebase from './firebase.js';
import Form from "./Form.js";

// PSEUDO CODE
// An app that queries the Bored API for activities, and displays them on the page
// A dropdown that allows users to select an activity based on type of activity
// Option to prompt user to save or remove their favourite activites

// Step 1: When my App.js component mounts, make an API call to the Bored API 
        // To make the API call, I am going to use the axios library 
        // Do the API call insde a useEffect
        // Pass the second argument, a dependency array, to useEffect to prevent callback function being run every time our component re-renders

// Step 2: Once we get our data back, we will have to modify the response from the API so that includes type of activity data 
     
// Step 3: Display results on the page 
        // Our API data is stored in state now, and it is accessible everywhere in the App component. 
        // This means we can map over the activity state inside of the return statement
       

function App() {
  // Call useState to initialize state to keep track of the data whcih is returned from the Bored API
  // Initialize our state as an empty array
  const [activities, setActivities] = useState([]);
  // Initialize another piece of state to represent userChoice value
  const [userChoice, setUserChoice] = useState("placeholder");
  // Piece of state to display chosen activities
  const [displayUserActivity, setDisplayUserActivity] = useState([]);

  // Once the component has rendered, run the useEffect function in order to fetch some data from the Bored API
  useEffect(() => {

    if (userChoice !== "placeholder")  {
      axios({
        url: `https://www.boredapi.com/api/activity?type=${userChoice}`,
        method: "GET",
        dataResponse: "json",
        params: {
          query: "activity",
        },
      }).then((response) => {
        // Take the data that is returned from the Bored API and save it within state
         setActivities(response.data.activity);
        });
    }
    // Run this side effect every time the user submits the form with a new search query
  }, [userChoice]);

  // Connection to database to retrive the user activity saved information
  useEffect(() => {

    const database = getDatabase(firebase)
    const dbRef = ref(database)

    onValue(dbRef, (response) => {
      const newState = []
      const data = response.val()
      for (let propertyName in data) {
        newState.push(data[propertyName])
      }
      setDisplayUserActivity(newState);
    })
}, []);

  // Function to handle data submission
  const handleSubmit = () => {
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      push(dbRef, `${activities}`);
  }
// Function to remove data
  const removeSubmit = () => {
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      remove(dbRef);
  }
  
  return (
    <div className="App">
      <div className="wrapper">
      <header>
          <h1>The Bored App</h1>
          <h2>Helps you find things to do</h2>
      </header>
      <main>
          <div className="textContainer">
              <Form 
              getUserChoice={setUserChoice}
              userChoice={userChoice}
              />
              <p>{activities}</p>
          </div>
          <div>
            <h2>Found something you like?</h2>
            <h2>Save your favourites here:</h2>
            <button onClick={handleSubmit}>Save activity</button>
            <button onClick={removeSubmit}>Remove activity</button>  
          </div>
          <div className="textContainer">
            <div className="activityDisplay">
              {
                displayUserActivity.map(displayActivity => {
                  return <p>{displayActivity}</p>
                }) 
              }
            </div>
          </div>
      </main>
      </div>
      <footer>
          <p>Created @ <a href="https://junocollege.com/" target="blank">Juno College of Technology</a> by <a href="https://www.anavahcic.com/" target="blank">Ana Vahcic</a></p>
      </footer>
    </div>
  );
}

export default App;






