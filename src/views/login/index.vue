<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录界面">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            format="ss s"
            :time="1000 * 60"
            @finish="isShowDown = false"
            v-if="isShowDown"
          />
          <van-button
            size="small"
            round
            class="send-small-btn"
            native-type="button"
            @click="onSendSms"
            v-else
            >发送验证码
          </van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="default" native-type="submit"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
// 导入用户登录的路由模块
import { login, sendSms } from '@/api/user.js'

export default {
  components: {},
  props: {},
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 判断是否显示倒计时
      isShowDown: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 登录，提交表单
    async onSubmit() {
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        const { data } = await login(this.user)
        // 获取token值
        this.$store.commit('setUser', data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        this.$router.push('/home')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败')
        } else {
          // console.log('出现错误,请稍后再试')
          this.$toast.fail('出现错误,请稍后再试')
        }
      }
    },

    // 发送验证码
    async onSendSms() {
      // 校验手机号是否正确
      try {
        // 异步事件，要等表单验证完之后，才能进行下一步操作
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 通过验证后，开启倒计时
      this.isShowDown = true
      this.$toast('发送成功')

      try {
        await sendSms(this.user.mobile)
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 32px;
    padding-right: 8px;
  }

  // 登录按钮
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: rgb(102, 122, 237);
      color: white;
    }
  }

  .send-small-btn {
    font-size: 5px;
    font-size: 10px !important;
    background-color: rgb(250, 246, 246);
  }

  .page-nav-bar .van-icon {
    color: white;
  }
}
</style>
