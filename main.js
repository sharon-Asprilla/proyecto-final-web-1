const boton = document.getElementById('resultado');

fetch('http://predictbgl.com/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
    })
    
    .catch(error => console.error('Error:', error));

    

