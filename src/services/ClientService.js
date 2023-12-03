import axios from "axios";

const CLIENT_ES_CONTRIBUYENTE_REST_API_URL = "http://localhost:8080/api/existePorNumeroRuc?numeroRuc=";

const CLIENT_PUNTOS_LICENCIA_REST_API_URL = "http://localhost:8081/api/prueba?ps_tipo_identificacion=CED&ps_identificacion=";

class ClientService {
    
    esContribuyente(cedula){
        return axios.get(CLIENT_ES_CONTRIBUYENTE_REST_API_URL + cedula + "001");
    }

    puntosLicencia(cedula){
        return axios.get(CLIENT_PUNTOS_LICENCIA_REST_API_URL + cedula);
    }

}

export default new ClientService();