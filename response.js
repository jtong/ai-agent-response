// response.js

const Task = require('./task');
const AvailableTask = require('./availableTask');
class Response {
    constructor(message) {
        this.message = message;
        this.stream = null;
        this._isHtml = false;
        this.availableTasks = [];
        this.updateLastMessage = false;
        this.nextTasks = [];
        this.isVirtual = false;
        this.meta = {}
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

    addNextTask(task) {
        this.nextTasks.push(task);
    }

    getNextTasks() {
        return this.nextTasks;
    }

    hasNextTasks() {
        return this.nextTasks.length > 0;
    }

    setMeta(meta) {
        this.meta = { ...this.meta, ...meta };
    }
    
    getMeta() {
        return this.meta;
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

        if (config.nextTasks && Array.isArray(config.nextTasks)) {
            config.nextTasks.forEach(taskConfig => {
                response.addNextTask(new Task(taskConfig));
            });
        }

        return response;
    }
}

module.exports = Response;