<template>
  <div class="my-container">
    <!-- 登录 -->
    <div class="header" v-if="$store.state.user">
      <div class="header-top">
        <div class="top-left">
          <img :src="userInfoList.photo" alt="" />
          <span class="text">{{ userInfoList.name }}</span>
        </div>
        <div class="top-right">
          <van-button plain size="mini" round type="primary" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>

      <!-- 数据展示 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userInfoList.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfoList.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfoList.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfoList.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header" v-else>
      <div class="herder-nologin">
        <img src="~@/assets/mobile.png" @click="$router.push('/login')" />
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </div>

    <div v-if="$store.state.user">
      <!-- 收藏/历史  宫格导航-->
      <van-grid :column-num="2" class="grid-toutiao">
        <van-grid-item text="收藏">
          <i slot="icon" clickable class="toutiao toutiao-shoucang"></i>
        </van-grid-item>
        <van-grid-item text="历史">
          <i slot="icon" clickable class="toutiao toutiao-lishi"></i>
        </van-grid-item>
      </van-grid>

      <!-- 消息通知  单元格-->
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell
          class="cell-text"
          center
          clickable
          @click="loginOut"
          title="退出登录"
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  components: {},
  props: {},
  name: 'myIndex',
  data() {
    return {
      userInfoList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(['setUser']),
    // 退出登录
    loginOut() {
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          // this.$store.commit('setUser', null)
          this.setUser(null)
          this.$router.push('/login')
        })
        .catch(() => {
          console.log('退出错误')
        })
    },

    // 登录获取用户信息
    async getUserInfoList() {
      const { data } = await getUserInfo()
      console.log(data.data)
      this.userInfoList = data.data
      console.log(this.userInfoList)
    }
  },
  created() {
    this.getUserInfoList()
  },
  mounted() {}
}
</script>
<style scoped lang="less">
.my-container {
  .header {
    display: flex;
    height: 361px;
    padding-top: 60px;
    flex-direction: column;
    background: url('~@/assets/banner.png');
    background-size: cover;
    img {
      height: 80px;
      width: 80px;
    }
    .header-top {
      display: flex;
      padding-top: 20px;
      align-items: center;
      justify-content: space-around;
      .top-left {
        display: flex;
        align-items: center;
        .text {
          color: white;
          font-size: 30px;
          padding-left: 30px;
        }
      }
    }

    .data {
      display: flex;
      justify-content: space-evenly;
      flex: 1;
      .data-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }

    // 未登录布局
    .herder-nologin {
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        width: 134px;
        height: 134px;
      }
      .text {
        padding-top: 40px;
        color: white;
      }
    }
  }

  // 单元格样式修改
  .cell-text {
    text-align: center;
  }

  // 宫格布局的样式修改
  .grid-toutiao .toutiao {
    font-size: 50px;
  }
  .toutiao-lishi {
    color: red;
  }

  .toutiao-shoucang {
    color: green;
  }
}
</style>
