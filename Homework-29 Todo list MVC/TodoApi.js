class TodoAPI {
    static TOKEN = '545341e08105d81ab9c85664b9961797a1cb39030166db3d7ee4f25a1685582a';
    static URL = 'https://gorest.co.in/public/v1/todos';
    static USER_ID = 111;
    static HEADERS = {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.TOKEN}`,
    };

    static request(uri, method, data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.TOKEN}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static getList() {
        return this.request(`?user_id=${this.USER_ID}`, 'GET')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error('Can not fetch todo list from API');
            })
            .then((data) => data.data);
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
            .then((res) => {
                if (!res.ok || res.status !== 204) {
                    throw new Error('Can not execute delete todo request on API');
                }
            });
    }

    static create(data) {
        return this.request('', 'POST', { ...data, user_id: this.USER_ID })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error('Can not create todo on API: ' + JSON.stringify(data.data, null, 4))
                })
            });
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', { ...data, user_id: this.USER_ID })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error('Can not create todo on API: ' + JSON.stringify(data.data, null, 4))
                })
            });
    }
}
