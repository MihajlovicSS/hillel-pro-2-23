class ContactTable{
    static CLASS_DELETE_BTN = 'deleteBtn'
    static CLASS_EDIT_BTN = 'editBtn'
    static CLASS_CONTACT_ROW = '.main-table__tr'
    static ID_TABLE = '#table'

    constructor (root, options){
        this.createTable(root)
        this.table = this.findTable()
        this.options = options
        this.table.addEventListener('click', this.onTableClick.bind(this))
    }

    createTable() {
        root.insertAdjacentHTML('afterbegin', `
            <table id='table' class = "main-table">
                <caption class="main-table__caption">Contacts</caption>
                <tr>
                    <th class="main-table__th">Name</th>
                    <th class="main-table__th">Surname</th>
                    <th class="main-table__th">Phone</th>
                    <th class="main-table__th">Actions</th>
                </tr>            
            </table>
        `)
    }

    onTableClick(e){
        const target = e.target
        const contactRow = this.findContactRow(target)
        const id = contactRow.dataset.id  

        if(this.findEditButton(target)) 
            this.options.onEdit(id)
        else if(this.findDeleteButton(target)) 
            this.options.onDelete(id, contactRow)
    }

    renderList(list){
        const html = list.map(this.createTableRowWithNewData).join('')

        this.table.insertAdjacentHTML('beforeend', html)
    }

    renderListItem(contact){
        const html = this.createTableRowWithNewData(contact)

        this.table.insertAdjacentHTML('beforeend', html)
    }
    
    createTableRowWithNewData(data){
        return `
        <tr class='main-table__tr' data-id=${data.id}>
            <td class="main-table__td">
                <span>${data.name}</span>
            </td>
            <td class="main-table__td">
                <span>${data.surname}</span>
            </td>
            <td class="main-table__td">
                <span>${data.phone}</span>
            </td>
            <td>
                <button type="button" class="editBtn">Edit</button>
                <button type="button" class="deleteBtn">Delete</button>
            </td>
        </tr>
        `
    }

    findTable(){
        return document.querySelector(ContactTable.ID_TABLE)
    }

    findContactRow(element){
        return element.closest(ContactTable.CLASS_CONTACT_ROW)
    }

    replaceContactRow(id, contact){
        const oldContactRow = document.querySelector(`[data-id="${id}"]`)
        const newContactRow = this.createTableRowWithNewData(contact)

        oldContactRow.outerHTML = newContactRow
    }

    deleteRow(row){
        row.remove()
    }

    findDeleteButton(target){
        return target.classList.contains(ContactTable.CLASS_DELETE_BTN)
    }
    
    findEditButton(target){
        return target.classList.contains(ContactTable.CLASS_EDIT_BTN)
    }
}