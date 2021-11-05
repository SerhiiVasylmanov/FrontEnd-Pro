class StudentApi{static STUDENT_URL="https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students";static request(t,e,s){return fetch(""+this.STUDENT_URL+t,{method:e,headers:{Accept:"application/json","Content-type":"application/json; charset=UTF-8"},body:s?JSON.stringify(s):void 0})}static getList(){return this.request("","GET").then(t=>t.json())}static delete(t){return this.request("/"+t,"DELETE").then(t=>t.json())}static create(t){return this.request("","POST",{...t}).then(t=>t.json())}static update(t,e){return this.request("/"+t,"PUT",{...e}).then(t=>t.json())}}
class Collection{#list=[];fetch(){return StudentApi.getList().then(t=>this.setList(t))}setList(t){this.#list=t}getList(){return this.#list}get(e){return this.#list.find(t=>t.id==e)}delete(e){return this.#list=this.#list.filter(t=>t.id!==e),StudentApi.delete(e),Promise.resolve()}update(t){var e={marks:this.getMarks(t)},t=t.dataset.id;return StudentApi.update(t,e),Promise.resolve()}add(t){return StudentApi.create({name:t,marks:[0,0,0,0,0,0,0,0,0,0]}).then(t=>(this.#list.push(t),t))}getMarks(t){const e=[];return(t=Object.values(t.querySelectorAll("input"))).map(t=>e.push(t.value)),e}}
const BTN_DELETE_SELECTOR=".delete",INPUT_SELECTOR=".input",STUDENTS_LIST_SELECTOR=".students_list",HEADER_SELECTOR=".header";class StudentsView{constructor(t){this._options=t,this._$el=this.initList(),this.list=[]}initList(){return $('<table class="students_list"></table>').on("focusout",INPUT_SELECTOR,this.onFoucsOutInput.bind(this)).on("click",BTN_DELETE_SELECTOR,this.onDeleteBtnClick.bind(this))}appendTo(t,e=this._$el){return t.append(e)}onFoucsOutInput(t){t.stopPropagation(),t.target.defaultValue=t.target.value;t=this.findStudent(t.target);this._options.update(t)}onDeleteBtnClick(t){t.stopPropagation();t=this.findStudentId(t.target);this._options.delete(t)}removeElement(t){this._$el.find(`[data-id="${t}"]`).remove()}findStudent(t){return t.closest(STUDENT_SELECTOR)}findStudentId(t){return this.findStudent(t).dataset.id}setList(t){this.list=t}renderStudents(t){t=t.map(t=>this.generateItem(t));this._$el.html(t)}renderStudent(t){this._$el.find(`[data-id="${t.id}"]`).replaceWith(t)}appendStudent(t){t=this.generateItem(t);this.appendTo($(STUDENTS_LIST_SELECTOR),t)}generateItem(t){if(t.marks)return`<tr class="student" data-id = ${t.id}>
                    <td class="name">${t.name}</td>
                    ${this.isArray(t.marks).map(t=>`<td>
                                    <input
                                    type="number"
                                    class="input"
                                    value="${t}">
                                </td>`)}
                    <td class="delete">X</td>
                </tr>`}isArray(t){return Array.isArray(t)?t:[0,0,0,0,0,0,0,0,0,0]}}
class NewStudentFormView{static FORM_BTN_SELECTOR="#addStudentBtn";static FORM_SELECTOR="#student-form";static FORM_INPUT_SELECTOR="#studentNameInput";static TRIGGER_SELECTOR="#add-form";constructor(t){this._options=t}addTrigger(){return $('<span id="add-form">+</span>').on("click",this.onTriggerClick.bind(this))}onTriggerClick(t){t.preventDefault();const e=t.target;this.replaceForm(e),e.style.display="none"}replaceForm(t){var e=this.makeNewStudentForm()[0];t.parentElement.append(e)}makeNewStudentForm(){return $(`
                <form id=student-form>
                    <input type="text" id="studentNameInput"/>
                    <button id="addStudentBtn">Add</button>
                </form>
                `).on("submit",this.onSubmitBtnClick.bind(this))}onSubmitBtnClick(t){t.preventDefault();var e=$(NewStudentFormView.FORM_INPUT_SELECTOR).val();this.isEmpty(e)?alert("Enter name student"):(this._options.submit(e),$(NewStudentFormView.FORM_SELECTOR)[0].reset(),this.removeForm(t))}removeForm(t){t.target.remove(),$(NewStudentFormView.TRIGGER_SELECTOR)[0].style.display=""}isEmpty(t){return!t}}
const STUDENT_SELECTOR=".student";class Controller{constructor(t){this.$container=t,this.studentsCollection=new Collection,this.studentsCollection.fetch().then(()=>this.renderList()),this.studentsListView=new StudentsView({delete:t=>this.deleteStudent(t),update:t=>this.updateStudent(t)}),this.newFormStudent=new NewStudentFormView({submit:t=>this.onSubmit(t)}),this.studentsListView.appendTo(this.$container)}deleteStudent(t){this.studentsCollection.delete(t).then(()=>this.studentsListView.removeElement(t))}updateStudent(t){this.studentsCollection.update(t).then(()=>this.studentsListView.renderStudent(t))}onSubmit(t){this.studentsCollection.add(t).then(t=>this.studentsListView.appendStudent(t))}renderList(){this.studentsListView.renderStudents(this.studentsCollection.getList()),this.newStudentForm=this.newFormStudent.addTrigger(),this.$container.after(this.newStudentForm[0])}}
"use strict";$(()=>new Controller($("#root")));
//# sourceMappingURL=app.js.map
