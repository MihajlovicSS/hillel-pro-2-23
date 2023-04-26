class ContactAPI{static API="https://6425946c9e0a30d92b361db3.mockapi.io/API/todoAPI/";static getList(){return ContactAPI.request("GET","")}static create(t){return ContactAPI.request("POST","",t)}static update(t,e){return ContactAPI.request("PUT",t,e)}static delete(t){return ContactAPI.request("DELETE",t)}static request(e,t,a){return fetch(ContactAPI.API+t,{method:e,body:a?JSON.stringify(a):void 0,headers:{"Content-type":"application/json"}}).then(t=>{if(t.ok)return t.json();switch(e){case"POST":throw new Error("Can't create contact on server!");case"PUT":throw new Error("Can't update contact on server!");case"DELETE":throw new Error("Can't delete contact from server!");case"GET":throw new Error("Can't load data from server!")}})}}class ContactList{#contactList=[];fetchList(){return ContactAPI.getList().then(t=>{this.#contactList=t})}createListItem(t){return ContactAPI.create(t).then(t=>(this.addContact(t),t))}deleteListItem(t){return ContactAPI.delete(t).then(()=>{this.deleteContact(t)})}updateListItem(e,t){return ContactAPI.update(e,t).then(t=>(this.editContact(e,t),t))}findListItemByID(e){return this.#contactList.find(t=>t.id===e)}getContactList(){return this.#contactList}addContact(t){this.#contactList.push(t)}deleteContact(t){t=this.#contactList.indexOf(this.findListItemByID(t));this.#contactList.splice(t,1)}editContact(t,e){t=this.#contactList.indexOf(this.findListItemByID(t));this.#contactList.splice(t,1,e)}}class ContactForm{static ID_FORM="#contactForm";constructor(t,e){this.createForm(t),this.options=e,this.form=this.findForm(),this.form.addEventListener("submit",this.onFormSubmit.bind(this))}createForm(t){t.insertAdjacentHTML("beforeend",`
            <form id="contactForm" class="main-form" action="" method="post">
                <input id="inputName" class="main-table__input" type="text" placeholder="Введите Имя"/>
                <input id="inputSurname" class="main-table__input" type="text" placeholder="Введите Фамилию"/>
                <input id="inputPhone" class="main-table__input" type="text" placeholder="Введите номер телефона"/>
                <input id="id" class="main-table__input" type="hidden"/>
                <button class="main-table__submit" id="submitButton">Добавить</button>
            </form>
        `)}onFormSubmit(t){t.preventDefault();t=this.getData();this.clearForm(),this.form.inputName.focus(),this.isDataValid(t)?this.options.onSubmit(t):Controller.showError(new Error("Введенные данные не валидны!"))}getData(){return{id:this.form.id.value,name:this.form.inputName.value,surname:this.form.inputSurname.value,phone:this.form.inputPhone.value}}fillForm(t){this.form.inputName.value=t.name,this.form.inputSurname.value=t.surname,this.form.inputPhone.value=t.phone,this.form.id.value=t.id}editContact(t){t=t.target,t=findContactRow(t).dataset.id;this.fillForm(contactList.findListItemByID(t))}findForm(){return document.querySelector(ContactForm.ID_FORM)}isDataValid(t){return this.isValidName(t.name)&&this.isValidName(t.surname)&&this.isNotEmpty(t.phone)}isNotEmpty(t){return t.trim()}isNumber(t){return!isNaN(t)&&this.isNotEmpty(t)}isValidName(t){return this.isNotEmpty(t)&&!this.isNumber(t)}clearForm(){this.form.reset(),this.form.id.value=""}}class ContactTable{static CLASS_DELETE_BTN="deleteBtn";static CLASS_EDIT_BTN="editBtn";static CLASS_CONTACT_ROW=".main-table__tr";static ID_TABLE="#table";constructor(t,e){this.createTable(t),this.table=this.findTable(),this.options=e,this.table.addEventListener("click",this.onTableClick.bind(this))}createTable(){root.insertAdjacentHTML("afterbegin",`
            <table id='table' class = "main-table">
                <caption class="main-table__caption">Contacts</caption>
                <tr>
                    <th class="main-table__th">Name</th>
                    <th class="main-table__th">Surname</th>
                    <th class="main-table__th">Phone</th>
                    <th class="main-table__th">Actions</th>
                </tr>            
            </table>
        `)}onTableClick(t){var t=t.target,e=this.findContactRow(t),a=e.dataset.id;this.findEditButton(t)?this.options.onEdit(a):this.findDeleteButton(t)&&this.options.onDelete(a,e)}renderList(t){t=t.map(this.createTableRowWithNewData).join("");this.table.insertAdjacentHTML("beforeend",t)}renderListItem(t){t=this.createTableRowWithNewData(t);this.table.insertAdjacentHTML("beforeend",t)}createTableRowWithNewData(t){return`
        <tr class='main-table__tr' data-id=${t.id}>
            <td class="main-table__td">
                <span>${t.name}</span>
            </td>
            <td class="main-table__td">
                <span>${t.surname}</span>
            </td>
            <td class="main-table__td">
                <span>${t.phone}</span>
            </td>
            <td>
                <button type="button" class="editBtn">Edit</button>
                <button type="button" class="deleteBtn">Delete</button>
            </td>
        </tr>
        `}findTable(){return document.querySelector(ContactTable.ID_TABLE)}findContactRow(t){return t.closest(ContactTable.CLASS_CONTACT_ROW)}replaceContactRow(t,e){t=document.querySelector(`[data-id="${t}"]`),e=this.createTableRowWithNewData(e);t.outerHTML=e}deleteRow(t){t.remove()}findDeleteButton(t){return t.classList.contains(ContactTable.CLASS_DELETE_BTN)}findEditButton(t){return t.classList.contains(ContactTable.CLASS_EDIT_BTN)}}class Controller{static root=document.querySelector("#root");constructor(t){this.contactList=new ContactList,this.contactForm=new ContactForm(t,{onSubmit:this.save.bind(this)}),this.contactTable=new ContactTable(t,{onDelete:this.deleteContact.bind(this),onEdit:t=>{t=this.contactList.findListItemByID(t);this.contactForm.fillForm(t)}}),this.contactList.fetchList().then(()=>{this.contactTable.renderList(this.contactList.getContactList())})}save(t){t.id?this.updateContact(t.id,t):this.createContact(t)}createContact(t){this.contactList.createListItem(t).then(t=>{this.contactTable.renderListItem(t)}).catch(t=>{Controller.showError(t)})}updateContact(e,t){this.contactList.updateListItem(e,t).then(t=>{this.contactTable.replaceContactRow(e,t)}).catch(t=>{Controller.showError(t)})}deleteContact(t,e){this.contactList.deleteListItem(t).then(()=>{this.contactTable.deleteRow(e)}).catch(t=>{Controller.showError(t)})}static showError(t){alert(t.message)}}const root=document.querySelector("#root");new Controller(root);
//# sourceMappingURL=app.js.map
