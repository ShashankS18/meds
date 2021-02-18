import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Medicine = props => (
  <tr>
    <td>{props.medicine.username}</td>
    <td>{props.medicine.description}</td>
    <td>{props.medicine.quantity}</td>
    <td>{props.medicine.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.medicine._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMedicine(props.medicine._id) }}>done</a>
    </td>
  </tr>
)

export default class MedicinesList extends Component {

  constructor(props) {
    super(props);
    this.deleteMedicine = this.deleteMedicine.bind(this);
    this.state = {medicines: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/medicines/')
     .then(response => {
       this.setState({ medicines: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteMedicine(id) {
    axios.delete('http://localhost:5000/medicines/'+id)
      .then(res => console.log(res.data));
    this.setState({
      medicines: this.state.medicines.filter(el => el._id !== id)
    })
  }

  medicineList() {
    return this.state.medicines.map(currentmedicine => {
      return <Medicine medicine={currentmedicine} deleteMedicine={this.deleteMedicine} key={currentmedicine._id}/>;
    })
  }

  render() {
    return (
      <div>
      <h3>Medicines Requested</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.medicineList() }
        </tbody>
      </table>
    </div>
    )
  }
}