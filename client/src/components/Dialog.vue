<template>
    <div class="diglog">
        <el-dialog title="添加域名黑名单" 
        :visible="dialog.show"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false">

        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'dialog',
    props: {
        dialog: Object
    }
}
</script>

<style scoped>

</style>
