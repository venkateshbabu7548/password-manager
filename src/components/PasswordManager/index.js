import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    isPasswordsContain: false,
    isMasked: true,
    passwordsList: [],
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddButton = () => {
    const {website, username, password} = this.state
    console.log('Hii')
    if (website !== '' && username !== '' && password !== '') {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        isPasswordsContain: true,
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  setIsPasswordContains = () => {
    this.setState({isPasswordsContain: false})
  }

  onTogglePassword = () => {
    const {isPasswordsContain} = this.state
    if (isPasswordsContain) {
      this.setState(prevState => ({isMasked: !prevState.isMasked}))
    }
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredPasswords = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredPasswords})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      website,
      username,
      password,
      isPasswordsContain,
      isMasked,
      searchInput,
      passwordsList,
    } = this.state
    console.log(passwordsList)
    let displayPasswords
    const searchedPasswords = passwordsList.filter(each =>
      each.username.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (isPasswordsContain && searchedPasswords.length !== 0) {
      displayPasswords = searchedPasswords.map(each => (
        <PasswordItem
          key={each.id}
          details={each}
          isMasked={isMasked}
          onDeletePassword={this.onDeletePassword}
        />
      ))
    } else {
      displayPasswords = (
        <li className="no-passwords-con">
          <div className="img-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-passwords-img"
            />
            <p>No Passwords</p>
          </div>
        </li>
      )
    }
    return (
      <div className="con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-card">
          <div className="user-inputs-con">
            <h1 className="heading">Add New Password</h1>
            <form className="form" onSubmit={this.onAddButton}>
              <div className="input-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="img"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="img"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="img"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="btn-con">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="top-card bottom-card">
          <div className="first">
            <div className="title-con">
              <h1 className="heading">Your Passwords</h1>
              <p className="passwords-count">{passwordsList.length}</p>
            </div>
            <div className="search-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="img"
              />
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="second">
            <div className="tick">
              <input
                type="checkbox"
                id="password"
                className="checkbox"
                onChange={this.onTogglePassword}
              />
              <label htmlFor="password">Show Passwords</label>
            </div>
          </div>
          <ul className="items-con">{displayPasswords}</ul>
        </div>
      </div>
    )
  }
}
export default PasswordManager
