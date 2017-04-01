import AppConfig from './../config';

export default class UserApi {

    static getList(page) {
        return fetch(AppConfig.API_URL + '/users?page='+page, {
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
        return fetch(AppConfig.API_URL + '/users', {
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
        return fetch(AppConfig.API_URL + '/users/'+id, {
            method: 'DELETE',
            mode: 'cors',
        });
    }

    static update(id, data) {
        return fetch(AppConfig.API_URL + '/users/'+id, {
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
