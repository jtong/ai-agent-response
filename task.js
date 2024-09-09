/**
 * Represents a task to be handled by an agent.
 * @class
 */
class Task {
    static TYPE_MESSAGE = 'message';
    static TYPE_ACTION = 'action';
  
    /**
     * @param {Object} options - The task options.
     * @param {string} options.name - The name of the task.
     * @param {string} options.type - The type of the task (e.g., Task.TYPE_MESSAGE, Task.TYPE_ACTION).
     * @param {string} options.message - The message content of the task.
     * @param {Object} [options.meta] - Additional metadata for the task.
     * @param {Object} [options.host_utils] - Utility functions provided by the host environment.
     */
    constructor(options) {
      this.name = options.name;
      this.type = options.type;
      this.message = options.message;
      this.meta = options.meta || {};
      this.host_utils = options.host_utils || {};
    }
  
    isMessageTask() {
      return this.type === Task.TYPE_MESSAGE;
    }
  }
  
  module.exports = Task;