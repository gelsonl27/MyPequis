// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
    
    // Add logout button to navigation
    const nav = document.querySelector('nav');
    const logoutSection = document.createElement('div');
    logoutSection.innerHTML = `
        <div class="nav-links" style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            <a href="#" id="logoutBtn" style="color: #e74c3c;">
                <div class="feature-icon">🚪</div>Sair do Sistema
            </a>
        </div>
    `;
    nav.appendChild(logoutSection);
    
    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
});
