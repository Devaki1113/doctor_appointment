import React, { Component } from 'react';
import Navbar from './components/Navbar';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import AppointmentList from './components/AppointmentList';
import { doctors } from './mockData';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: doctors,
      filteredDoctors: doctors,
      appointments: [],
      selectedDoctor: null,
      searchTerm: '',
      filterSpec: 'All',
      showToast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    // Load appointments from LocalStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      this.setState({ appointments: JSON.parse(savedAppointments) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Save to LocalStorage whenever appointments change
    if (prevState.appointments !== this.state.appointments) {
      localStorage.setItem('appointments', JSON.stringify(this.state.appointments));
    }
  }

  handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm }, this.applyFilters);
  };

  handleFilter = (e) => {
    const filterSpec = e.target.value;
    this.setState({ filterSpec }, this.applyFilters);
  };

  applyFilters = () => {
    const { allDoctors, searchTerm, filterSpec } = this.state;
    let filtered = allDoctors.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm) || 
      doc.specialization.toLowerCase().includes(searchTerm)
    );

    if (filterSpec !== 'All') {
      filtered = filtered.filter(doc => doc.specialization === filterSpec);
    }

    this.setState({ filteredDoctors: filtered });
  };

  handleBookClick = (doctor) => {
    this.setState({ selectedDoctor: doctor });
  };

  confirmBooking = (appointment) => {
    this.setState(prevState => ({
      appointments: [...prevState.appointments, appointment],
      selectedDoctor: null,
      showToast: true,
      toastMessage: 'Appointment booked successfully!'
    }));

    setTimeout(() => this.setState({ showToast: false }), 3000);
  };

  cancelAppointment = (id) => {
    this.setState(prevState => ({
      appointments: prevState.appointments.filter(app => app.id !== id),
      showToast: true,
      toastMessage: 'Appointment cancelled.'
    }));

    setTimeout(() => this.setState({ showToast: false }), 3000);
  };

  render() {
    const { filteredDoctors, selectedDoctor, appointments, showToast, toastMessage, filterSpec } = this.state;
    const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

    return (
      <div className="app">
        <Navbar />

        <header className="header-section">
          <div className="container">
            <h1>Find and Book Your Doctor</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Select from our specialized team of healthcare professionals and book your appointment in seconds.
            </p>

            <div className="search-filter-container">
              <input 
                type="text" 
                placeholder="Search doctors by name..." 
                className="input-field"
                onChange={this.handleSearch}
              />
              <select className="input-field" onChange={this.handleFilter} value={filterSpec}>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <main className="container">
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Available Doctors</h2>
            <div className="doctor-grid">
              {filteredDoctors.map(doctor => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onBook={this.handleBookClick}
                />
              ))}
            </div>
          </section>
        </main>

        <section className="appointments-section">
          <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>Your Appointments</h2>
            <AppointmentList 
              appointments={appointments} 
              onCancel={this.cancelAppointment}
            />
          </div>
        </section>

        {selectedDoctor && (
          <BookingModal 
            doctor={selectedDoctor} 
            onClose={() => this.setState({ selectedDoctor: null })}
            onConfirm={this.confirmBooking}
          />
        )}

        {showToast && (
          <div className="toast">
            {toastMessage}
          </div>
        )}

        <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 PlusCare Health Services. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
