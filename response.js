// response.js

const Task = require('./task');
const AvailableTask = require('./availableTask');
class Response {
    constructor(message) {
        this.message = message;
        this.stream = null;
        this.taskList = null;
        this._isHtml = false;
        this.availableTasks = [];
        this.updateLastMessage = false;
        this.nextTask = null;
    }

    getFullMessage() {
        return this.message;
    }

    setStream(stream) {
        this.stream = stream;
    }

    isStream() {
        return this.stream != null;
    }

    async *getStream() {
        if (this.stream) {
            for await (const chunk of this.stream) {
                this.message += chunk;
                yield chunk;
            }
            this.isComplete = true;
        } else {
            yield this.message;
            this.isComplete = true;
        }
    }

    isStreamComplete() {
        return this.isComplete;
    }

    // 新增的计划响应相关方法
    setPlanTasks(taskList) {
        this.taskList = taskList;
    }

    isPlanResponse() {
        return this.taskList != null;
    }

    getTaskList() {
        return this.taskList;
    }

    addTask(task) {
        if (!this.taskList) {
            this.taskList = [];
        }
        this.taskList.push(task);
    }

    removeTask(taskId) {
        if (this.taskList) {
            this.taskList = this.taskList.filter(task => task.id !== taskId);
        }
    }

    updateTask(taskId, updates) {
        if (this.taskList) {
            const taskIndex = this.taskList.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                this.taskList[taskIndex] = { ...this.taskList[taskIndex], ...updates };
            }
        }
    }

    setAsHtml() {
        this._isHtml = true;
    }

    isHtml() {
        return this._isHtml;
    }
    
    addAvailableTask(availableTask) {
        this.availableTasks.push(availableTask);
    }

    getAvailableTasks() {
        return this.availableTasks;
    }

    hasAvailableTasks() {
        return this.availableTasks.length > 0;
    }

    setUpdateLastMessage(flag) {
        this.updateLastMessage = flag;
    }

    shouldUpdateLastMessage() {
        return this.updateLastMessage;
    }

    setNextTask(task) {
        this.nextTask = task;
    }

    getNextTask() {
        return this.nextTask;
    }

    hasNextTask() {
        return this.nextTask !== null;
    }

    static fromJSON(config) {
        const response = new Response(config.message || '');

        if (config.isHtml) {
            response.setAsHtml();
        }

        if (config.stream) {
            response.setStream(config.stream);
        }

        if (config.meta) {
            response.meta = config.meta;
        }

        if (config.updateLastMessage) {
            response.setUpdateLastMessage(config.updateLastMessage);
        }

        if (config.availableTasks && Array.isArray(config.availableTasks)) {
            config.availableTasks.forEach(taskConfig => {
                const task = new Task(taskConfig.task);
                const availableTask = new AvailableTask(taskConfig.name, task);
                response.addAvailableTask(availableTask);
            });
        }

        if (config.nextTask) {
            response.setNextTask(new Task(config.nextTask));
        }

        return response;
    }
}

module.exports = Response;