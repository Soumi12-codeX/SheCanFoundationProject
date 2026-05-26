const SUPABASE_URL = "https://oziegpjkoftnjjuwmkmj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96aWVncGprb2Z0bmpqdXdta21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDUwMTcsImV4cCI6MjA5NTM4MTAxN30.nV-S75OyJDFWWlBv7Lq2GJXWGvSbUltPXmSngzdEpCE";

const ADMIN_SECRET = "admin123";

// Handle Authentication Form
document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPass = document.getElementById('adminPassword').value;
    const errMsg = document.getElementById('authError');

    if (inputPass === ADMIN_SECRET) {
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('dashboardScreen').style.display = 'block';
        fetchMessages(); // Load data seamlessly once unlocked
    } else {
        errMsg.style.display = 'block';
        document.getElementById('adminPassword').value = '';
    }
});

// Fetch Messages from Supabase Database Endpoint
async function fetchMessages() {
    const tbody = document.getElementById('messagesTableBody');
    const emptyState = document.getElementById('emptyState');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:3rem; color:var(--muted);">Retrieving database records...</td></tr>';
    emptyState.style.display = 'none';

    try {
        const targetUrl = `${SUPABASE_URL}/rest/v1/contact_messages?order=created_at.desc`;

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Fetch error structure status: ${response.status}`);

        const data = await response.json();
        tbody.innerHTML = '';

        if (!data || data.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        // Render Table Records dynamically
        data.forEach(item => {
            const row = document.createElement('tr');

            // Formatting dates nicely
            const dateObj = new Date(item.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            // Layout parameters safely
            const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim();
            const contactInfo = `<strong>${item.email}</strong>${item.phone ? `<br><span style="color:var(--muted); font-size:0.8rem;">${item.phone}</span>` : ''}`;
            const topicBadge = item.topic
                ? `<span class="badge badge-${item.topic}">${item.topic}</span>`
                : '<span class="badge badge-none">—</span>';

            row.innerHTML = `
            <td><div class="time-stamp"><strong>${formattedDate}</strong><br>${formattedTime}</div></td>
            <td style="font-weight:500; color:var(--rose-deep);">${fullName}</td>
            <td>${contactInfo}</td>
            <td>${topicBadge}</td>
            <td style="color:var(--text); max-width: 320px; word-wrap: break-word;">${escapeHtml(item.message)}</td>
          `;
            tbody.appendChild(row);
        });

    } catch (err) {
        console.error("Dashboard Fetch Failure:", err);
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:3rem; color:var(--error); font-weight:500;">⚠️ Data Synchronisation Failed: ${err.message}</td></tr>`;
    }
}

// Helper function to escape HTML string inputs safely (prevents XSS vulnerabilities)
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}