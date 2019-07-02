import React from 'react'
import {Container, Button} from 'reactstrap'
import HomePage from './HomePage'
import UploadPage from './UploadPage'
import MyImages from '../containers/MyImages'


class MyProfilePage extends React.Component {
   state = {
      images: [],
      isLoading: true,
      uploadForm: false,
      uploadBtn: 'Upload Image'
   }

  toggleUploadForm = () => {this.state.uploadForm ? this.setState({
     uploadForm: false,
     uploadBtn: 'Upload Image'
  }) : this.setState({
   uploadForm: true,
   uploadBtn: 'View Images'
   })
}

   render() {
      return(
         <>
            {this.props.currentUser !== null ?
            <>
               <div className="profilePageHead">
                  <img src={this.props.currentUser.profile_picture} alt="profile"/>
                  <div className="userInfo">
                     <h1>{this.props.currentUser.username}</h1>
                     <Button onClick={this.toggleUploadForm}>{this.state.uploadBtn}</Button>
                  </div>
               </div>
               <Container fluid className='p-2'>
                  {this.state.uploadForm ? <UploadPage /> : < MyImages />}
               </Container>
               </>
            :
            <>
               <div className="profilePageHead">
                  <div>
                     <h1>Not found</h1>
                     <p>Please log in or sign up to view your profile page.</p>
                  </div>
               </div>
               <HomePage />
            </>
            }
         </>
      )
   }
}

export default MyProfilePage