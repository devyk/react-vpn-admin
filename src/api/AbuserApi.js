import AppConfig from './../config';

export default class AbuserApi {

    static generate() {
        return fetch(AppConfig.API_URL + '/companies/generate', {
            method: 'POST',
            mode: 'cors',
        });
    }

    static report(date) {
        return fetch(AppConfig.API_URL + '/companies/report/' + date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        });
    }
}
