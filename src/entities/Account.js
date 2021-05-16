import BaseEntity from './BaseEntity'

class Author extends BaseEntity {
    static type = 'author'

    get full_name() {
        return this.first_name + ' ' + this.last_name
    }
}

Object.defineProperty(BaseEntity.subClasses, Author.type, {
    value: Author,
})

export default Author
