import {
    observable,
    computed,
    action,
    autorun,
} from 'mobx'

class AppState {
    @observable count = 1

    @observable name = 'nike'

    @computed get msg() {
        return `${this.name} say count is ${this.count}`
    }

    @action add() {
        this.count += 1
    }
}

const appState = new AppState()

setInterval(() => {
    appState.add()
}, 1000)

autorun(() => {
    console.log(`count is ${appState.count}`)
})

export default appState
