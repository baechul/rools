class Logger {
  constructor({
    error = true, debug = false, delegate = null,
  } = { error: true, debug: false, delegate: null }) {
    this.error = error;
    this.debug = debug;
    this.delegate = delegate;
  }

  log({ type, ...others }) {
    if (type === 'error' && !this.error) return;
    if (type === 'debug' && !this.debug) return;
    if (this.delegate) {
      this.delegate({ type, ...others });
    } else {
      Logger.logDefault({ type, ...others });
    }
  }

  static logDefault({ message, rule, error }) {
    const msg = rule ? `# ${message} - "${rule}"` : `# ${message}`;
    if (error) {
      console.error(msg, error); // eslint-disable-line no-console
    } else {
      console.log(msg); // eslint-disable-line no-console
    }
  }
}

module.exports = Logger;
