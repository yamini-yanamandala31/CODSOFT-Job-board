// GLOBAL DATA (Initial Jobs)
let jobs = [
    {
        title: "Frontend Developer",
        company: "CodSoft Tech",
        location: "Remote",
        salary: "$60,000/yr",
        desc: "Build responsive user interfaces using HTML, CSS, and JavaScript. Collaborate with design teams to bring mockups to life."
    },
    {
        title: "Backend Engineer",
        company: "MongoDB Solutions",
        location: "Hyderabad, IN",
        salary: "$80,000/yr",
        desc: "Develop secure Node.js backend services and maintain database models in MongoDB. Write clean, optimized, and testable code."
    }
];

let applications = [];

// 1. PAGE SWITCHING LOGIC
function showPage(pageId) {
    // Hide all sections first
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    // Show selected section
    document.getElementById(`${pageId}-page`).classList.add('active');
}

// 2. SEARCH FUNCTIONALITY (Requirement: Search filters)
function filterJobs() {
    let searchText = document.getElementById('search-input').value.toLowerCase();
    let container = document.getElementById('job-cards-container');
    container.innerHTML = ""; // Clear existing

    let filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchText) || 
        job.company.toLowerCase().includes(searchText)
    );

    if(filtered.length === 0) {
        container.innerHTML = "<p style='color:#64748b; grid-column: 1/-1; text-align:center;'>No jobs found matching your search.</p>";
        return;
    }

    filtered.forEach(job => {
        let card = document.createElement('div');
        card.className = "job-card";
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="location">${job.location}</p>
            <button class="btn-sm" onclick="viewJobDetail('${job.title}', '${job.company}', '${job.location}', '${job.salary}', '${job.desc}')">View Details</button>
        `;
        container.appendChild(card);
    });
}

// 3. JOB DETAIL VIEW
function viewJobDetail(title, company, location, salary, desc) {
    document.getElementById('detail-title').innerText = title;
    document.getElementById('detail-company').innerText = company;
    document.getElementById('detail-location').innerText = location;
    document.getElementById('detail-salary').innerText = salary;
    document.getElementById('detail-desc').innerText = desc;
    showPage('detail');
}

// 4. JOB APPLICATION PROCESS (Requirement: Form submission)
function handleApply(event) {
    event.preventDefault();
    let jobTitle = document.getElementById('detail-title').innerText;
    let company = document.getElementById('detail-company').innerText;

    // Save to dynamic applications list
    applications.push({
        title: jobTitle,
        company: company,
        status: "Applied (Reviewing Resume)"
    });

    alert("Successfully applied! Your resume has been uploaded.");
    document.getElementById('apply-form').reset();
    updateCandidateDashboard();
    showPage('candidate');
}

// 5. EMPLOYER DASHBOARD (Requirement: Posting new jobs)
function handlePostJob(event) {
    event.preventDefault();
    
    let newJob = {
        title: document.getElementById('post-title').value,
        company: document.getElementById('post-company').value,
        location: document.getElementById('post-location').value,
        salary: document.getElementById('post-salary').value,
        desc: document.getElementById('post-desc').value
    };

    jobs.push(newJob);
    alert("New job posted successfully onto the job list!");
    document.getElementById('post-job-form').reset();
    filterJobs(); // Refresh job lists page
    showPage('listings');
}

// 6. CANDIDATE DASHBOARD UPDATE (Dynamic Tables)
function updateCandidateDashboard() {
    let tbody = document.getElementById('applications-table-body');
    tbody.innerHTML = "";

    if(applications.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='text-align:center; color:#94a3b8;'>You haven't applied for any jobs yet.</td></tr>";
        return;
    }

    applications.forEach(app => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${app.title}</strong></td>
            <td>${app.company}</td>
            <td><span style="background:#dbeafe; color:#1e40af; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">${app.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Run initially to load table placeholder
updateCandidateDashboard();