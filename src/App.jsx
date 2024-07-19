import { useState, useEffect } from 'react';
import ClientService from './services/ClientService';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Autosuggest from 'react-autosuggest';

function App() {
  const [input, setInput] = useState('');
  const [contribuyente, setContribuyente] = useState(null);
  const [puntos, setPuntos] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [cedulaSeleccionada, setCedulaSeleccionada] = useState('');

  useEffect(() => {
    getPer();
  }, []);

  const getPer = async () => {
    try {
      const response = await ClientService.getPersonas();
      setPersonas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const esContribuyente = async (cedula) => {
    try {
      const response = await ClientService.esContribuyente(cedula);
      setContribuyente(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const puntosLicencia = async (cedula) => {
    try {
      const response = await ClientService.puntosLicencia(cedula);
      setPuntos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const manejarCambio = (event, { newValue }) => {
    setInput(newValue);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (cedulaSeleccionada) {
      esContribuyente(cedulaSeleccionada);
      puntosLicencia(cedulaSeleccionada);
    } else {
      console.log("No se ha seleccionado ninguna persona.");
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    const inputFragments = inputValue.split(' ');

    return personas.filter(persona => {
      const nombreCompleto = `${persona.nombres.toLowerCase()} ${persona.apellidos.toLowerCase()}`;
      return inputFragments.every(fragment => nombreCompleto.includes(fragment));
    });
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nombres} ${suggestion.apellidos}`;
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.nombres} {suggestion.apellidos}
    </div>
  );

  const onSuggestionSelected = (event, { suggestion }) => {
    setCedulaSeleccionada(suggestion.cedula);
  };

  const inputProps = {
    placeholder: 'Busca una persona',
    value: input,
    onChange: manejarCambio
  };

  return (
    <div className='App container mt-5'>
      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
            theme={{
              container: 'autosuggest-container',
              input: 'form-control',
              suggestionsContainer: 'dropdown-menu show',
              suggestion: 'dropdown-item',
              suggestionHighlighted: 'active'
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      <div className="results">
        {contribuyente !== null && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Contribuyente</h5>
              <p className="card-text">
                {contribuyente ? 'Si contribuye' : 'No contribuye'}
              </p>
            </div>
          </div>
        )}
        {puntos && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Puntos de Licencia</h5>
              <pre className="card-text">{JSON.stringify(puntos, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
