export default class UserApi {
    static getList(page) {
        return fetch('http://localhost:8201/api/v1/users?page='+page, {
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
        return fetch('http://localhost:8201/api/v1/users', {
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
        return fetch('http://localhost:8201/api/v1/users/'+id, {
            method: 'DELETE',
            mode: 'cors',
        }).then((response) => {
            return response
        });
    }

    static update(id, data) {
        return fetch('http://localhost:8201/api/v1/users/'+id, {
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