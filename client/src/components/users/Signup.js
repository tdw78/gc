import React, {Component} from 'react';
import axios from 'axios';


class Signup extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      buttonText: "Submit"
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }
 
   

  handleChange (e){
    this.setState({
      [e.target.name]: e.target.value
   });
   console.log(this.state)
  }
  
  clickSubmit(event){

    event.preventDefault();
    const { name, email, password} = this.state;

    axios
      .post(`${process.env.REACT_APP_API}/signup`, {
          name: name,
          email: email,
          password: password,
        })

      .then(response => {
          console.log(response)
      })
      .catch(error => {
        console.log(error);
      });


  }

  render (){
    return(

      <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={this.handleChange} name="name" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={this.handleChange} name="email" type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={this.handleChange} name="password" type="password" className="form-control" />
      </div>
      <div>
        <button className="btn btn-primary" onClick={this.clickSubmit}>{this.state.buttonText}</button>
      </div>
    </form>


    )
  }


};
export default Signup;