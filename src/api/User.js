export default class UserApi {
    static getList() {
        return [{
            id: 1,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 2,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 3,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 4,
            name : 'test',
            email: 'test2',
            company: 'test3'
        }];
    }

    static create(data) {
        let formData = new FormData();
        console.log(data);
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
            console.log(data);
            return data.id;
        });
    }

    static remove(id) {

    }

    static update(id) {

    }
}