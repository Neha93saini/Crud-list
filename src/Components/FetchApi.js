import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function FetchApi() {
  const [users, setusers] = useState([]);
  const [isLoading, setAPICall] = useState(true)
  useEffect(() => {
    if (isLoading) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
          setAPICall(false);
          setusers(json)
        })
    }

  }
  )
  const user = users.length > 0 ? users[0] : { name: "Himanshu" };
  return (
    <div>
      {user.name}
    </div>
  )
}
