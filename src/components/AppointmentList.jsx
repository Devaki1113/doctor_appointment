import React, { Component } from 'react';

class AppointmentList extends Component {
  render() {
    const { appointments, onCancel } = this.props;
    
    if (appointments.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No appointments booked yet.
        </div>
      );
    }

    return (
      <div className="appointments-list">
        {appointments.map(app => (
          <div key={app.id} className="appointment-item">
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{app.doctorName}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>{app.specialization}</div>
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                <span style={{ marginRight: '1rem' }}>📅 {app.date}</span>
                <span>⏰ {app.time}</span>
              </div>
            </div>
            <button 
              className="btn btn-danger" 
              style={{ width: 'auto' }}
              onClick={() => onCancel(app.id)}
            >
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default AppointmentList;
