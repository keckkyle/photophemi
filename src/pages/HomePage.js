import React from 'react'
import UserImages from '../containers/UserImages.js'
import {Container, CardTitle} from 'reactstrap'
import Image from 'react-graceful-image'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import LoadImg from '../loading.gif'
import axios from 'axios'

class HomePage extends React.Component {
  state = {
    users: [],
    isLoading: true,
  }

  componentDidMount() {
    axios.get('https://picture-me.herokuapp.com/api/v1/users')
    .then(result => {
      this.setState({
        users: result.data.data,
        isLoading: false,
      })
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  }

  render(){
    return(
      <Container fluid>
        {this.state.isLoading ? <Loading image={LoadImg} /> : 
        this.state.users.map(user =>
          <div className="hpUserDisplay" key={user.id}>
            <div className=" p-0 hpAvatar">
              <Link to={`/users/${user.id}`}>
                <Image className="hpUserImg" width='100%' placeholderColor='#E9E9F1' src={user.profileImage} />
                <CardTitle>
                {user.username}
                </CardTitle>
              </Link>
            </div>
            <UserImages userId={user.id} />
          </div>
        )
      }

      </Container>
    )
  }
}

export default HomePage