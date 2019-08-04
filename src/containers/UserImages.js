import React from 'react'
import axios from 'axios'
import {Container} from 'reactstrap'
import Image from 'react-graceful-image'
import Loading from '../components/Loading'
import ellipsis from '../ellipsis.gif'


class UserImages extends React.Component {
   state ={
      images: [],
      isLoading: true,
   }
  
   componentDidMount() {
      axios.get(`https://picture-me.herokuapp.com/api/v1/images?userId=${this.props.userId}`)
      .then(result => {
         this.setState({
            images: result.data,
            isLoading: false,
         })
      })
      .catch(error => {
         console.log('Error: ', error)
      })
   }
  
  
   render() {
    return(
         <Container fluid className='p-2'>
            {this.state.isLoading ? <Loading image={ellipsis} /> :
            <div className="userImages">
            {this.state.images.map((image,index) =>
               <div className='square' key={index + image}>
                  <div className='inSquare'>
                  <Image src={image} className="img-fluid float-left d-block w-100" placeholderColor="#E9E9F1"/>
                  </div>
               </div>
            )}
            </div>
            }
         </Container>
      )
   }
}

export default UserImages