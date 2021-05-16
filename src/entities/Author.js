import BaseEntity from './BaseEntity'

class Account extends BaseEntity {
    static type = 'account'

    get full_name() {
        return this.first_name + ' ' + this.last_name
    }
}

Object.defineProperty(BaseEntity.subClasses, Account.type, {
    value: Account,
})

export default Account
