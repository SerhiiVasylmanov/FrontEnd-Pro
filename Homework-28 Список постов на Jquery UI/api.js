class PostApi {
    static TOKEN = '545341e08105d81ab9c85664b9961797a1cb39030166db3d7ee4f25a1685582a';
    static URL = 'https://gorest.co.in/public/v1/posts';
    static USER_ID = 342;

    static request(uri = '', method = 'GET', data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.TOKEN}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    static getList() {
        return this.request(`?user_id=${this.USER_ID}`)
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static create(data) {
        return this.request('', 'POST', { ...data, user_id: this.USER_ID })
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', data)
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
    }
}
