import { useQuery } from "@apollo/client/react";
import { useState } from "react";

import { ALL_PERSONS } from "./queries";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const App=()=>{
  const [errorMessage, setErrorMessage]=useState(null); 
  const [token, setToken]=useState(localStorage.getItem('phonebook-user-token'))
  
  const result=useQuery(ALL_PERSONS)
  if (result.loading) {
    return <div>loading...</div>
  }

  function notify (message) {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // if token is null, show the login form to log in
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
        setError={notify}
        setToken={setToken}
        />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App