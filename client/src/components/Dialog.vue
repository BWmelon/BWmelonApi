<template>
    <div class="diglog">
        <el-dialog :title="dialog.title" 
        :visible.sync="dialog.show"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="formData"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">
                    <el-form-item prop='domain' label="拉黑域名:">
                        <el-input type="domain" v-model="formData.domain"></el-input>
                    </el-form-item>

                    <el-form-item prop='reason'  label="拉黑原因:">
                        <el-input type="reason" v-model="formData.reason"></el-input>
                    </el-form-item>
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'dialog',
    data(){
        return {
            form_rules: {
                domain: [
                    { required: true, message: "被拉黑域名不能为空", trigger: "blur" }
                ],
                reason: [
                    { required: true, message: "拉黑原因不能为空", trigger: "blur" }
                ]
            }
        }
    },
    props: {
        dialog: Object,
        formData: Object
    },
    methods: {
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`;
                //表单数据验证完成之后，提交数据
                    this.$axios.post(`/api/blacklists/${url}`, this.formData)
                        .then(res => {
                            // 操作成功
                            this.$message({
                                message: "成功！",
                                type: "success"
                            });
                        });
                }

                this.dialog.show = false;
                this.$emit("update");
            });
        }

    }
    
}
</script>

<style scoped>

</style>
