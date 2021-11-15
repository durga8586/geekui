import {Component} from 'react'

import User from './components/User'
import Pagination from './components/Pagination'

import './App.css'

class App extends Component {
  state = {
    userList: [],
    searchValue: '',
    currentPage: 1,
    isMainCheckBoxChecked: false,
  }

  componentDidMount() {
    this.getUsersList()
  }

  getUsersList = async () => {
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      email: eachData.email,
      role: eachData.role,
      isChecked: false,
    }))
    this.setState({userList: updatedData})
  }

  onDeleteUser = userId => {
    const {userList} = this.state
    const filteredUsers = userList.filter(eachUser => eachUser.id !== userId)
    this.setState({userList: filteredUsers})
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  getSearchResults = userList => {
    const {searchValue} = this.state
    const searchResult = userList.filter(eachUserDetails =>
      eachUserDetails.name.includes(searchValue),
    )
    return searchResult
  }

  getCurrentPageUsers = searchResults => {
    const {currentPage} = this.state
    const usersPerPage = 10
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser)
    console.log(currentUsers)
    return currentUsers
  }

  onEditUser = () => {}

  onChangeMainCheckBox = () => {
    this.setState(prevState => ({
      isMainCheckBoxChecked: !prevState.isMainCheckBoxChecked,
    }))
  }

  paginate = number => {
    this.setState({currentPage: number})
  }

  allDeleteUsers = () => {
    const {userList} = this.state
    const searchResults = this.getSearchResults(userList)
    const filteredData = searchResults.filter(
      eachUser => eachUser.isChecked === true,
    )
    this.setState({userList: filteredData})
  }

  isUserChecked = userId => {
    this.setState(prevState => ({
      userList: prevState.userList.map(eachUser => {
        if (userId === eachUser.id) {
          return {...eachUser, isChecked: !eachUser.isChecked}
        }
        return eachUser
      }),
    }))
  }

  render() {
    const {
      userList,
      searchValue,
      currentPage,
      isMainCheckBoxChecked,
    } = this.state

    const searchResults = this.getSearchResults(userList)

    const currentUsers = this.getCurrentPageUsers(searchResults)

    return (
      <div className="admin-users-main-container">
        <div className="admin-users-container">
          <input
            className="users-search-bar"
            type="search"
            value={searchValue}
            onChange={this.onChangeSearchInput}
            placeholder="Search by name,email or role"
          />
          <ul className="users-list-container">
            <li className="users-list">
              <input
                type="checkbox"
                className="check-box"
                onChange={this.onChangeMainCheckBox}
                checked={isMainCheckBoxChecked}
              />
              <p className="user-list-headers">Name</p>
              <p className="user-list-headers">Email</p>
              <p className="user-list-headers">Role</p>
              <p className="user-list-headers">Actions</p>
            </li>
            {currentUsers.map(eachUser => (
              <User
                user={eachUser}
                key={eachUser.id}
                onDeleteUser={this.onDeleteUser}
                onEditUser={this.onEditUser}
                isUserChecked={this.isUserChecked}
              />
            ))}
          </ul>
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalUsers={searchResults.length}
              paginate={this.paginate}
              allDeleteUsers={this.allDeleteUsers}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
