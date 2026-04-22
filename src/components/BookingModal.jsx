import React, { Component } from 'react';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '',time:"" };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { doctor, onConfirm } = this.props;
    const { date, time } = this.state;
    
    onConfirm({
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date,
      time
    });
  };

  render() {
    const { doctor, onClose } = this.props;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Book with {doctor.name}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Select Date</label>
              <input 
                type="date" 
                className="input-field"
                required 
                onChange={(e) => this.setState({ date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Select Time</label>
              <input 
                type="time" 
                className="input-field"
                required 
                onChange={(e) => this.setState({ time: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BookingModal;


