import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Select, { createFilter } from 'react-select';

const options = [
  { value: 'Shashank', label: 'Shashank' },
  { value: 'Shreyansh', label: 'Shreyansh' },
  { value: 'Rohan', label: 'Rohan' },
  { value: 'Shubha', label: 'Shubha' },
  { value: 'Rohshni', label: 'Rohshni' },
  { value: 'Abhi', label: 'Abhi' },
];



export default class CreateMedicine extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      quantity: 0,
      date: new Date(),
      selectedOption: null,
      users: [],
      ignoreCase: false,
    ignoreAccents: false,
    trim: false,
    matchFromStart: false
    }
  }

  componentDidMount() {
  axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({ 
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const medicine = {
      username: this.state.username,
      description: this.state.description,
      quantity: this.state.quantity,
      date: this.state.date,
    };
  
    console.log(medicine);

    axios.post('http://localhost:5000/medicines/add', medicine)
  .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    const { selectedOption } = this.state;
    const { ignoreCase, ignoreAccents, trim, matchFromStart } = this.state;

    const filterConfig = {
      ignoreCase,
      ignoreAccents,
      trim,
      matchFrom: this.state.matchFromStart ? 'start' : 'any',
    };
    return (
      <div>
        <h3>Create New Medicine Request</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <Select
            placeholder="Enter the username"
            filterOption={createFilter(filterConfig)}
            value={selectedOption}
            onChange={this.handleChange}
             options={options}
      />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create New Medicine Request" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}