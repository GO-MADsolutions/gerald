import React, { ReactElement } from 'react'

interface Props {
  validEmail: String
}

function Home({validEmail}: Props): ReactElement {
  return (
    <div>
      <h1>You are successfully loggedin {validEmail}</h1>
    </div>
  )
}

export default Home
