<template>
  <div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-upload
          action=""
          limit="2"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <div style="margin: 0 100px 0 50px; flex-grow: 1;">
        <el-form ref="form" :model="form" :inline="true" style="margin: 50px">
          <el-form-item label="特征提取算法">
            <el-select v-model="form.region" placeholder="请选用特征提取算法">
              <el-option label="SURF" value="SURF"></el-option>
              <el-option label="SIFT" value="SIFT"></el-option>
              <el-option label="HARRIS" value="HARRIS"></el-option>
              <el-option label="ORB" value="ORB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结果数据是否落库">
            <el-switch v-model="form.delivery"></el-switch>
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
        <el-image
          style="width: 350px; height: 250px"
          :src="url"
          :preview-src-list="srcList">
        </el-image>
      </div>
      <div style="margin: 80px 100px 0 0; flex-grow: 1">
        SSIM结构化相似度：
        <el-input
          style="width: 30%"
          placeholder="输入图像相似度指标"
          v-model="ssim"
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
export default {
  name: 'Stitch',
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      step_active: 3,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
      'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      ssim: '',
      psnr: '',
      total_time_cost: '',
      algorithm_time_cost: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>
