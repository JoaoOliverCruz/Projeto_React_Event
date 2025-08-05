import axios from "axios";

const apiPorta = "5289";

const apilocal = `http://localhost:${apiPorta}/api/`;

const apiAzure = "https://apieventjoao-bee2cxdrgyb3bpb0.brazilsouth-01.azurewebsites.net/api/";

const api = axios.create({
    baseURL: apiAzure
});

export default api;