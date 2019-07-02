import React from 'react'
import {Container} from 'reactstrap'

const Loading = (props) => (
   <Container>
      <img className="d-block mx-auto" src={props.image} alt='loading' />
   </Container>
)

export default Loading