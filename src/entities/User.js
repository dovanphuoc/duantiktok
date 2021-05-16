import BaseEntity from './BaseEntity'
import Author from './Author'

class User extends BaseEntity {
    static type = 'user'

    get author() {
        return Author.create(this.user)
    }
}

Object.defineProperty(BaseEntity.subClasses, User.type, {
    value: User,
})

export default User
