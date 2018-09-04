import {
    observable,
    computed,
    action,
    // autorun,
} from 'mobx'

export default class AppState {
    @observable count = 1

    @observable name = 'nike'

    @computed get msg() {
        return `${this.name} say count is ${this.count}`
    }

    @action add() {
        this.count += 1
    }
}
