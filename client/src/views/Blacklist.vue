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
        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                    </el-pagination>
                </div>
                
            </el-col>
        </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getBlacklist"></Dialog>
</div>
</template>

<script>
import Dialog from "../components/Dialog"
export default {
    name: "blacklist",
    data() {
        return {
            paginations: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 5, // 1页显示多少条
                page_sizes: [5, 10, 15, 20], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },
            tableData: [],
            allTableData: [],
            formData: {
                domain: '' ,
                reason: ''
            },
            dialog: {
                show: false,
                title: '',
                option: 'edit'
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
                this.allTableData = res.data;
                this.setPaginations();
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        setPaginations(){
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size;
            })
        },
        handleEdit(index, row) {
            this.dialog = {
                show: true,
                title: "修改域名黑名单",
                option: 'edit'
            }

            this.formData = {
                domain: row.domain,
                reason: row.reason,
                id: row._id
            }
        },
        handleDelete(index, row){
            this.$axios.delete(`/api/blacklists/delete/${row._id}`)
                .then(res => {
                    this.$message("删除成功");
                    this.getBlacklist();
                })
        },
        handleAdd(){
            this.dialog.show = true;
            this.dialog = {
                show: true,
                title: "添加域名黑名单",
                option: 'add'
            }

            this.formData = {
                domain: "",
                reason: "",
                id: ""
            }
        },
        handleCurrentChange(page) {
            // 当前页
            let sortnum = this.paginations.page_size * (page - 1);
            let table = this.allTableData.filter((item, index) => {
                return index >= sortnum;
            });
            // 设置默认分页数据
            this.tableData = table.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        handleSizeChange(page_size) {
            // 切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item, index) => {
                return index < page_size;
            });
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
.pagination {
    text-align: right;
}
</style>