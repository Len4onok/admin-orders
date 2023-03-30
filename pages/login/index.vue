<template>
  <div class="login">
    <div class="login__wrapper">
      <validation-observer
        v-slot="{ handleSubmit }"
        ref="login"
        tag="form"
        class="login__inputs"
        @submit.prevent="handleSubmit()"
        @keypress.enter.prevent="handleClick()"
      >
        <base-input
          v-model="login.userName"
          placeholder="Имя"
          name="Имя"
          vid="userName"
          rules="required"
          @input="resetFail"
        />
        <base-input
          v-model="login.password"
          placeholder="Пароль"
          name="Пароль"
          vid="title"
          rules="required|min:8"
          :invalid-message="isFail ? 'Неверный логин\\пароль' : ''"
          @input="resetFail"
        />
      </validation-observer>
      <button class="login__button" type="submit" @click="handleClick">
        Войти
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import MainVue from '~/mixins/MainVue'
import BaseInput from '~/components/ui/BaseInput/index.vue'
import { useUserStore } from '~/store/user'
import { ROUTES } from '~/configs/routesPath'

export default MainVue.extend({
  name: 'login-form',
  components: {
    BaseInput
  },
  layout: 'login',
  data () {
    return {
      login: {
        userName: '',
        password: ''
      },
      isFail: false
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      loginAction: 'loginAction'
    }),
    resetFail () {
      this.isFail = false
    },
    async handleClick () {
      const isValid = await (this.$refs.login as Vue & { validate: () => Promise<boolean> })?.validate()
      if (isValid) {
        try {
          await this.SendRequest(async () => {
            await this.loginAction(this.login)
            await this.$router.push(ROUTES.HOME)
          })
        } catch (e) {
          this.isFail = true
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  margin-top: 200px;
  &__wrapper{
    display: flex;
    flex-direction: column;
    max-width: 344px;
    background: var(--lightGrey);
    padding: 30px 20px;
    border-radius: 16px;

  }

  &__button {
    margin-top: 10px;
    align-self: flex-end;
    @include buttonWhite;
  }
}

@include _1199{
  .login {
    margin-top: 100px;
  }
}
</style>
