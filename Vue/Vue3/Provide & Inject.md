详见：[Provide / Inject | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/component-provide-inject.html)

作用：在深度嵌套的组件中，将 prop 沿着组件链逐级传递会很麻烦。使用 Provide/Inject可以直接将父组件的数据传递给子孙组件

示例：
***father.vue***
```
<template>
  <son />
</template>

<script>
import { provide } from 'vue'
import son from './son.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```

***son.vue***
```
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```