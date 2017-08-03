<template>
  <Dropdown class="person" placement="bottom-end">
    <div>
      <img class="avatar" :src="userInfo.photouri || avatarUrl" alt="头像">
      <span class="user-name">{{userInfo.truename || 'shixuev5'}}</span>
    </div>
    <Dropdown-menu slot="list">
      <header>用户信息</header>
      <Row class="content">
        <Col class="left" span="10">
        <div class="edit-avatar">
          <img :src="userInfo.photouri || avatarUrl" alt="头像">
          <div class="avatar-cover" @click="avatarModal = true">
            <Icon type="edit" size="20" color="#fff"></Icon>
          </div>
        </div>
        </Col>
        <Col class="right" span="14">
          <div>组织：{{userInfo.orgname}}</div>
          <div>岗位：{{userInfo.truename}}</div>
        </Col>
      </Row>
      <footer>
        <Button type="text" size="large" @click="pwdModal = true">修改密码</Button>
        <Button type="text" size="large" @click="logout()">
          <Icon type="log-out" size="16" color="#ff9900"></Icon>登出</Button>
      </footer>
    </Dropdown-menu>
    <Modal v-model="avatarModal" title="修改头像" :mask-closable="false" width="400">
      <Upload ref="upload" type="drag" name="ktwfile" accept="image/gif,image/jpeg,image/jpg,image/png" :format="['gif','jpg','jpeg','png']" :show-upload-list="false" :max-size="4096" :on-exceeded-size="handleMaxSize" :on-success="handleSuccess" :action="uploadUrl()">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="38" style="color: #3399ff"></Icon>
          <p>点击或将文件拖拽到这里上传</p>
        </div>
      </Upload>
      <!-- <div class="avatar-show">

      </div> -->
      <div slot="footer">
        <Button type="primary" size="large" @click="saveAvatar()" :loading="loading" long>提交</Button>
      </div>
    </Modal>
    <Modal v-model="pwdModal" title="修改密码" :mask-closable="false" @on-cancel="pwdCancel()" width="400">
      <Form ref="form" :model="form" :rules="rules">
        <Form-item label="原密码" prop="oldPasswd">
          <Input type="text" v-model="form.oldPasswd" placeholder="请输入原密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="新密码" prop="newPasswd">
          <Input type="password" v-model="form.newPasswd" placeholder="请输入新密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="确认新密码" prop="confirmPasswd">
          <Input type="password" v-model="form.confirmPasswd" placeholder="请确认新密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" @click="pwdSubmit()" :loading="loading" long>提交</Button>
      </div>
    </Modal>
  </Dropdown>
</template>

<script>
import { savePasswd, saveAvatar } from '@/api/login/userInfo';
import avatarUrl from '@/assets/default.png';
import store from '@/store';
import config from '@/config';
import md5 from 'js-md5';

export default {
  name: 'User',
  data() {
    const validateNewPasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.form.newPasswd !== '') {
          // 对第二个密码框单独验证
          this.$refs.form.validateField('confirmPasswd');
        }
        callback();
      }
    };
    const validateConfirmPasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.form.newPasswd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      avatarUrl,
      avatarModal: false,
      pwdModal: false,
      loading: false,
      form: {
        oldPasswd: '',
        newPasswd: '',
        confirmPasswd: ''
      },
      rules: {
        oldPasswd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const errors = [];
              if (md5(value) !== store.getters.userInfo.password) {
                errors.push(new Error('与原密码不匹配！'));
              }
              callback(errors);
            }
          }
        ],
        newPasswd: [
          { required: true, validator: validateNewPasswd, trigger: 'blur' }
        ],
        confirmPasswd: [
          { required: true, validator: validateConfirmPasswd, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut');
      this.$router.push('/login');
    },
    pwdCancel() {
      this.$refs.form.resetFields();
    },
    pwdSubmit() {
      if (this.$refs.form.validate) {
        this.loading = true;
        savePasswd(this.form.oldPasswd, this.form.newPasswd).then(() => {
          this.$Message.success('密码修改成功！');
          this.pwdModal = false;
          this.loading = false;
        });
      }
    },
    saveAvatar() {
      this.loading = true;
      saveAvatar().then(() => {
        this.$Message.success('头像修改成功！');
        this.avatarModal = false;
        this.loading = false;
      });
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      this.$store.commit('SET_IMGURI');
      file.url = res.data;
      file.name = file.name;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: `文件${file.name}格式不正确，请上传 jpg 或 png 格式的图片。`
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: `文件${file.name}太大，不能超过 4M。`
      });
    },
    uploadUrl() {
      return `${config.usercenter}/user/upload`;
    }
  }
};
</script>

<style lang="less">
@sidebar: #363e4f;
@border: #f4f4f4;

.person {
  float: right;
  padding: 0 30px;
  transition: background-color .3s;
  &:hover {
    background-color: @sidebar;
  }
  .avatar {
    height: 38px;
    width: 38px;
    border: 2px solid #fff;
    border-radius: 50%;
    vertical-align: middle;
  }
  .user-name {
    color: #fff;
    margin-left: 10px;
  }
  .ivu-select-dropdown {
    right: 6px !important;
  }

  .ivu-dropdown-menu {
    width: 260px;
  }

  header {
    line-height: 28px;
    text-indent: 20px;
    border-bottom: 1px solid @border;
  }

  .content {
    height: 80px;
    overflow: hidden;

    .left {
      padding: 10px 22px;
      height: 100%;

      .edit-avatar {
        height: 60px;
        width: 60px;

        img {
          width: 100%;
          border: 1px solid transparent;
          border-radius: 4px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        }

        .avatar-cover {
          display: none;
          height: 60px;
          width: 60px;
          position: absolute;
          top: 11px;
          left: 22px;
          text-align: center;
          border-radius: 4px;
          background: rgba(0, 0, 0, .3);
          cursor: pointer;
        }

        &:hover .avatar-cover {
          display: block;
        }
      }
    }

    .right {
      line-height: 30px;
      padding-top: 10px;
    }
  }

  footer {
    border-top: 1px solid @border;
    line-height: 28px;

    &:first-child {
      float: left;
      text-indent: 4px;
    }
    button+button {
      float: right;
      margin-right: -20px;

      .ivu-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
