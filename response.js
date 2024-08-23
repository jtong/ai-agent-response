// response.js
class Response {
    constructor(message) {
        this.message = message;
        this.stream = null;
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
}

module.exports = Response;