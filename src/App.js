import React from 'react'
import styled from 'styled-components'
import backgroundImg from './assets/backgroundImage.jpg'
import Form from './components/Form'

const Container = styled.div`
background : linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${backgroundImg});
background-size : cover;
background-position : center;
padding :2rem 0;
`

const App = () => {
  return (
    <Container>
      <Form />
    </Container>
  )
}

export default App;
