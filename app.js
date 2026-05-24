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

