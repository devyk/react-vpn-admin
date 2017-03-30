export default class UserApi {
    static getList(page) {
        return fetch('http://localhost:8201/api/v1/users?page='+page, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            console.log(response);
            console.log(response.headers.get('X-Pagination-Page-Count'));
            return response.json().then((data) => {
                return {
                    pages: +response.headers.get('X-Pagination-Page-Count'),
                    data: data
                }
            })
        }).then((data) => {
            console.log(data);
            return data;
        });
    }

    static create(data) {
        let formData = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        return fetch('http://localhost:8201/api/v1/users', {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            return data.id;
        });
    }

    static remove(id) {
        return fetch('http://localhost:8201/api/v1/users/'+id, {
            method: 'DELETE',
            mode: 'cors',
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            return data.id;
        });
    }

    static update(id) {

    }
}