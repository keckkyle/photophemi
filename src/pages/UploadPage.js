import React from 'react'
import {Form, FormGroup, Input, Button, Label, Container} from 'reactstrap'
import axios from 'axios';
import loading from '../loading.gif'
import Loading from '../components/Loading'

class UploadPage extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         imageFile: null,
         previewImage: '',
         message: 'Photo Preview',
         isLoading: false
      }
   }

   handleFile = (e) => {
      this.setState({
         imageFile: e.target.files[0],
         previewImage: URL.createObjectURL(e.target.files[0])
      })
   }

   handleSubmitFile = e => {
      this.setState({
         isLoading: true
      })
      
      e.preventDefault()
      let JWT = localStorage.getItem("JWT")
      let formData = new FormData()
      formData.append("user_file", this.state.imageFile)
      axios.post('https://picture-me.herokuapp.com/api/v1/images/', formData, {
         headers: {Authorization : `Bearer ${JWT}`}
      })
      .then(response => {
         if(response.data.success){
            this.setState({
               message: 'Image uploaded successfully.',
               previewImage: '',
               imageFile: null,
               isLoading: false,
            })
         }
      })
      .catch(error =>{
         console.log(error.response)
      })
   }

   render(){
      const {previewImage, imageFile, message, isLoading} = this.state
      return(

         <Container fluid className='p-2 imageUpload'>
            <div className='square'>
               <div className='inSquare'>
                  {isLoading ? <Loading image={loading} /> :
                  <>
                     {previewImage !== '' ?
                     <img
                        src={previewImage}
                        alt='preview'
                        className="img-fluid float-left d-block w-100" 
                     />
                     :
                     <h3>{message}</h3>
                     }
                  </>
                  }
               </div>
            </div>



            <Form>
               <FormGroup>
                  <Input 
                     className="fileinput"
                     type="file" 
                     name="image-file" 
                     id="image-file" 
                     multiple={false}
                     onChange={this.handleFile}
                  />
                  <Label htmlFor='image-file'>Choose a file</Label>
               </FormGroup>
               <Button 
                  type="submit" 
                  color="primary"
                  onClick={this.handleSubmitFile}
                  disabled={imageFile === null ? true : false}
               >
                  Upload
               </Button>
            </Form>


         </Container>
         


      )
   }
}

export default UploadPage