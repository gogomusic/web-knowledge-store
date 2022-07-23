详见：[Provide / Inject | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/component-provide-inject.html)

作用：在深度嵌套的组件中，将 prop 沿着组件链逐级传递会很麻烦。使用 Provide/Inject可以直接将父组件的数据传递给子孙组件

## 示例1：提供静态数据并提供默认值
***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide } from 'vue'
import Son from './Son.vue'

export default defineComponent({
  components: { Son },
  setup() {
    //provide 函数允许你通过两个参数定义 property：name (<String> 类型)和 value
    provide('staticData', 'static') //提供无响应性的数据,该值不可以被子组件修改
  },
})
</script>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    //inject(name,default) 函数有两个参数：要inject 的 property 的 name和默认值 (可选)
    const staticData = inject('staticData','defaultValue')

    return {
      staticData,
    }
  },
})
</script>
```

## 示例2：直接提供响应式数据（不安全）

***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import Son from './Son.vue'

export default defineComponent({
  components: { Son },
  setup() {
    const reactivityData = ref('响应式数据')//ref或者reactive都可以
    provide('reactivityData', reactivityData) //提供响应性的数据,该值可以被子组件修改。
  },
})
</script>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const reactivityData = inject('reactivityData')
    return {
      reactivityData,
    }
  },
})
</script>
```