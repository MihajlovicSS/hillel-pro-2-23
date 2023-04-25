class ContactList{
    #contactList = []

    fetchList() {
        return ContactAPI.getList()
        .then((data) => {
            this.#contactList = data
        })
    }  

    createListItem(contact) {
        return ContactAPI.create(contact)
        .then((contact) => {
            this.addContact(contact)
            return contact
        })
    }

    deleteListItem(id) {
        return ContactAPI.delete(id)
        .then(() => {
            this.deleteContact(id)
        })
    }

    updateListItem(id, newContact) {
        return ContactAPI.update(id, newContact)
        .then((newContact) => {
            this.editContact(id, newContact)
            return newContact
        })
    }

    findListItemByID(id) {
        return this.#contactList.find(contact => contact.id === id)
    }

    getContactList() {
        return this.#contactList
    }

    addContact(contact) {
        this.#contactList.push(contact)
    }

    deleteContact(id) {
        const idInList = this.#contactList.indexOf(this.findListItemByID(id))

        this.#contactList.splice(idInList, 1)
    }

    editContact(id, newContact) {
        const number = this.#contactList.indexOf(this.findListItemByID(id))
        
        this.#contactList.splice(number, 1, newContact)
    }
}