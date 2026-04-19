// availableTask.js
const Task = require('./task');

class AvailableTask {
    constructor(name, task, control = null, options = null) {
        this.name = name;
        this.task = task;
        this.control = control; // 'select' 表示需要用户选择子选项
        this.options = options; // 子选项列表 [{ label, value }]
    }

    getName() {
        return this.name;
    }

    getTask() {
        return this.task;
    }

    getControl() {
        return this.control;
    }

    getOptions() {
        return this.options;
    }
}

module.exports = AvailableTask;