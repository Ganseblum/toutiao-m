<template>
  <div class="name-wrap">
    <div class="navBar-wrap">
      <van-nav-bar
        title="设置昵称"
        left-text="返回"
        left-arrow
        right-text="确定"
        @click-left="$emit('close')"
        @click-right="onClickRight"
      />
    </div>

    <div class="text-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { upDataUserInfo } from '@/api/userinfo'
export default {
  components: {},
  props: {
    // user: {
    //   type: String,
    //   required: true
    // }
    value: {
      type: String,
      required: true
    }
  },
  name: 'updateName',
  data() {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async upDataName() {
      const localName = this.localName
      const data = await upDataUserInfo({
        name: localName
      })
      console.log(data)
    },
    onClickRight() {
      this.upDataName()
      this.$emit('close')
      this.$emit('input', this.localName)
      // this.$emit('aaaa', this.localName)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
.name-wrap {
  height: 100%;
  background-color: rgb(226, 222, 222);
}
.text-wrap {
  margin-top: 20px;
}
</style>
