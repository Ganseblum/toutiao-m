<template>
  <div class="userIfo">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      class="page-nav"
    />
    <van-cell
      class="photo-cell"
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link @click="showName = true">
      <div>{{ user.name }}</div>
    </van-cell>
    <van-cell title="性别" is-link>
      <div>{{ user.gender ? '男' : '女' }}</div>
    </van-cell>
    <van-cell title="生日" is-link>
      <div>{{ user.birthday }}</div>
    </van-cell>

    <!-- 昵称 -->
    <van-popup v-model="showName" position="bottom" :style="{ height: '100%' }">
      <!-- <UpdataName
        v-if="showName"
        :user="user.name"
        @aaaa="user.name = $event"
        @close="showName = false"
      /> -->
      <UpdataName
        v-if="showName"
        v-model="user.name"
        @close="showName = false"
      />
    </van-popup>

    <!-- 头像 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>
<script>
import { getDataUserInfo } from '@/api/userinfo'
import UpdataName from './components/updata-name.vue'
import updatePhoto from './components/updata-photo.vue'
import { getUserProfile } from '@/api/user'

export default {
  components: {
    UpdataName,
    updatePhoto
  },
  props: {},
  name: 'userIfo',
  data() {
    return {
      showName: false,
      isUpdatePhotoShow: false,
      user: [],
      img: null // 预览的图片
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getDataUserInfo()
        this.user = data.data
        console.log(this.user)
      } catch (err) {
        console.log(err)
      }
    },
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },

    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  },
  created() {
    this.getUserInfo()
    this.loadUserProfile()
  },
  mounted() {}
}
</script>
<style scoped lang="less"></style>
