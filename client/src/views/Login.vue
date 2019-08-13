<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">BWmelonApi后台管理系统</span>
      </div>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="loginUser.name" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入管理员密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: "login",
  components: {},
  data(){
    return {
      loginUser: {
        name: "",
        password: ""
      },
      rules: {
        name:[{
          required:true,message:"管理员账号不能为空",trigger:"blur"
        }],
        password:[{
          required:true,message:"管理员密码不能为空",trigger:"blur"
        }]
      }
    }
  },
  methods:{
    submitForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/login", this.loginUser)
                       .then(res => {
                        //  token
                         const { token } = res.data;
                        //  存储到ls
                         localStorage.setItem("BWmelonApiToken", token);
                        //  解析token
                        const decoded = jwt_decode(token);
                        // token存储到vuex中
                        this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded))
                        this.$store.dispatch("setUser", decoded)
                         this.$router.push('/index');
                       })

                       
          }
        });
    },
    isEmpty(value) {
      return (
        value ===undefined || value == null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
.submit_btn {
  width: 100%;
}
</style>
