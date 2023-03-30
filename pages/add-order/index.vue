<template>
  <div class="add-order">
    <h3 class="add-order__title">
      Добавить заказ
    </h3>
    <validation-observer
      v-slot="{ handleSubmit }"
      ref="addOrder"
      tag="form"
      class="add-order__inputs"
      @submit.prevent="handleSubmit()"
      @keypress.enter.prevent="handleClick()"
    >
      <base-input
        v-model="order.name"
        placeholder="Введите ваше имя"
        name="Имя"
        vid="name"
        rules="required"
      />
      <base-input
        v-model="order.address"
        placeholder="Введите ваш адрес"
        name="Адрес"
        vid="address"
        rules="required"
      />
      <base-input
        v-model="order.comment"
        placeholder="Комментарий"
        name="Комментарий"
        vid="comment"
      />
    </validation-observer>
    <button class="add-order__button" type="submit" @click="handleClick">
      Добавить заказ
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import MainVue from '~/mixins/MainVue'
import BaseInput from '~/components/ui/BaseInput/index.vue'
import { useUserStore } from '~/store/user'
import { ROUTES } from '~/configs/routesPath'
import { useOrdersStore } from '~/store/orders'
import { ORDER_STATUS } from '~/utils/types'

export default MainVue.extend({
  name: 'form-add-order',
  components: {
    BaseInput
  },
  data () {
    return {
      order: {
        name: '',
        address: '',
        comment: ''
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['name'])
  },
  watch: {
    name: {
      immediate: true,
      handler (value: string) {
        if (value) {
          this.order.name = value
        }
      }
    }
  },
  methods: {
    ...mapActions(useOrdersStore, {
      addOrder: 'addOrder'
    }),
    async handleClick () {
      const isValid = await (this.$refs.addOrder as Vue & { validate: () => Promise<boolean> })?.validate()
      if (isValid) {
        await this.SendRequest(async () => {
          await this.addOrder({
            ...this.order,
            id: Math.floor(Math.random() * 1000),
            status: ORDER_STATUS.NEW,
            date: new Date(Date.now()).toLocaleDateString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          })
          await this.$router.push(ROUTES.HOME)
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.add-order {
  padding-top: 50px;
  &__inputs{
    margin-top: 40px;
  }

  &__button {
    @include buttonGrey;
  }
}

</style>
