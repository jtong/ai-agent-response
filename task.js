/**
 * Represents a task to be handled by an agent.
 * @class
 */
class Task {
    static TYPE_MESSAGE = 'message';
    static TYPE_ACTION = 'action';
  
    /**
    * Creates a new Task instance.
    * @param {Object} params - The parameters for creating a task.
    * @param {string} params.name - The name of the task. 
    * @param {string} params.type - The type of the task. Should be either Task.TYPE_MESSAGE or Task.TYPE_ACTION.
    * @param {string} params.message - The message content of the task.
    * @param {Object} [params.meta={}] - Additional metadata for the task.
    * @param {Object|null} [params.host_utils=null] - Utility functions provided by the host environment.
    * @param {boolean} [params.skipUserMessage=false] - Flag to indicate whether to skip the user message.
    * @param {boolean} [params.skipBotMessage=false] - Flag to indicate whether to skip the bot message.
    */
    constructor({
        name,
        type,
        message,
        meta = {},
        host_utils = null,
        skipUserMessage = false,
        skipBotMessage = false
      }) {
        this.name = name;
        this.type = type;
        this.message = message;
        this.meta = meta;
        this.host_utils = host_utils;
        this.skipUserMessage = skipUserMessage;
        this.skipBotMessage = skipBotMessage;
      }
  
    isMessageTask() {
      return this.type === Task.TYPE_MESSAGE;
    }
  }
  
  module.exports = Task;