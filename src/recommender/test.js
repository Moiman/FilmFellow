fetch('http://127.0.0.1:5000/recommender/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ratings: {118: 4.0, 564: 2.5, 49521: 5.0, 12159: 3.0}, favourites: [121, 122, 564]})
})
.then(response => response.json())
.then(result => {
    console.log('Result from Python:', result);
})
.catch(error => {
    console.error('Error:', error);
});