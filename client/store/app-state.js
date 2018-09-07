import {
    observable,
    computed,
    action,
    // autorun,
} from 'mobx'

export default class AppState {
    constructor({ count, name } = { count: 1, name: 'nike' }) {
        this.count = count
        this.name = name
    }

    @observable count = 1

    @observable name = 'nike'

    @computed get msg() {
        return `${this.name} say count is ${this.count}`
    }

    @action add() {
        this.count += 1
    }

    toJson() {
        return {
            count: this.count,
            name: this.name,
        }
    }
}
