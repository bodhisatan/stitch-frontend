<template>
  <div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-upload
          multiple
          ref="upload"
          action="http://127.0.0.1:5000/upload_pic"
          :limit=2
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">上传两张jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <div style="margin: 0 100px 0 50px; flex-grow: 1;">
        <el-form ref="form" :model="form" :inline="true" style="margin: 50px">
          <el-form-item label="特征提取算法">
            <el-select v-model="form.algorithm" placeholder="请选用特征提取算法">
              <el-option label="SURF" value="SURF"></el-option>
              <el-option label="SIFT" value="SIFT"></el-option>
              <el-option label="HARRIS" value="HARRIS"></el-option>
              <el-option label="ORB" value="ORB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结果数据是否落库">
            <el-switch v-model="form.isSaved"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">开始拼接</el-button>
          </el-form-item>
        </el-form>

        <el-steps :active="step_active" style="margin: 50px">
          <el-step title="步骤1" description="特征点提取"></el-step>
          <el-step title="步骤2" description="特征点匹配"></el-step>
          <el-step title="步骤3" description="图像配准"></el-step>
          <el-step title="步骤4" description="图像融合"></el-step>
        </el-steps>
      </div>
    </div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-link type="primary">拼接结果（点击查看大图）：</el-link>
        <br><br>
        <div v-loading="loading">
          <el-image
            style="width: 350px; height: 250px"
            :src="url"
            :preview-src-list="srcList">
            v-loading="loading"
          </el-image>
        </div>

      </div>
      <div style="margin: 80px 100px 0 0; flex-grow: 1">
        输入图像相似度：
        <el-input
          style="width: 30%"
          placeholder="SSIM结构化相似度"
          v-model="ssim"
          :disabled="true">
        </el-input>
        /
        <el-input
          style="width: 30%"
          placeholder="三通道直方图相似度"
          v-model="hist"
          :disabled="true">
        </el-input>
        <br><br>
        PSNR指标：
        <el-input
          style="width: 30%"
          placeholder="输出图像质量指标"
          v-model="psnr"
          :disabled="true">
        </el-input>
        <br><br>
        <div>
          特征点提取耗时 / 运行总耗时（ms）：
          <el-input
            style="width: auto"
            placeholder="特征点提取耗时"
            v-model="algorithm_time_cost"
            :disabled="true">
          </el-input>
          /
          <el-input
            style="width: auto"
            placeholder="运行总耗时"
            v-model="total_time_cost"
            :disabled="true">
          </el-input>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Stitch',
  data() {
    return {
      loading: true,
      fileList: [],   // upload多文件数组
      form: {
        pic1_name: '',
        pic2_name: '',
        pic_uuid: '',
        isSaved: false,
        algorithm: 'SIFT'
      },
      step_active: 0,
      url: '',
      srcList: [],
      ssim: '',
      hist: '',
      psnr: '',
      total_time_cost: '',
      algorithm_time_cost: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 传输多张图片到服务器
    submitUpload() {
      if (this.fileList.length !== 2) {
        this.$message({
          message: '请选择2张图片文件',
          type: 'warning'
        })
      } else {
        const isLt500K = this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 500);
        if (!isLt500K) {
          this.$message.error('请检查，上传文件大小不能超过500KB!');
        } else {
          let formData = new FormData();  // new formData对象
          this.fileList.forEach(file => {
            formData.append('file', file.raw)
          })
          axios.post("http://127.0.0.1:5000/upload_pic", formData).then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.form.pic_uuid = response.data.uuid
              this.form.pic1_name = response.data.pic1_name
              this.form.pic2_name = response.data.pic2_name
              console.log(this.form.pic2_name)
              this.$message({
                message: "上传成功",
                type: 'success'
              })
            } else {
              this.$message({
                message: "上传失败",
                type: 'error'
              })
            }
          });
        }
      }
    },
    onSubmit() {
      let that = this
      if (that.algorithm === '') {
        _this.$alert('请选择算法', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        //提交表单
        axios.post("http://127.0.0.1:5000/start", this.form).then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.loading = false
            this.url = response.data.res_url
            this.srcList.push(response.data.res_url)
            this.srcList.push(response.data.vis_url)
            this.ssim = response.data.ssim
            this.hist = response.data.hist
            this.psnr = response.data.psnr
            this.step_active = 4
            console.log(this.srcList)
            this.$alert('运算结束', '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('运算失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        });
      }
    },

  }
}
</script>

<style scoped>

</style>
