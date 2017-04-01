import AppConfig from './../config';

export default class CompanyApi {

    static getList(page) {
        let endpoint = AppConfig.API_URL + '/companies';
        if (page) {
            endpoint += '?page='+page;
        }

        return fetch(endpoint, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            return response.json().then((data) => {
                return {
                    pages: +response.headers.get('X-Pagination-Page-Count'),
                    data: data
                }
            })
        });
    }

    static create(data) {
        return fetch(AppConfig.API_URL + '/companies', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        });
    }

    static remove(id) {
        return fetch(AppConfig.API_URL + '/companies/'+id, {
            method: 'DELETE',
            mode: 'cors',
        });
    }

    static update(id, data) {
        return fetch(AppConfig.API_URL + '/companies/'+id, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        });
    }
}
