import React from 'react'
import Image from 'react-graceful-image'
import axios from 'axios'
import Loading from '../components/Loading'
import ellipsis from '../ellipsis.gif'


class MyImages extends React.Component {
   state = {
      images: [],
      isLoading: true,
   }

  componentDidMount() {
     let JWT = localStorage.getItem('JWT')
     axios.get('https://picture-me.herokuapp.com/api/v1/images/me', {
        headers: {
           Authorization: `Bearer ${JWT}`
        }
     }).then(result =>
         this.setState({
            images: result.data,
            isLoading: false,
         })
      )
  }

   render() {
      return(
         <>
            {this.state.isLoading ? <Loading image={ellipsis} />:
               <div className='userImages'>
                  {this.state.images.map((image,index) =>
                     <div className='square' key={index+image}>
                        <div className='inSquare'>
                           <Image src={image} className='img-fluid float-left d-block w-100' placeholderColor='#E9E9F1' /> 
                        </div>
                     </div>
                  )}
               </div>
            }
         </>         
      )
   }
}

export default MyImages