const Validation = {
  validName: value => {
    const re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+[ ][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/
    return re.exec(value)
      ? undefined
      : 'enter a valid name + surname without special characters'
  },
  validCompany: value => {
    const out =
      value && value.length > 2
        ? undefined
        : 'at least 3 characters for a valid company name'
    return out
  },
  validRole: value => {
    const out =
      value && value.length > 2
        ? undefined
        : 'at least 3 characters for a valid role'
    return out
  },
  validBio: value => {
    const minLength = 100
    const counter = value ? minLength - value.length : minLength
    const diffMsg = counter > 0 ? `(${counter} to go)` : ''
    const msg = `at least 100 characters for a valid bio ${diffMsg}`
    return value && counter < 1 ? undefined : msg
  },
  validGithub: value => {
    const re = /https:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?/
    return re.exec(value)
      ? undefined
      : 'valid Github url: https://github.com/username'
  },
  validTwitter: value => {
    const re = /https:\/\/(www\.)?twitter\.com\/[A-z0-9_]+\/?/
    return re.exec(value)
      ? undefined
      : 'valid Twitter url: https://twitter.com/username'
  },
  validLinkedIn: value => {
    const re = /https:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/
    return re.exec(value)
      ? undefined
      : 'valid LinkedIn url: https://www.linkedin.com/in/username'
  },
  validEmail: value => {
    // found somewhere online
    // eslint-disable-next-line
    const re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/
    return re.exec(value) ? undefined : 'enter a valid email address'
  },
}

export default Validation
