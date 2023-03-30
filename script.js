document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn').addEventListener('click', submit)
  revolver()
})
const fields = [
  'first_name',
  'second_name',
  'email',
  'password',
  'password_repeate',
  'data',
]
function revolver() {
  Object.entries(fields).forEach(element => {
    document.getElementById(element[1]).addEventListener('keyup', event => {
      takeValue(element[1])
    })
  })
}
function submit() {
  let done = true
  Object.entries(fields).forEach(element => {
    const validate = takeValue(element[1])
    done = done && validate
  })
  if (done) {
    if (
      document.getElementById('password').value ==
      document.getElementById('password_repeate').value
    ) {
      document.getElementById('password_repeate_error').style.color = '#e1e1e1'
      document.getElementById('btn').textContent = 'Успешная регистрация'
    } else {
      document.getElementById('password_repeate_error').textContent =
        'пароли не совпадают'
      document.getElementById('password_repeate_error').style.color = '#f80000'
    }
  }
}

function takeValue(str) {
  const value = document.getElementById(str).value
  const strError = str + '_error'
  const check_value = validation(value, str)
  const error_mess = document.getElementById(strError)
  if (check_value) {
    error_mess.textContent = check_value
    error_mess.style.color = '#f80000'
  } else {
    error_mess.textContent = 'Нет ошибок'
    error_mess.style.color = '#e1e1e1'
  }
  return !check_value
}

function validation(str, rule) {
  let checkDone = null
  if (rule == 'first_name' || rule == 'second_name') {
    if (str == '') {
      checkDone = 'представтесь'
    } else if (!str.match(/^[A-ZА-Я]/g)) {
      checkDone = 'С заглавной'
    } else if (str.length < 3) {
      checkDone = 'от 3 символов'
    } else if (str.match(/\d+/g)) {
      checkDone = 'без цифр'
    } else if (str.match(/\s/g)) {
      checkDone = 'без пробела'
    } else if (!str.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g)) {
      checkDone = 'специальные символы не допускаются'
    } else if (str.length > 15) {
      checkDone = 'не более 15 символов'
    }
  }
  if (rule == 'email') {
    if (str == '') {
      checkDone = 'заполните почту'
    } else if (str.match(/\s/g)) {
      checkDone = 'без пробела'
    } else if (!str.match(/^[a-zA-Z0-9-_]/g)) {
      checkDone = 'только латинские'
    } else if (!str.match(/^[a-zA-Z0-9-_@.]{0,}$/g)) {
      checkDone = 'специальные символы не допускаются'
    } else if (!str.match(/[@]/g)) {
      checkDone = 'не забудьте @'
    } else if (!str.match(/[.]/g)) {
      checkDone = 'нет точки в почте'
    } else if (str.match(/[.]/g) && !str.match(/\w+[.]\w+/g)) {
      checkDone = 'это не почта'
    }
  }
  if (rule == 'password' || rule == 'password_repeate') {
    if (str == '') {
      checkDone = 'заполните пароль'
    } else if (!str.match(/^[a-zA-Z0-9-_]/g)) {
      checkDone = 'только латинские'
    } else if (!str.match(/\d+/g)) {
      checkDone = 'хотя бы одну цифру'
    } else if (!str.match(/[A-ZА-Я]+/g)) {
      checkDone = 'хотя бы одну заглавную букву'
    } else if (!str.match(/[a-z]+/g)) {
      checkDone = 'хотя бы одну строчную букву'
    } else if (str.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g)) {
      checkDone = 'специальный символ'
    } else if (str.length < 8) {
      checkDone = 'от 8 до 15 символов'
    } else if (str.length >15) {
      checkDone = 'от 8 до 15 символов'
    }
  }
  if (rule == 'data') {
    if (str == '') {
      checkDone = 'заполните дату'
    } else {
      const now = new Date()
      const age = now.getFullYear() - 18
      let mm = now.getMonth() + 1
      let dd = now.getDate()
      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      const ageDate = age + '-' + mm + '-' + dd
      if (Date.parse(ageDate) < Date.parse(str)) {
        checkDone = 'с 18 лет'
      }
    }
  }
  return checkDone
}
