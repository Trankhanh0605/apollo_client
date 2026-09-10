import { useState } from "react";
import { useMutation} from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm=({setError, setToken}) =>{
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')

  const [login]=useMutation(LOGIN, {
    onCompleted: (data)=>{
      const token=data.login.value 
      setToken(token)
      localStorage.setItem('phonebook-user-token', token)
    },
    onError: (error)=>{
      setError(error.message)
    }
  })

  const submit=(event)=>{
    event.preventDefault()
    login({
      variables: {
        username,
        password
      }
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input 
          value={username}
          onChange={({target})=>setUsername(target.value)}
          >
          username
          </input>
        </div>
        <div>
          <input
          value={password}
          onChange={({target})=>setPassword(target.value)}
          >
          password
          </input>
        </div>
      </form>
    </div>
  );
}

export default LoginForm