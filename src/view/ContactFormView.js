class ContactForm{
    static ID_FORM = '#contactForm'

    constructor (root, options){
        this.createForm(root)
        this.options = options
        this.form = this.findForm()
        this.form.addEventListener('submit', this.onFormSubmit.bind(this))
    }

    createForm(root) {        
        root.insertAdjacentHTML('beforeend', `
            <form id="contactForm" class="main-form" action="" method="post">
                <input id="inputName" class="main-table__input" type="text" placeholder="Введите Имя"/>
                <input id="inputSurname" class="main-table__input" type="text" placeholder="Введите Фамилию"/>
                <input id="inputPhone" class="main-table__input" type="text" placeholder="Введите номер телефона"/>
                <input id="id" class="main-table__input" type="hidden"/>
                <button class="main-table__submit" id="submitButton">Добавить</button>
            </form>
        `)
    }

    onFormSubmit(e){
        e.preventDefault()  
          
        const contact = this.getData()
        this.clearForm()
        this.form.inputName.focus()
    
        if(!this.isDataValid(contact)){
            Controller.showError(new Error('Введенные данные не валидны!'))
            return
        }

        this.options.onSubmit(contact)    
    }

    getData(){
        return {
            id: this.form.id.value,
            name: this.form.inputName.value,
            surname: this.form.inputSurname.value,
            phone: this.form.inputPhone.value,
        }
    }

    fillForm(contact){
        this.form.inputName.value = contact.name
        this.form.inputSurname.value = contact.surname
        this.form.inputPhone.value = contact.phone
        this.form.id.value = contact.id
    }

    editContact(e){
        const target = e.target
        const id = findContactRow(target).dataset.id
        
        this.fillForm(contactList.findListItemByID(id))
    }

    findForm(){
        return document.querySelector(ContactForm.ID_FORM)
    }

    isDataValid(data){
        return this.isValidName(data.name) && this.isValidName(data.surname) && this.isNotEmpty(data.phone)
    }

    isNotEmpty(value){
        return value.trim()
    }

    isNumber(value){
        return !isNaN(value) && this.isNotEmpty(value)
    }

    isValidName(value){
        return this.isNotEmpty(value) && !this.isNumber(value)
    }

    clearForm(){
        this.form.reset()
    }
}