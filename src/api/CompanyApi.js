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
        let formData = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        fetch('http://localhost:8201/api/v1/users', {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.id;
        });
    }

    static remove(id) {

    }

    static update(id) {

    }
}