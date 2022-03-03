<template>
  <div class="custom-upload">
    <!-- 功能按钮组 -->
    <div class="custom-upload--btns">
      <n-upload
        ref="upload"
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :default-upload="false"
        :show-file-list="false"
        multiple
        @change="handleUploadChange"
      >
        <n-button strong round type="info">
          <template #icon>
            <n-icon>
              <file-tray-full />
            </n-icon>
          </template>
          Choose
        </n-button>
      </n-upload>
      <n-button strong round type="primary" @click="handleUpload">
        <template #icon>
          <n-icon>
            <cloud-upload />
          </n-icon>
        </template>
        Upload
      </n-button>
      <n-button strong round type="error">
        <template #icon>
          <n-icon>
            <stop-circle />
          </n-icon>
        </template>
        Stop
      </n-button>
      <n-button strong round type="warning" @click="handleReset">
        <template #icon>
          <n-icon>
            <refresh-circle />
          </n-icon>
        </template>
        Reset
      </n-button>
    </div>

    <!-- 上传文件列表 -->
    <div class="custom-upload--list">
      <div
        class="list-item"
        :style="{ '--right': 100 - uploadProgress + '%' }"
        v-for="item in file.list"
        :key="item.id"
      >
        <n-icon class="n-icon--link" :size="18">
          <attach-outline />
        </n-icon>
        <span class="list-item--name">{{ item.name }}</span>
        <span class="list-item--progress" v-show="file.uploadStatus">{{
          uploadProgress >= 100 ? '上传完成' : `上传中（${uploadProgress}%）`
        }}</span>
        <n-icon class="n-icon--close" :size="18">
          <close-outline />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import type { NButton, NIcon, UploadInst, UploadFileInfo } from 'naive-ui'
import {
  CloudUpload,
  StopCircle,
  FileTrayFull,
  RefreshCircle,
  AttachOutline,
  CloseOutline
} from '@vicons/ionicons5'
import { uploadFile, getFileUrl } from '../../api'
import useFileChunk from './useFileChunk'

const { createFileChunk } = useFileChunk()

// 文件数据
const file = reactive({
  list: [] as UploadFileInfo[],
  uploadStatus: false
})

// 上传文件数量和总数量
const fileCount = reactive({
  finishe: 0,
  total: 0
})

// 上传进度样式
const uploadProgress = computed(() => {
  return !fileCount.finishe || !fileCount.total
    ? 0
    : Math.round((fileCount.finishe / fileCount.total) * 100)
})

// 获取文件
const handleUploadChange = (options: { fileList: UploadFileInfo[] }) => {
  file.list = [options.file]
  fileCount.total = 10
}

// 重置
const handleReset = () => {
  console.log(file, fileCount)
  file.list = [] as UploadFileInfo[]
  file.uploadStatus = false
  fileCount.finishe = 0
  fileCount.total = 0

  console.log(file, fileCount)
}

// 上传
const handleUpload = async () => {
  const fileData = file.list[0].file

  const chunkList = await createFileChunk(fileData)
  fileCount.total = chunkList.length
  file.uploadStatus = true

  for (let i = 0; i < chunkList.length; i++) {
    const { file, name } = chunkList[i]
    const result = await uploadFile({
      file,
      name
    })

    if (result) {
      const { data } = result
      if (data.code === 0) {
        fileCount.finishe += 1
      }
    }
  }
}

const handleGetFileUrl = async () => {
  const result = await getFileUrl({
    total: fileCount.total,
    name: 'bd3e1b7d3b93d30c61d366a77466435f',
    type: 'video/mp4'
  })

  console.log(result)
}

watch(uploadProgress, (newVal, oldVal) => {
  if (newVal === 100) {
    handleGetFileUrl()
  }
})
</script>

<style lang="scss" scoped>
.custom-upload {
  width: 440px;

  &--btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .n-button {
      width: 100px;
    }

    .n-upload {
      width: auto;
    }
  }

  &--list {
    .list-item {
      display: flex;
      align-items: center;
      position: relative;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #333;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.2s ease;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: var(--right);
        bottom: 0;
        background-color: #166039;
        mix-blend-mode: color;
        mix-blend-mode: hue;
        mix-blend-mode: hard-light;
        transition: all 0.4s ease;
      }

      &:hover {
        background-color: #ebebeb;
        cursor: pointer;
      }

      &--name {
        flex: 1;
        margin: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &--progress {
        margin-right: 14px;
        color: #ccc;
        text-align: right;
      }

      .n-icon {
        color: #afafaf;

        &--link {
          transform: rotate(45deg);
        }

        &--close:hover {
          color: #999;
        }
      }
    }
  }
}
</style>
