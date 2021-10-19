"use strict";

class DataApi {
    static URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers";
    static HEADERS = {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
    };

    static request(uri, method, data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static get() {
        return this.request('').then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}. Can't get stickers from server!`);
        });
    }

    static create(description, id) {
        return this.request('', 'POST', (description))
            .then((res) => {
                if (res.ok || res.status == 201) {
                    return res.json();
                }
                throw new Error(`${res.status}. Can't create sticker on server!`);
            });
    }

    static update(sticker, id) {
        return this.request(`/${sticker.id}`, 'PUT', (sticker))
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}. Can't update this sticker on server!`);
            });
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
            .then((res) => {
                if (res.ok || res.status == 204) {
                    return res.json();
                }
                throw new Error(`${res.status}. Can't delete this sticker from server!`);
            });
    }
}
