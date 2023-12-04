import { useState } from 'react'
import ClientService from './services/ClientService';
import './App.css'

function App() {

  const [input, setInput] = useState('');

  const [contribuyente, setContribuyente] = useState (null);

  const [puntos, setPuntos] = useState (null);

  const esContribuyente = cedula => {
    ClientService.esContribuyente(cedula).then(response => {
        console.log(response.data);
        setContribuyente(response.data)
    }).catch(error => {
        console.log(error);
    });
  }

  const puntosLicencia = cedula => {
    ClientService.puntosLicencia(cedula).then(response => {
        console.log(response.data);
        setPuntos(response.data)
    }).catch(error => {
        console.log(error);
    });
  }

  const manejarCambio = e => {
    setInput(e.target.value);
  }

  const manejarEnvio = e => {
    e.preventDefault();
    esContribuyente(input);
    puntosLicencia(input)
  }

  return (
    <>
      <div className='main_container'>
        <form onSubmit={ manejarEnvio } className='sri_form'>
          <input type="number" className='cedula_input' onInput={ manejarCambio }/>
          <button className='enviar_button' type='submit'>Enviar</button>
          { contribuyente ? <span>Es Contribuyente</span> : <span>No es Contribuyente</span> }
          { puntos ? <span>{"Puntos : "+ puntos}</span> : <span>No tiene licencia</span> }
        </form>
      </div>
    </>
  )
}

export default App
