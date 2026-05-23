function showPage(pageid) {
    const allpages = ['home','register','login','catalog','dashboard','admin'];
    allpages.forEach(function(id) {
        document.getElementById(id).style.display = 'none';
    })
}