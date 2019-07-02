import React from 'react'
import UserImages from '../containers/UserImages'
import axios from 'axios'
import Loading from '../components/Loading'
import LoadImg from '../loading.gif'


class UserProfilePage extends React.Component {
   state = {
      userId: this.props.match.params.id,
      username: '',
      profileImage: '',
      isLoading: true,
   }

   componentDidMount() {
      axios.get(`https://insta.nextacademy.com/api/v1/users/${this.state.userId}`)
      .then(result => {
         this.setState({
            username: result.data.username,
            profileImage: result.data.profileImage,
            isLoading: false,
         })
      })
      .catch(error => {
         console.log('Error: ', error)
      })
    }

   render() {
      return(
         <>
            {this.state.isLoading ? <Loading image={LoadImg} /> : 
            <>
               <div className="profilePageHead">
                  <img src={this.state.profileImage} alt="profile"/>
                  <h1>{this.state.username}</h1>
               </div>
               <UserImages userId={this.state.userId} />
            </>
            }
         </>
      )
   }
}

export default UserProfilePage