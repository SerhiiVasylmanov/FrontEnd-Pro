class Collection {
    #list = [];

    fetch() {
        return StudentApi.getList()
            .then((data) => this.setList(data));
    }

    setList(data) {
        this.#list = data;
    }

    getList() {
        return this.#list;
    }

    get(id) {
        return this.#list.find((item) => item.id == id);
    }

    delete(id) {
        this.#list = this.#list.filter((item) => item.id !== id);

        StudentApi.delete(id);

        return Promise.resolve();
    }

    update(student) {
        const newStudent = {
            marks: this.getMarks(student)
        }
        const id = student.dataset.id

        StudentApi.update(id, newStudent)

        return Promise.resolve();
    }

    add(name) {
        const item = {
            name,
            marks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }

        return StudentApi.create(item)
            .then((res) => {
                this.#list.push(res);

                return res;
            })
    }

    getMarks(student) {
        const marks = [];

        student = (Object.values(student.querySelectorAll('input')))
        student.map((el) => marks.push(el.value))

        return marks;
    }
}
