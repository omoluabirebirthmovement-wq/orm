/* Admin Dashboard Controllers and CMS Engine for ORM */

// Default admin credentials (change these in production)
const ADMIN_CREDENTIALS = {
  email: "omoluabirebirthmovement@gmail.com",
  password: "Covid-19@#"
};

class ORMAdminDashboard {
  constructor() {
    this.activeTab = "volunteers";
    this.isAuthenticated = sessionStorage.getItem("orm_admin_auth") === "true";
  }

  // Show login overlay
  showLogin() {
    const overlay = document.getElementById("admin-login-overlay");
    if (overlay) overlay.classList.add("active");
    const form = document.getElementById("admin-login-form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("admin-email").value.trim();
        const password = document.getElementById("admin-password").value.trim();
        const errorEl = document.getElementById("admin-login-error");
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          this.isAuthenticated = true;
          sessionStorage.setItem("orm_admin_auth", "true");
          overlay.classList.remove("active");
          form.reset();
          if (errorEl) errorEl.style.display = "none";
          document.getElementById("admin-email").value = "";
          document.getElementById("admin-password").value = "";
          window.router("admin-view");
        } else {
          if (errorEl) errorEl.style.display = "block";
        }
      };
    }
  }

  // Logout
  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem("orm_admin_auth");
    window.router("home-view");
    window.showToast("Logged out of admin panel.");
  }

  // Check auth before rendering
  requireAuth() {
    if (!this.isAuthenticated) {
      this.showLogin();
      return false;
    }
    return true;
  }

  // Refresh and calculate analytical metrics
  renderStats() {
    if (!this.requireAuth()) return;
    const volunteers = window.db.getVolunteers();
    const bookings = window.db.getBookings();
    const reports = window.db.getReports();
    const donations = window.db.getDonations();

    // Sum donation total
    const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);
    const pendingReportsCount = reports.filter(r => r.status === "pending").length;
    const approvedBookingsCount = bookings.filter(b => b.status === "approved").length;

    // Set UI elements
    this.setElText("admin-stat-vols", volunteers.length);
    this.setElText("admin-stat-reports", pendingReportsCount);
    this.setElText("admin-stat-bookings", approvedBookingsCount);
    this.setElText("admin-stat-funds", "₦" + totalDonated.toLocaleString());
  }

  // Master rendering method based on active sub-view
  renderData() {
    if (!this.requireAuth()) return;
    this.renderStats();
    
    const tableHeader = document.getElementById("admin-table-title");
    const tableHeadRow = document.getElementById("admin-thead-row");
    const tableBody = document.getElementById("admin-tbody");
    
    if (!tableHeader || !tableHeadRow || !tableBody) return;

    tableBody.innerHTML = "";

    if (this.activeTab === "volunteers") {
      tableHeader.textContent = "Volunteer & Ambassador Applications";
      tableHeadRow.innerHTML = `
        <th>Name</th>
        <th>Age/State</th>
        <th>School</th>
        <th>Skills</th>
        <th>Requested Role</th>
        <th>Status</th>
        <th>Actions</th>
      `;
      
      const volunteers = window.db.getVolunteers();
      volunteers.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${v.name}</strong><br><small>${v.socials || ''}</small></td>
          <td>${v.age} yrs / ${v.state}</td>
          <td>${v.school}</td>
          <td>${v.skills}</td>
          <td><span class="badge-status resolved">${v.role}</span></td>
          <td><span class="badge-status ${v.status}">${v.status}</span></td>
          <td>
            ${v.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="window.admin.approveVolunteer('${v.id}')">Approve</button>` : ''}
            <button class="btn btn-sm btn-light" onclick="window.admin.deleteVolunteer('${v.id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });

    } else if (this.activeTab === "bookings") {
      tableHeader.textContent = "Interview & Counseling Bookings";
      tableHeadRow.innerHTML = `
        <th>Client Name</th>
        <th>Category</th>
        <th>Requested Date/Time</th>
        <th>Contact Info</th>
        <th>Notes</th>
        <th>Status</th>
        <th>Actions</th>
      `;

      const bookings = window.db.getBookings();
      bookings.forEach(b => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${b.name}</strong></td>
          <td><span class="badge-status pending">${b.category}</span></td>
          <td>${b.date} <br><small>${b.time}</small></td>
          <td>Tel: ${b.phone}<br>WA: ${b.whatsapp}</td>
          <td><small>${b.notes}</small></td>
          <td><span class="badge-status ${b.status}">${b.status}</span></td>
          <td>
            ${b.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="window.admin.approveBooking('${b.id}')">Approve</button>` : ''}
            <button class="btn btn-sm btn-light" onclick="window.admin.deleteBooking('${b.id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });

    } else if (this.activeTab === "reports") {
      tableHeader.textContent = "Counseling Center & Anonymous Reports";
      tableHeadRow.innerHTML = `
        <th>Case Category</th>
        <th>Details</th>
        <th>Reporter Information</th>
        <th>State / School</th>
        <th>Created Date</th>
        <th>Status</th>
        <th>Actions</th>
      `;

      const reports = window.db.getReports();
      reports.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><span class="badge-status pending">${r.category}</span></td>
          <td><small>${r.details}</small></td>
          <td>${r.contactInfo || 'Anonymous'}<br><small>${r.whatsapp || ''}</small></td>
          <td>${r.state} / ${r.school || 'N/A'}</td>
          <td>${r.createdAt}</td>
          <td><span class="badge-status ${r.status}">${r.status}</span></td>
          <td>
            ${r.status === 'pending' ? `<button class="btn btn-sm btn-accent" onclick="window.admin.resolveReport('${r.id}')">Mark Resolved</button>` : 'Resolved'}
          </td>
        `;
        tableBody.appendChild(tr);
      });

    } else if (this.activeTab === "donations") {
      tableHeader.textContent = "Sponsor Partnerships & Donation Ledger";
      tableHeadRow.innerHTML = `
        <th>Donor Name</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Date Received</th>
      `;

      const donations = window.db.getDonations();
      donations.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${d.name}</strong></td>
          <td><strong class="highlight-green">₦${Number(d.amount).toLocaleString()}</strong></td>
          <td><span class="badge-status resolved">${d.type}</span></td>
          <td>${d.date}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
  }

  // --- ACTIONS ---
  approveVolunteer(id) {
    window.db.updateVolunteerStatus(id, "approved");
    window.showToast("Volunteer application approved successfully.");
    this.renderData();
  }

  deleteVolunteer(id) {
    window.db.deleteVolunteer(id);
    window.showToast("Volunteer deleted successfully.");
    this.renderData();
  }

  approveBooking(id) {
    window.db.updateBookingStatus(id, "approved");
    window.showToast("Counseling booking approved and counselor assigned.");
    this.renderData();
  }

  deleteBooking(id) {
    window.db.deleteBooking(id);
    window.showToast("Booking request deleted.");
    this.renderData();
  }

  resolveReport(id) {
    window.db.updateReportStatus(id, "resolved");
    window.showToast("Case marked as fully resolved.");
    this.renderData();
  }

  // Switch Sub-tabs inside Admin Dashboard
  switchTab(tabName) {
    this.activeTab = tabName;
    
    // Toggle active menu class
    document.querySelectorAll(".admin-menu-item").forEach(btn => {
      btn.classList.remove("active");
    });
    const targetBtn = document.querySelector(`[data-admin-tab="${tabName}"]`);
    if (targetBtn) targetBtn.classList.add("active");

    this.renderData();
  }

  // Create new blog article
  handleCreateBlog(e) {
    e.preventDefault();
    const title = document.getElementById("blog-title-input").value.trim();
    const category = document.getElementById("blog-category-select").value;
    const author = document.getElementById("blog-author-input").value.trim();
    const excerpt = document.getElementById("blog-excerpt-input").value.trim();
    const content = document.getElementById("blog-content-input").value.trim();

    if (!title || !author || !excerpt || !content) {
      alert("Please fill out all fields.");
      return;
    }

    const newBlog = window.db.addBlog({
      title,
      category,
      author,
      excerpt,
      content
    });

    window.showToast("New blog article published successfully.");
    document.getElementById("admin-blog-form").reset();
    
    // Switch to blogs listing page or refresh blog lists if open
    if (window.renderBlogsGrid) {
      window.renderBlogsGrid();
    }
  }

  // --- UTILS ---
  setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

window.admin = new ORMAdminDashboard();
console.log("ORM Admin Dashboard module loaded.");
