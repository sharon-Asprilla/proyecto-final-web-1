// Lógica para pedir una pregunta aleatoria y mostrar estado de carga
const API_URL = 'https://jservice.io/api/random'; // puedes cambiar esta URL si tienes otra API

const btnResultado = document.getElementById('resultado');
const pPregunta = document.querySelector('.pregunta');
const pRespuesta = document.querySelector('.respuesta');
const btnMostrar = document.getElementById('mostrar-respuesta');

function setLoading(isLoading){
  if(isLoading){
    btnResultado.classList.add('loading');
    btnResultado.disabled = true;
    btnResultado.textContent = 'Cargando...';
    // ocultar respuesta previa
    pRespuesta.classList.add('hidden');
    btnMostrar.classList.add('hidden');
  } else {
    btnResultado.classList.remove('loading');
    btnResultado.disabled = false;
    btnResultado.textContent = 'Pedir pregunta';
  }
}

async function fetchQuestion(){
  setLoading(true);
  try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error('Código HTTP ' + res.status);
    const data = await res.json();
    // jservice devuelve un array con un objeto
    const item = Array.isArray(data) ? data[0] : data;
    const q = item && (item.question || item.title || item.text) ? (item.question || item.title || item.text) : 'Sin pregunta recibida';
    const a = item && item.answer ? item.answer : 'Sin respuesta disponible';

    pPregunta.textContent = q;
    // Guardamos respuesta pero no la mostramos hasta que el usuario lo pida
    pRespuesta.textContent = a;
    pRespuesta.classList.add('hidden');
    btnMostrar.classList.remove('hidden');
    // asegurar que el botón de mostrar respuesta solo muestre una vez
    btnMostrar.onclick = () => {
      pRespuesta.classList.remove('hidden');
      btnMostrar.classList.add('hidden');
    };

  } catch(err){
    console.error('Error al pedir la pregunta:', err);
    pPregunta.textContent = 'Error al obtener datos: ' + err.message;
    pRespuesta.textContent = '';
    pRespuesta.classList.add('hidden');
    btnMostrar.classList.add('hidden');
  } finally{
    setLoading(false);
  }
}

// Inicializar estado
setLoading(false);
btnResultado.addEventListener('click', fetchQuestion);

// Si quieres, pide una al cargar la página automáticamente
// fetchQuestion();
