const containsUpperCase = (pw) => {
  let chars = pw.split('');
  return chars.some(char => {
    if (char < char.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  })
}

const containsNumber = (pw) => {
  let chars = pw.split('');
  return chars.some(char => {
    if (Number(char) || Number(char) === 0) {
      return true;
    } else {
      return false;
    }
  })
}

const containsSpecial = (pw) => {
  let special = false;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(pw);
}

module.exports = { containsUpperCase, containsNumber, containsSpecial };
