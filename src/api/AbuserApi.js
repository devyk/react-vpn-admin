export default class AbuserApi {
    static generate() {
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

    static report(date) {
        return fetch('http://localhost:8201/api/v1/companies/report/' + date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        });
    }
}