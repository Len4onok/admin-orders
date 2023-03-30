<template>
  <div
    class="base-input"
    :class="{ 'base-input_disabled': disabled }"
  >
    <label
      v-if="label"
      :for="label"
      class="base-input__label"
    >
      {{ label }}
    </label>
    <validation-provider
      v-slot="{ errors }"
      ref="provider"
      tag="div"
      class="base-field-text__provider"
      :name="name"
      :rules="rules"
      :vid="vid"
    >
      <div class="base-input__wrap">
        <input
          :id="name"
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :autocomplete="autocomplete"
          class="base-input__input"
          :class="{'base-input__input_error': errors.length || invalidMessage}"
          @input="input"
          @keydown.enter="input"
        >
      </div>
      <p class="base-input__error base-input__error_err">
        {{ errors[0] || invalidMessage }}
      </p>
    </validation-provider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'base-input',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: ''
    },
    invalidMessage: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  methods: {
    input (event: Event): void {
      const { value } = (event.target as HTMLInputElement)
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;

  &_disabled {
    pointer-events: none;
  }

  &__label {
    width: fit-content;
    margin-bottom: 6px;
    font-weight: 600;
  }

  &__input {
    height: 41px;
    width: 100%;
    border-radius: var(--borderRadius);
    padding: 9px 12px;
    background: var(--white);
    border: 1px solid var(--white);
    transition: var(--transition);

    &::placeholder {
      font-weight: 400;
    }

    &:disabled {
      background: var(--grey);
      border: 1px solid var(--grey);
    }

    &:focus {
      box-shadow: var(--boxShadow);
    }

    &_error {
      border: 1px solid var(--errorColor);
    }
  }

  &__error {
    margin-top: 6px;
    min-height: 21px;
    font-size: 10px;
    color: var(--errorColor);
  }
}

</style>
