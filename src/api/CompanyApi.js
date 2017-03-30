export default class CompanyApi {
    static getList() {
        return [{
            id: 1,
            name : 'test',
            quota: 'test2',
        },{
            id: 2,
            name : 'test',
            quota: 'test2',
        },{
            id: 3,
            name : 'test',
            quota: 'test2',
        },{
            id: 4,
            name : 'test',
            quota: 'test2',
        }];
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