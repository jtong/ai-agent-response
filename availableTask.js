// availableTask.js
const Task = require('./task');

class AvailableTask {
    constructor(name, task) {
        this.name = name;
        this.task = task;
    }

    getName() {
        return this.name;
    }

    getTask() {
        return this.task;
    }
}

module.exports = AvailableTask;