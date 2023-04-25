class Controller{
    static root = document.querySelector('#root')

    constructor(root){
        this.contactList = new ContactList()
        this.contactForm = new ContactForm(root, { onSubmit: this.save.bind(this)})
        this.contactTable = new ContactTable(root, {
            onDelete: this.deleteContact.bind(this),
            onEdit: (id) => {
                const contact = this.contactList.findListItemByID(id)

                this.contactForm.fillForm(contact)
            }
        })
        this.contactList.fetchList().then(() => {
            this.contactTable.renderList(this.contactList.getContactList())
        })

    }

    save(contact){
        if(contact.id)
            this.updateContact(contact.id, contact)
        else 
            this.createContact(contact)
    }

    createContact(contact){
        this.contactList.createListItem(contact)
            .then((contact) => {
                this.contactTable.renderListItem(contact)
            })
            .catch((error) => {
                Controller.showError(error)
            })
    }

    updateContact(id, newContact){
        this.contactList.updateListItem(id, newContact)
            .then((newContact) => {
                this.contactTable.replaceContactRow(id, newContact)
            })
            .catch((error) => {
                Controller.showError(error)
            })
    }

    deleteContact(id, contactRow){
        this.contactList.deleteListItem(id)
            .then(() => {
                this.contactTable.deleteRow(contactRow)
            })
            .catch((error) => {
                Controller.showError(error)
            })
    }

    static showError(error){
        alert(error.message)
    }
}