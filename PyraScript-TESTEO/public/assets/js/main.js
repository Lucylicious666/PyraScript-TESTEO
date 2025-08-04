// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginStatus = document.getElementById('loginStatus');
    
    // Efectos de terminal
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    });
    
    // Cambiar entre login y registro
    registerBtn.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    // Simular login
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Aquí iría la conexión con el backend real
        if (username && password) {
            loginStatus.textContent = 'Acceso concedido';
            loginStatus.className = 'status-message access-granted';
            
            // Redirigir al dashboard después de 1.5 segundos
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            loginStatus.textContent = 'Acceso denegado';
            loginStatus.className = 'status-message access-denied';
        }
    });
});