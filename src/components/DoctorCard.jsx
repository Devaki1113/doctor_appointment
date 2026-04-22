import React, { Component } from 'react';

class DoctorCard extends Component {
  render() {
    const { doctor, onBook } = this.props;
    return (
      <div className="doctor-card">
        <div className="doctor-img-container">
          <img src={doctor.image} alt={doctor.name} className="doctor-img" />
        </div>
        <div className="doctor-info">
          <div className="doctor-spec">{doctor.specialization}</div>
          <div className="doctor-name">{doctor.name}</div>
          
          <button 
            className="btn btn-primary"
            style={{ marginTop: 'auto' }}
            onClick={() => onBook(doctor)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
