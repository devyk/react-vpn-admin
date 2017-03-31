export default class CompanyApi {
    static getList(page) {
        let endpoint = 'http://localhost:8201/api/v1/companies';
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
        return fetch('http://localhost:8201/api/v1/companies', {
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
        return fetch('http://localhost:8201/api/v1/companies/'+id, {
            method: 'DELETE',
            mode: 'cors',
        }).then((response) => {
            return response
        });
    }

    static update(id, data) {
        return fetch('http://localhost:8201/api/v1/companies/'+id, {
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