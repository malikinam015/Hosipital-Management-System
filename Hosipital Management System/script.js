// Data Store
const appData = {
  patients: [
    { id: 'P-001', name: 'Alice Johnson', age: 34, gender: 'Female', condition: 'Flu', status: 'Admitted', doctor: 'Dr. Wilson', date: '2024-03-10' },
    { id: 'P-002', name: 'Robert Smith', age: 52, gender: 'Male', condition: 'Hypertension', status: 'Outpatient', doctor: 'Dr. Chen', date: '2024-03-09' },
    { id: 'P-003', name: 'Emily Davis', age: 28, gender: 'Female', condition: 'Migraine', status: 'Discharged', doctor: 'Dr. Wilson', date: '2024-03-08' },
    { id: 'P-004', name: 'Michael Brown', age: 45, gender: 'Male', condition: 'Fracture', status: 'Admitted', doctor: 'Dr. Patel', date: '2024-03-10' },
    { id: 'P-005', name: 'Jessica Taylor', age: 61, gender: 'Female', condition: 'Diabetes', status: 'Outpatient', doctor: 'Dr. Chen', date: '2024-03-07' },
  ],
  appointments: [
    { id: 'A-001', patient: 'Alice Johnson', time: '09:00 AM', type: 'General Checkup', status: 'Confirmed' },
    { id: 'A-002', patient: 'Robert Smith', time: '10:30 AM', type: 'Cardiology', status: 'Pending' },
    { id: 'A-003', patient: 'Emily Davis', time: '11:15 AM', type: 'Neurology', status: 'Confirmed' },
    { id: 'A-004', patient: 'Michael Brown', time: '02:00 PM', type: 'Follow-up', status: 'Confirmed' },
  ],
  doctors: [
    { id: 'D-001', name: 'Dr. Sarah Wilson', specialty: 'General Medicine', patients: 24, status: 'Available' },
    { id: 'D-002', name: 'Dr. Raj Chen', specialty: 'Cardiology', patients: 18, status: 'In Surgery' },
    { id: 'D-003', name: 'Dr. Amit Patel', specialty: 'Orthopedics', patients: 15, status: 'Available' },
    { id: 'D-004', name: 'Dr. Lisa Lee', specialty: 'Neurology', patients: 20, status: 'Available' },
  ],
};

let currentPage = 'dashboard';

// Initialize App
function initApp() {
  renderApp();
  setupEventListeners();
}

// Render Main App Structure
function renderApp() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="app-container">
      <sidebar class="sidebar">
        <div class="logo">
          <div class="logo-icon">+</div>
          <span class="logo-text">MediCare</span>
        </div>
        <ul class="nav-menu">
          <li class="nav-item active" data-page="dashboard">
            <span class="nav-icon">📊</span>
            <span>Dashboard</span>
          </li>
          <li class="nav-item" data-page="patients">
            <span class="nav-icon">👥</span>
            <span>Patients</span>
          </li>
          <li class="nav-item" data-page="appointments">
            <span class="nav-icon">📅</span>
            <span>Appointments</span>
          </li>
          <li class="nav-item" data-page="doctors">
            <span class="nav-icon">🩺</span>
            <span>Doctors</span>
          </li>
        </ul>
      </sidebar>

      <div class="main-content">
        <header class="header">
          <h2 style="font-size: 18px; font-weight: 600;">MediCare Hospital Management</h2>
          <div class="header-right">
            <div class="user-info">
              <div>
                <div style="font-size: 14px; font-weight: 600;">Dr. Sarah Wilson</div>
                <div style="font-size: 12px; color: #6b7280;">Chief Medical Officer</div>
              </div>
              <div class="user-avatar">SW</div>
            </div>
          </div>
        </header>

        <div class="content">
          <div id="dashboard" class="page active"></div>
          <div id="patients" class="page"></div>
          <div id="appointments" class="page"></div>
          <div id="doctors" class="page"></div>
        </div>
      </div>
    </div>
  `;

  renderDashboard();
}

// Setup Event Listeners
function setupEventListeners() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const page = e.currentTarget.getAttribute('data-page');
      if (page) {
        navigateTo(page);
      }
    });
  });
}

// Navigation
function navigateTo(page) {
  currentPage = page;
  
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-page="${page}"]`).classList.add('active');

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  const pageElement = document.getElementById(page);
  if (pageElement) {
    pageElement.classList.add('active');
  }

  // Render page content
  switch(page) {
    case 'dashboard': renderDashboard(); break;
    case 'patients': renderPatients(); break;
    case 'appointments': renderAppointments(); break;
    case 'doctors': renderDoctors(); break;
  }
}

// Dashboard Page
function renderDashboard() {
  const dashboard = document.getElementById('dashboard');
  dashboard.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <div>
          <h1 class="page-title">Dashboard Overview</h1>
          <p class="page-subtitle">Welcome back, Dr. Wilson. Here's what's happening today.</p>
        </div>
        <div class="action-buttons">
          <button class="button button-outline">Download Report</button>
          <button class="button button-primary">+ New Appointment</button>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div>
            <div class="stat-value">1,284</div>
            <div class="stat-label">Total Patients</div>
            <div style="font-size: 12px; color: #10b981; margin-top: 8px;">↑ +12% from last month</div>
          </div>
          <div class="stat-icon" style="background: #dbeafe; color: #3b82f6;">👥</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-value">42</div>
            <div class="stat-label">Appointments Today</div>
            <div style="font-size: 12px; color: #10b981; margin-top: 8px;">↑ +5% increase</div>
          </div>
          <div class="stat-icon" style="background: #fef3c7; color: #f59e0b;">📅</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-value">8</div>
            <div class="stat-label">Operations In Progress</div>
            <div style="font-size: 12px; color: #ef4444; margin-top: 8px;">↓ -2% vs yesterday</div>
          </div>
          <div class="stat-icon" style="background: #fecaca; color: #ef4444;">🏥</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-value">$12,450</div>
            <div class="stat-label">Daily Revenue</div>
            <div style="font-size: 12px; color: #10b981; margin-top: 8px;">↑ +8% today</div>
          </div>
          <div class="stat-icon" style="background: #dcfce7; color: #10b981;">💰</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Admissions</div>
        </div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Condition</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${appData.patients.slice(0, 5).map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.age} / ${p.gender}</td>
                  <td>${p.condition}</td>
                  <td>${p.doctor}</td>
                  <td><span class="badge ${
                    p.status === 'Admitted' ? 'badge-success' :
                    p.status === 'Outpatient' ? 'badge-secondary' :
                    'badge-warning'
                  }">${p.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Patients Page
function renderPatients() {
  const patients = document.getElementById('patients');
  patients.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title">Patients</h1>
          <p class="page-subtitle">Manage patient records and admission status.</p>
        </div>
        <button class="button button-primary">+ Add Patient</button>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Patient List</div>
          <div class="search-input">
            <span>🔍</span>
            <input type="text" placeholder="Search patients...">
          </div>
        </div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Condition</th>
                <th>Doctor</th>
                <th>Admission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${appData.patients.map(p => `
                <tr>
                  <td><strong>${p.id}</strong></td>
                  <td>${p.name}</td>
                  <td>${p.age} / ${p.gender}</td>
                  <td>${p.condition}</td>
                  <td>${p.doctor}</td>
                  <td>${p.date}</td>
                  <td><span class="badge ${
                    p.status === 'Admitted' ? 'badge-success' :
                    p.status === 'Outpatient' ? 'badge-secondary' :
                    p.status === 'Emergency' ? 'badge-danger' :
                    'badge-warning'
                  }">${p.status}</span></td>
                  <td><button class="button button-outline" style="font-size: 12px;">View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Appointments Page
function renderAppointments() {
  const appointments = document.getElementById('appointments');
  appointments.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title">Appointments</h1>
          <p class="page-subtitle">Manage and schedule patient appointments.</p>
        </div>
        <button class="button button-primary">+ Schedule Appointment</button>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Today's Schedule</div>
        </div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${appData.appointments.map(a => `
                <tr>
                  <td><strong>${a.id}</strong></td>
                  <td>${a.patient}</td>
                  <td>${a.time}</td>
                  <td>${a.type}</td>
                  <td><span class="badge ${
                    a.status === 'Confirmed' ? 'badge-success' :
                    a.status === 'Pending' ? 'badge-warning' :
                    'badge-danger'
                  }">${a.status}</span></td>
                  <td><button class="button button-outline" style="font-size: 12px;">Manage</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Doctors Page
function renderDoctors() {
  const doctors = document.getElementById('doctors');
  doctors.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title">Doctors</h1>
          <p class="page-subtitle">View and manage medical staff.</p>
        </div>
        <button class="button button-primary">+ Add Doctor</button>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Medical Staff</div>
        </div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Patients</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${appData.doctors.map(d => `
                <tr>
                  <td><strong>${d.id}</strong></td>
                  <td>${d.name}</td>
                  <td>${d.specialty}</td>
                  <td>${d.patients}</td>
                  <td><span class="badge ${
                    d.status === 'Available' ? 'badge-success' :
                    d.status === 'In Surgery' ? 'badge-warning' :
                    'badge-secondary'
                  }">${d.status}</span></td>
                  <td><button class="button button-outline" style="font-size: 12px;">View Profile</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Start the app
initApp();
