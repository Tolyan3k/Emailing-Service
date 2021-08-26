class MessageTemplate {
  notExistingField(fieldName) {
    return `Не задано поле ${typeFieldName(fieldName)}`
  }

  emptyField(fieldName) {
    return `Поле ${typeFieldName(fieldName)}не должно быть пустым`
  }

  notStringField(fieldName) {
    return `Поле ${typeFieldName(fieldName)}должно быть текстовым`
  }

  notArrayField(fieldName) {
    return `Поле ${typeFieldName(fieldName)}должно быть массивом`
  }

  notEmailField(fieldName) {
    return `Текст в поле ${typeFieldName(fieldName)}не является электронной почтой`
  }

  notOneOf(fieldNames) {
    return ('Ни один следующих полей не содержится в теле запроса: ' + fieldNames.join(', '))
  }
}

function typeFieldName(fieldName = '') {
  if (fieldName !== '') {
    return `'${fieldName}'` + ' '
  } else {
    return `${fieldName}`
  }
}

module.exports = new MessageTemplate()