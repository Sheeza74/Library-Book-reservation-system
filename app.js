const API = 'http://localhost:3000';


function showPage(pageId) {
    const allpages = ['home','register','login','catalog','dashboard',];
    allpages.forEach(function(id) {
        document.getElementById(id).style.display = 'none';
    })
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'catalog')   loadBooks();
    if (pageId === 'dashboard') loadDashboard();
   
}
  
function showNav(role) {
    document.getElementById('nav-guest').style.display = 'none';
    document.getElementById('nav-student').style.display = 'none';

    if(role === 'student') {
        document.getElementById('nav-student').style.display = 'flex';
    } else {
        document.getElementById('nav-guest').style.display = 'flex';
    }

}
    // Logout function
function logout() {
    localStorage.removeItem('user');
    showNav('guest');
    showPage('home');
}
      
function getUser() {
    const data = localStorage.getItem('user');
    if(data) {
        return JSON.parse(data);
    } else {
        return null;
    }
}

async function register() {
    const name = document.getElementById('reg-name').value.trim();
    const studentId = document.getElementById('reg-studentid').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    document.getElementById('reg-error').textContent = '';

    if(!name || !email || !password) {
        document.getElementById('reg-error').textContent = 'Please fill the required fields';
        return;
    }

    if(password.length < 8) {
        document.getElementById('reg-error').textContent = 'Password must be atleast 8 character';
        return;
    }

    try {
        document.getElementById('reg-error').textContent = 'Please wait.....';
        
        const response = await fetch(`${API}/users?email=${email}`);
        if(!response.ok) throw new Error('Server Error!');
        const existing = await response.json();

        if (existing.length > 0) {
            document.getElementById('reg-error').textContent = 'Email already registered!';
            return;
        }

        const result = await fetch(`${API}/users` , {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name:      name,
                studentId: studentId,
                email:     email,
                password:  password,
                role:      'student'
            })

        });
        if (!result.ok) throw new Error ('Registration Failed!');

        document.getElementById('reg-error').style.color = 'green';
        document.getElementById('reg-error').textContent = 'Regiatration Successful! Please Login.';

        setTimeout(function() {
            showPage('login');
        } , 1500);
    } catch (error) {
        document.getElementById('reg-error').textContent = 'Cannot connect to server'
    }
}

async function login() {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

   
    document.getElementById('login-error').textContent = '';

    if (!email || !password) {
        document.getElementById('login-error').textContent = 'Please enter email and password!';
        return;
    }

    try {
        document.getElementById('login-error').textContent = 'Please wait...';

        const response = await fetch(`${API}/users?email=${email}&password=${password}`);
        if (!response.ok) throw new Error('Server error!');
        const users = await response.json();

        if (users.length === 0) {
            document.getElementById('login-error').textContent = 'Wrong email or password!';
            return;
        }

        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));

        
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            showNav('student');
            showPage('dashboard');
        }

    } catch (error) {
        document.getElementById('login-error').textContent = 'Cannot connect to server!';
    }
}

