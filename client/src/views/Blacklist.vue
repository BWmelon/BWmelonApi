<template>
<div class="fillContain">
    <div>
        <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                <el-button type="primary" size ="small" icon="view" @click='handleAdd()'>添加</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
        <el-table v-if="tableData.length > 0" :data="tableData" style="width:100%" max-height=450 border>
            <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
            <el-table-column prop="date" align="center" label="拉黑时间" width="350">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="domain" align="center" label="域名" width="500">
                <template slot-scope="scope">
                    <span style="color:#00d053;">{{ scope.row.domain }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reason" align="center" label="拉黑原因" width="300">
                <template slot-scope="scope">
                    <span style="color:#f56567;">{{ scope.row.reason }}</span>
                </template>
            </el-table-column>
            <el-table-column 
            label="操作" 
            prop="operation"
            align="center" 
            fixed="right"
            >
            <template slot-scope="scope">
                <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="small"
                type="danger"
                icon="delete"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <Dialog :dialog="dialog"></Dialog>
</div>
</template>

<script>
import Dialog from "../components/Dialog"
export default {
    name: "blacklist",
    data() {
        return {
            tableData: [],
            dialog: {
                show: false
            }
        };
    },
    created() {
        this.getBlacklist();
    },
    methods: {
        getBlacklist(){
            this.$axios.get("/api/blacklists")
            .then(res => {
                console.log(res);
                this.tableData = res.data;
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        handleEdit(index, row) {

        },
        handleDelete(index, row){

        },
        handleAdd(){
            this.dialog.show = true;
        }
    },
    components: {
        Dialog
    }
}
</script>

<style scoped>
.fillContain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
</style>