class ContactAPI{
    static API = 'https://6425946c9e0a30d92b361db3.mockapi.io/API/todoAPI/'

    static getList(){
        return ContactAPI.request('GET', '')
    }

    static create(contact) {
        return ContactAPI.request('POST', '', contact)
    }

    static update (id, changes) {
        return ContactAPI.request('PUT', id, changes)
    }
    
    static delete(id) {
        return ContactAPI.request('DELETE', id)
    }

    static request(method, url, body){
        return fetch(ContactAPI.API + url, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
              'Content-type': 'application/json',
            }
        })
        .then((response) => {
            if (response.ok) return response.json()
            switch (method) {
                case 'POST':
                    throw new Error("Can't create contact on server!")
                case 'PUT':
                    throw new Error("Can't update contact on server!")
                case 'DELETE':
                    throw new Error("Can't delete contact from server!")
                case 'GET':
                    throw new Error("Can't load data from server!")
            }
        })
    }
}