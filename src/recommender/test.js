fetch('http://127.0.0.1:5000/recommender/movie/existing', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({input: 121})
})
.then(response => response.json())
.then(result => {
    console.log('Result from Python:', result);
})
.catch(error => {
    console.error('Error:', error);
});