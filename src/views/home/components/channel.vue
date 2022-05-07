<template>
  <div class="channel-container">
    <!-- 我的频道 -->
    <van-cell-group inset>
      <van-cell title="我的频道">
        <van-button plain type="primary" size="mini" round @click="editChange">
          {{ editStatus ? '完成' : '编辑' }}</van-button
        >
      </van-cell>

      <van-grid class="myChannel">
        <van-grid-item v-for="(channel, index) in channel" :key="index">
          <div
            slot="text"
            class="channel-text"
            :class="{ active: index === active }"
            @click="delChannel(channel, index)"
          >
            {{ channel.name }}
          </div>
          <van-icon
            slot="icon"
            name="close"
            class="icon-text"
            v-show="editStatus && !noDelChannel.includes(channel.id)"
          ></van-icon>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 推荐频道 -->
    <div class="recommanChannel">
      <van-cell-group inset>
        <van-cell title="推荐频道"> </van-cell>

        <van-grid>
          <van-grid-item v-for="(channel, index) in filterChannel" :key="index">
            <van-icon slot="icon" name="plus" class="icon-text"></van-icon>
            <div slot="text" class="channel-text" @click="addChannel(channel)">
              {{ channel.name }}
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { getAllChannel, getUserChannel, delUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  components: {},
  props: {
    active: {
      type: Number,
      required: true
    },
    channel: {
      type: Array,
      required: true
    }
  },
  name: 'MyChannel',
  data() {
    return {
      editStatus: false,
      MyChannel: [],
      AllChannel: [],
      noDelChannel: [0] // 不能删除的频道的id
    }
  },
  computed: {
    // 过滤掉用户已选的频道渲染频道
    filterChannel() {
      return this.AllChannel.filter((channel) => {
        return !this.channel.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    },

    ...mapState(['user'])
  },
  watch: {},
  methods: {
    editChange() {
      this.editStatus = !this.editStatus
    },

    // 获取全部频道
    async getChannel() {
      // 登录
      const { data } = await getAllChannel()
      const results = data.data.channels
      this.AllChannel = results
    },

    // 删除频道
    async delChannel(channel, index) {
      try {
        // 判断是是否登录
        if (this.user) {
          await delUserChannel(channel.id)
        } else {
          setItem('TOKEN_Channel', this.channel)
        }
      } catch (err) {
        this.$toast('删除频道失败，请稍后重试')
      }

      // 判断是不是数据是否能删除
      if (this.noDelChannel.includes(index)) {
        return this.$toast('该选项不能删除')
      }
      // 可以删除
      if (this.editStatus) {
        this.MyChannel = this.channel
        // console.log(this.MyChannel)
        this.MyChannel.splice(index, 1)
        if (index <= this.active) {
          this.$emit('updataChannel', this.active - 1, true)
        } else {
          this.$emit('updataChannel', this.active, true)
        }
      } else {
        this.$emit('updataChannel', index, false)
      }
    },
    // 添加频道
    async addChannel(channel) {
      try {
        this.MyChannel.push(channel)
        // 判断用户是否登录
        if (this.user) {
          // 登录
          getUserChannel([
            {
              id: channel.id, // id
              seq: this.MyChannel.length // 序号
            }
          ])
        } else {
          // 未登录
          // 把内容存储到本地
          setItem('TOKEN_Channel', this.channel)
        }
      } catch (err) {
        this.$toast('添加频道失败')
      }
    }
  },
  created() {
    this.getChannel()
  },
  mounted() {}
}
</script>
<style scoped lang="less">
.channel-container {
  box-sizing: border-box;
  padding-top: 100px;
  /deep/.van-grid-item {
    padding: 8px;
    .van-grid-item__content--center {
      background-color: rgb(238, 238, 238);
      .channel-text {
        font-size: 10px;
      }
      .active {
        color: red;
      }
    }
  }

  /deep/.myChannel {
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .icon-text {
      color: gray;
      z-index: 10;
      position: absolute;
      right: 0;
      top: -8px;
      font-size: 30px;
    }
  }

  .van-grid-item {
    height: 120px;
    width: 50px;
  }

  /deep/ .recommanChannel {
    padding-top: 50px;
    .van-grid-item__content {
      flex-direction: row;
    }
    .van-grid-item__icon-wrapper {
      font-size: 10px;
      padding-right: 5px;
    }
  }
}
</style>
