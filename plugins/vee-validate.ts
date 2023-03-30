import Vue from 'vue'
// @ts-ignore
import { messages } from 'vee-validate/dist/locale/ru.json'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode
} from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
setInteractionMode('eager')

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...(rules as any)[rule],
    message: messages[rule]
  })
})
