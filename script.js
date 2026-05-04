 // Simulated user database
  const users = [];

  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const bgMap = {
      connexion: 'bg-connexion',
      accueil: 'bg-accueil',
      inscription: 'bg-inscription'
    };
    const page = document.getElementById('page-' + name);
    page.classList.add('active');
    document.body.className = '';
    document.body.style.background = '';
  }

  function showAlert(msg, isError = false) {
    const el = document.getElementById('alert');
    el.textContent = msg;
    el.className = 'alert show' + (isError ? ' error' : '');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  function handleConnexion() {
    const matricule = document.getElementById('login-matricule').value.trim();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!matricule || !email || !password) {
      showAlert('Veuillez remplir tous les champs.', true);
      return;
    }

    const user = users.find(u => u.matricule === matricule && u.email === email && u.password === password);
    if (user) {
      showAlert('Connexion réussie ! Bienvenue ' + user.nom);
      setTimeout(() => showPage('accueil'), 1000);
    } else if (users.length === 0) {
      // Demo: allow login without registration
      showAlert('Connexion réussie ! Bienvenue sur GESTIAI');
      setTimeout(() => showPage('accueil'), 1000);
    } else {
      showAlert('Identifiants incorrects. Vérifiez vos informations.', true);
    }
  }

  function handleInscription() {
    const matricule = document.getElementById('reg-matricule').value.trim();
    const nom = document.getElementById('reg-nom').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();

    if (!matricule || !nom || !email || !password || !phone) {
      showAlert('Veuillez remplir tous les champs.', true);
      return;
    }

    const exists = users.find(u => u.matricule === matricule || u.email === email);
    if (exists) {
      showAlert('Un compte avec ce matricule ou cet email existe déjà.', true);
      return;
    }

    users.push({ matricule, nom, email, password, phone });
    showAlert('Inscription réussie ! Vous pouvez vous connecter.');
    setTimeout(() => showPage('connexion'), 1500);

    // Clear fields
    ['reg-matricule','reg-nom','reg-email','reg-password','reg-phone'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }

  // Keyboard Enter support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const active = document.querySelector('.page.active');
      if (active.id === 'page-connexion') handleConnexion();
      if (active.id === 'page-inscription') handleInscription();
    }
  });
  