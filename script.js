changeContent('home');

window.addEventListener('load', function() {
    const hash = window.location.hash.slice(1);
    changeContent(hash || 'home');
});

window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    changeContent(hash);
});

function changeContent(section) {
    const backgroundContainer = document.getElementById("background-content");

    let filePath = '';
    switch (section) {
        case 'projects':
            filePath = './pages/projects.html';
            break;
        case 'cv':
            filePath = './pages/cv.html';
            break;
        case 'about':
            filePath = './pages/about.html';
            break;
        case 'home':
            filePath = './pages/home.html';
            break;
        default:
            filePath = 'ERROR404';
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
            backgroundContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('... error loading content', error);
        
            backgroundContainer.innerHTML = '';
        
            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            
            const backgroundText = document.createElement('div');
            backgroundText.innerHTML = '<p>... 404 page not found!</p>';
        
            const errorImage = document.createElement('img');
            errorImage.src = './images/error.png';
            errorImage.alt = 'Error Image';
            errorImage.classList.add('error-image');
        
            errorContainer.appendChild(backgroundText);
            errorContainer.appendChild(errorImage);
        
            backgroundContainer.appendChild(errorContainer);
        });
}
