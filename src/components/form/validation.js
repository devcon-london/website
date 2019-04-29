const Validation = {
  validName: (value) => {
    const re = /[\w]+[ ][\w]+/;
    return re.exec(value) ? undefined : 'enter a valid name + surname without special characters';
  },
  validCompany: value => (value && value.length > 2 ? undefined : 'at least 3 characters for a valid company name'),
  validRole: value => (value && value.length > 2 ? undefined : 'at least 3 characters for a valid role'),
  validBio: (value) => {
    const minLength = 100;
    const counter = value ? minLength - value.length : minLength;
    const diffMsg = counter > 0 ? `(${counter} to go)` : '';
    const msg = `at least 100 characters for a valid bio ${diffMsg}`;
    return value && counter < 1 ? undefined : msg;
  },
  validGithub: (value) => {
    const re = /https:\/\/github\.com\/[A-z0-9_-]+\//;
    return re.exec(value) ? undefined : 'valid Github url: https://github.com/username/';
  },
  validTwitter: (value) => {
    const re = /https:\/\/twitter\.com\/[A-z0-9_]+\//;
    return re.exec(value) ? undefined : 'valid Twitter url: https://twitter.com/username/';
  },
  validLinkedIn: (value) => {
    const re = /https:\/\/www\.linkedin\.com\/in\/[A-z0-9_-]+\//;
    return re.exec(value) ? undefined : 'valid LinkedIn url: https://www.linkedin.com/in/username/';
  },
  validEmail: (value) => {
    // found somewhere online
    const re = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return re.exec(value) ? undefined : 'enter a valid email address';
  },
};

export default Validation;
