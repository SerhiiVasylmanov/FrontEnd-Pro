class StudentApi {
    static STUDENT_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students';

    static request(uri, method, data) {
        return fetch(`${this.STUDENT_URL}${uri}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static getList() {
        return this.request('', 'GET')
            .then(res => res.json())

    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
            .then(res => res.json())
    }

    static create(data) {
        return this.request('', 'POST', { ...data })
            .then(res => res.json())
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', { ...data })
            .then(res => res.json())
    }
}
