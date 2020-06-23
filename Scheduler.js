// 并发调度器
class Scheduler {
    constructor () {
        this.runTask = [];
        this.waitTask = [];
    }
    add (promiseCreator) {
        return new Promise((resolve, reject) => {
            promiseCreator.resolve = resolve;
            if (this.runTask.length < 10) {
                this.startTask(promiseCreator);
            } else {
                this.waitTask.push(promiseCreator);
            }
        })
    }
    startTask (promiseCreator) {
        this.runTask.push(promiseCreator)
        promiseCreator().then(res => {
            promiseCreator.resolve()
            this.removeTaks(promiseCreator)
            if (this.waitTask.length > 0) {
                this.startTask(this.tasks.shift())
            }
        })
    }
    removeTaks(promiseCreator) {
        let index = this.runTask.findIndex(promiseCreator)
        this.runTask.splice(index, 1);
    }
}