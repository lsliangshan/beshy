// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

function getFormData (formId) {
  var out = {}
  var form = document.querySelector('#' + formId)
  var allInputs = form.querySelectorAll('input')
  var allTextareas = form.querySelectorAll('textarea')
  var allSelects = form.querySelectorAll('select')
  Object.assign(out, dealWithInput(allInputs), dealWithInput(allTextareas), dealWithSelect(allSelects))
  return out
}
function dealWithInput (inputs) {
  var out = {}
  var objString = Object.prototype.toString
  for (var i = 0; i < inputs.length; i++) {
    var item = inputs[i]
    if (item.hasAttribute('name') && item.getAttribute('name') !== '') {
      var name = item.getAttribute('name')
      var cType = item.hasAttribute('type') ? item.getAttribute('type').toLowerCase() : 'text'

      if (!out.hasOwnProperty(name)) {
        if ((cType === 'checkbox' && item.checked) || (cType === 'radio' && item.checked) || (cType !== 'checkbox' && cType !== 'radio')) {
          out[name] = item.value
        }
      } else {
        if ((cType === 'checkbox' && item.checked) || (cType === 'radio' && item.checked) || (cType !== 'checkbox' && cType !== 'radio')) {
          if (objString.call(out[name]) === '[object String]') {
            out[name] = [out[name]]
          }
          out[name].push(item.value)
        }
      }
    }
  }
  return out
}
function dealWithSelect (selects) {
  var out = {}
  for (var i = 0; i < selects.length; i++) {
    var item = selects[i]
    if (item.hasAttribute('name') && item.getAttribute('name') !== '') {
      var name = item.getAttribute('name')
      if (!out.hasOwnProperty(name)) {
        if (!item.hasAttribute('multiple')) {
          // 单行
          out[name] = item.value
        } else {
          var opts = item.querySelectorAll('option')
          out[name] = []
          for (var j = 0; j < opts.length; j++) {
            if (opts[j].selected) {
              out[name].push(opts[j].value)
            }
          }
        }
      }
    }
  }
  return out
}
function formatParams (data) {
  var arr = []
  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }
  }
  arr.push(('v=' + Math.random()).replace('.', ''))
  return arr.join('&')
}
function ajax (opts) {
  opts = opts || {}
  opts.method = (opts.method || 'GET').toUpperCase()
  opts.dataType = opts.dataType || 'json'
  var params = formatParams(opts.data)

  var xhr
  if (window.XMLHttpRequest) {
    // 创建 非IE6
    xhr = new window.XMLHttpRequest()
  } else {
    // 创建 IE6及其以下版本
    xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
  }

  // 连接http，发送数据
  if (opts.method === 'GET') {
    xhr.open('GET', opts.url + '?' + params, true)
    xhr.send(null)
  } else if (opts.method === 'POST') {
    xhr.open('POST', opts.url, true)
    // 设置表单提交时的内容类型
    xhr.setRequestHeader('Content-Type', 'application/x-ww-form-urlencoded')
    xhr.send(params)
  }

  // 接收返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var status = xhr.status
      if (status >= 200 && status < 300) {
        opts.success && opts.success(xhr.responseText, xhr.responseXML)
      } else {
        opts.fail && opts.fail(status)
      }
    }
  }
}

// ajaxForm
Vue.directive('ajaxForm', {
  inserted: function (el, binding, vnode) {
    const selfElem = el
    const $attrs = vnode.data.attrs
    var dataAction = $attrs.hasOwnProperty('data-action') && $attrs['data-action'] || ''
    var dataMethod = $attrs.hasOwnProperty('data-method') && $attrs['data-method'] || 'post'
    var dataConfirm = $attrs.hasOwnProperty('data-confirm') && $attrs['data-confirm'] || '确认操作?'
    var callback = $attrs.hasOwnProperty('data-callback') && $attrs['data-callback'] || ''
    var before = $attrs.hasOwnProperty('data-before') && $attrs['data-before'] || ''
    var formId = $attrs.hasOwnProperty('data-target-id') && $attrs['data-target-id'] || ''

    if (dataAction === '') {
      console.warn('缺少data-action属性')
    } else if (formId === '') {
      console.warn('请指定待提交的表单id')
    } else {
      selfElem.addEventListener('click', function () {
        var _confirm = true
        if (dataConfirm !== '确认操作?') {
          _confirm = window.confirm(dataConfirm)
        }

        var ready = false
        // var argsBefore = []
        if (before !== '') {
          ready = before()
        } else {
          ready = true
        }
        // if (before !== '') {
        //   if (before.indexOf('(') > -1) {
        //     argsBefore = before.substring(before.indexOf('(') + 1, before.indexOf(')')).split(',')
        //     before = before.substring(0, before.indexOf('('))
        //     ready = window[before].call(this, argsBefore)
        //   } else {
        //     ready = window[before].call(this)
        //   }
        // }

        if (_confirm && ready) {
          var _data = getFormData(formId)
          ajax({
            url: dataAction,
            method: dataMethod,
            data: _data,
            success: function (res) {
              var args = []
              if (callback !== '') {
                if (callback.indexOf('(') > -1) {
                  args = callback.substring(callback.indexOf('(') + 1, callback.indexOf(')')).split(',')
                  callback = callback.substring(0, callback.indexOf('('))
                  window[callback].call(this, res, args)
                } else {
                  window[callback].call(this, res)
                }
              }
            }
          })
        }
      }, false)
    }
  }
})

Vue.directive('getData', {
  inserted: function (el, binding, vnode) {
    const $attrs = vnode.data.attrs
    var dataAction = $attrs.hasOwnProperty('data-action') && $attrs['data-action'] || ''
    var dataMethod = $attrs.hasOwnProperty('data-method') && $attrs['data-method'] || 'get'
    var callback = $attrs.hasOwnProperty('data-callback') && $attrs['data-callback'] || ''

    if (dataAction === '') {
      console.warn('缺少data-action属性')
    } else {
      ajax({
        url: dataAction,
        method: dataMethod,
        data: {},
        success: function (res) {
          callback && callback(res)
        }
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
