changeContent("home");

function changeContent(section) {
    const backgroundText = document.getElementById("background-text");

    let filePath = '';
    switch (section) {
        case 'projects':
            filePath = './pages/projects.html';
            break;
        case 'socials':
            filePath = './pages/socials.html';
            break;
        case 'about':
            filePath = './pages/about.html';
            break;
        default:
            filePath = './pages/home.html';
            break;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('... error loading content');
            }
            return response.text();
        })
        .then(htmlContent => {
            backgroundText.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('... error loading content', error);
            backgroundText.innerHTML = '<p>... error loading content</p>';
        });
}
