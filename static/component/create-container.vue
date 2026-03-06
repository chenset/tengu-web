<style scoped>
/* Element Plus 风格对话框样式 */
.el-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-dialog-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-create-dialog-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    width: 1000px;
    max-width: 95%;
    max-height: 90vh;
}

.el-dialog-header-custom {
    padding: 20px 24px;
    border-bottom: 1px solid #e4e7ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.el-dialog-title-custom {
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
}

.el-dialog-close-custom {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #909399;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.3s;
}

.el-dialog-close-custom:hover {
    background-color: #f5f7fa;
    color: #409eff;
}

.el-dialog-body-custom {
    padding: 24px;
    flex: 1;
    overflow-y: auto;
}

.el-dialog-body-custom::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.el-dialog-body-custom::-webkit-scrollbar-thumb {
    background-color: #dcdfe6;
    border-radius: 4px;
}

.el-dialog-body-custom::-webkit-scrollbar-thumb:hover {
    background-color: #c0c4cc;
}

.el-dialog-body-custom::-webkit-scrollbar-track {
    background-color: #f5f7fa;
}

.el-loading-container {
    text-align: center;
    padding: 60px 0;
}

.el-loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.el-loading-text {
    margin-top: 16px;
    font-size: 14px;
    color: #606266;
}

.el-form-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.el-dialog-footer-custom {
    padding: 16px 24px;
    border-top: 1px solid #e4e7ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.el-price-info {
    flex: 1;
    font-size: 14px;
    color: #e6a23c;
}

.el-price-loading {
    display: flex;
    align-items: center;
    gap: 8px;
}

.el-price-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #e6a23c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.el-price-error {
    color: #f56c6c;
}

.el-price-text {
    /* font-weight: 500; */
    /* font-size: 10px; */
}

.el-price-hour {
    margin-top: -3px;
    /* font-size: 10px; */
    /* margin-top: 2px; */
    /* opacity: 0.8; */
}

.el-dialog-buttons {
    display: flex;
    gap: 12px;
}

.el-btn {
    padding: 9px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
}

.el-btn:hover:not(:disabled) {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.el-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.el-btn-default {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
}

.el-btn-default:hover:not(:disabled) {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.el-btn-primary {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
}

.el-btn-primary:hover:not(:disabled) {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.el-btn-loading {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* 对话框动画 */
.el-dialog-fade-enter-active {
    animation: el-dialog-fade-in 0.3s;
}

.el-dialog-fade-leave-active {
    animation: el-dialog-fade-out 0.3s;
}

@keyframes el-dialog-fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes el-dialog-fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>

<template>
    <div>
        <!-- 创建实例对话框 - Element Plus 风格 -->
        <transition name="el-dialog-fade">
            <div v-if="visible" class="el-dialog-overlay" @click="handleDialogMaskClick">
                <div class="el-dialog-wrapper" @click.stop>
                    <div class="el-create-dialog-container">
                        <!-- 对话框头部 -->
                        <div class="el-dialog-header-custom">
                            <span class="el-dialog-title-custom">
                                <span v-if=" this.containerScene==='R_LAN'" class="text-green-600">创建容器组【内网】实例</span>
                                <span v-if=" this.containerScene==='R_WAN'" class="text-orange-600">创建容器组【公网】实例</span>
                            </span>
                            <button @click="closeCreateDialog" class="el-dialog-close-custom">
                                <svg viewBox="0 0 1024 1024" width="16" height="16">
                                    <path fill="currentColor"
                                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                                </svg>
                            </button>
                        </div>

                        <!-- 对话框内容 -->
                        <div class="el-dialog-body-custom">
                            <!-- 加载状态 -->
                            <div v-if="loadingDictOptions" class="el-loading-container">
                                <div class="el-loading-spinner"></div>
                                <p class="el-loading-text">加载配置选项中...</p>
                            </div>

                            <!-- 表单内容 -->
                            <form v-else @submit.prevent="submitCreate" class="el-form-container">




                                <!-- 规格配置 -->
                                <div class="border-b pb-4">
                                    <h4 class="text-md font-semibold text-gray-700 mb-3">规格配置</h4>
                                    <div class="grid grid-cols-2 gap-4">
                                        <!-- CPU规格 -->
                                        <!-- <div>
                                            <label class="block text-sm font-medium text-gray-700">CPU规格</label>
                                            <select v-model="formData.cpu" @change="onCpuChange"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option value="">请选择CPU</option>
                                                <option v-for="option in getOptions('cpu')" :key="option.dictValue"
                                                    :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div> -->

                                        <!-- 内存规格（级联） -->
                                        <!-- <div>
                                            <label class="block text-sm font-medium text-gray-700">内存规格</label>
                                            <select v-model="formData.memory" :disabled="!formData.cpu"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100">
                                                <option value="">请选择内存</option>
                                                <option v-for="option in memoryOptions" :key="option.dictValue"
                                                    :value="option.dictValue">
                                                    {{ option.dictName }}
                                                </option>
                                            </select>
                                        </div> -->

                                        <!-- ECS实例规格 -->
                                        <div class="col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">ECS实例规格 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.instanceType"
                                                :disabled="readonlyFields.instanceType" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择实例规格</option>
                                                <option v-for="option in getOptions('instanceType')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>


                                        <div class="col-span-2">
                                            <span class="block text-sm font-medium text-gray-400">
                                                付费模式：选择
                                                <strong class="text-green-600">
                                                    "抢占式"
                                                </strong>
                                                能节省最多
                                                <strong class="text-green-600">
                                                    90%
                                                </strong>
                                                的费用，代价是一般 <span class="text-orange-600">1天~5天</span> 会被强制释放。
                                            </span>
                                        </div>

                                        <!-- 付费模式 -->
                                        <div class="col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">付费模式 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.spotStrategy"
                                                :disabled="readonlyFields.spotStrategy" @change="onSpotStrategyChange"
                                                required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择付费模式</option>
                                                <option v-for="option in getOptions('spotStrategy')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 价格上限（抢占式时显示） -->
                                        <div v-if="formData.spotStrategy === 'SpotWithPriceLimit'" class="col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">价格上限 <span
                                                    class="text-red-500">*</span></label>
                                            <input v-model.number="formData.spotPriceLimit" type="number" step="0.01"
                                                min="0" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="请输入价格上限（元/小时）">
                                        </div>

                                        <!-- 重启策略 -->
                                        <div class="col-span-2" v-show="false">
                                            <label class="block text-sm font-medium text-gray-700">重启策略 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.restartPolicy"
                                                :disabled="readonlyFields.restartPolicy" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择重启策略</option>
                                                <option v-for="option in getOptions('restartPolicy')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>



                                <!-- 基础配置 -->
                                <div class="border-b pb-4" v-show="false">
                                    <h4 class="text-md font-semibold text-gray-700 mb-3">基础配置</h4>
                                    <div class="grid grid-cols-1 gap-4">
                                        <!-- 容器组名称 -->
                                        <!-- <div>
                                            <label class="block text-sm font-medium text-gray-700">容器组名称 <span
                                                    class="text-red-500">*</span></label>
                                            <input v-model="formData.containerGroupName" type="text" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="请输入容器组名称">
                                        </div> -->

                                        <!-- 选择通道账号 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">通道账号选择 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.channelCode"
                                                :disabled="readonlyFields.channelCode" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option>请选择通道账号</option>
                                                <option v-for="option in getOptions('channelCode')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 地域选择 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">地域选择 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.regionId" :disabled="readonlyFields.regionId"
                                                required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择地域</option>
                                                <option v-for="option in getOptions('regionId')" :key="option.dictValue"
                                                    :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 专有网络 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">专有网络 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.vpcId" :disabled="readonlyFields.vpcId" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择专有网络</option>
                                                <option v-for="option in getOptions('vpcId')" :key="option.dictValue"
                                                    :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 交换机 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">交换机 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.vSwitchId" :disabled="readonlyFields.vSwitchId"
                                                required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择交换机</option>
                                                <option v-for="option in getOptions('vSwitchId')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 安全组 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">安全组 <span
                                                    class="text-red-500">*</span></label>
                                            <select v-model="formData.securityGroupId"
                                                :disabled="readonlyFields.securityGroupId" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择安全组</option>
                                                <option v-for="option in getOptions('securityGroupId')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <!-- 容器配置 -->
                                <div>
                                    <h4 class="text-md font-semibold text-gray-700 mb-3">容器配置</h4>
                                    <div class="space-y-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                                        <!-- 容器名称 -->
                                        <div v-show="false">
                                            <label class="block text-sm font-medium text-gray-700">容器名称 <span
                                                    class="text-red-500">*</span></label>
                                            <input v-model="container.name" type="text" required
                                                :disabled="readonlyFields.containers"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="请输入容器名称">
                                        </div>

                                        <!-- 镜像 -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">镜像地址 <span
                                                    class="text-red-500">*</span></label>
                                            <!-- :disabled="readonlyFields.containers" -->
                                            <input v-model="container.image" type="text" required
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="请输入镜像地址">
                                        </div>

                                        <!-- 镜像拉取策略 -->
                                        <div v-show="false">
                                            <label class="block text-sm font-medium text-gray-700">镜像拉取策略</label>
                                            <select v-model="container.imagePullPolicy"
                                                :disabled="readonlyFields.imagePullPolicy"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                <option value="">请选择拉取策略</option>
                                                <option v-for="option in getOptions('imagePullPolicy')"
                                                    :key="option.dictValue" :value="option.dictValue">
                                                    {{ option.dictName }} <span v-if="option.remark"
                                                        class="text-gray-500">({{ option.remark }})</span>
                                                </option>
                                            </select>
                                        </div>

                                        <!-- 启动命令 -->
                                        <div v-show="false">
                                            <label class="block text-sm font-medium text-gray-700">启动命令</label>
                                            <div class="space-y-2">
                                                <div v-for="(cmd, index) in container.command" :key="'cmd-' + index"
                                                    class="flex gap-2">
                                                    <input v-model="container.command[index]" type="text"
                                                        :disabled="readonlyFields.containers"
                                                        class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                        placeholder="请输入命令">
                                                    <button type="button" @click="removeCommand(index)"
                                                        v-if="!readonlyFields.containers"
                                                        class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                                </div>
                                                <button type="button" @click="addCommand"
                                                    v-if="!readonlyFields.containers"
                                                    class="w-full px-3 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600">+
                                                    添加命令</button>
                                            </div>
                                        </div>

                                        <!-- 启动参数 -->
                                        <div v-show="false">
                                            <label class="block text-sm font-medium text-gray-700">启动参数</label>
                                            <div class="space-y-2">
                                                <div v-for="(arg, index) in container.args" :key="'arg-' + index"
                                                    class="flex gap-2">
                                                    <input v-model="container.args[index]" type="text"
                                                        :disabled="readonlyFields.containers"
                                                        class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                        placeholder="请输入参数">
                                                    <button type="button" @click="removeArg(index)"
                                                        v-if="!readonlyFields.containers"
                                                        class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                                </div>
                                                <button type="button" @click="addArg" v-if="!readonlyFields.containers"
                                                    class="w-full px-3 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600">+
                                                    添加参数</button>
                                            </div>
                                        </div>

                                        <!-- 端口配置 -->
                                        <div v-if="!readonlyFields.containers && container.ports.length">
                                            <label class="block text-sm font-medium text-gray-700 mb-2">端口配置</label>
                                            <div class="space-y-2">
                                                <div v-for="(port, index) in container.ports" :key="'port-' + index"
                                                    class="flex gap-2">
                                                    <input v-model.number="port.port" type="number" min="1" max="65535"
                                                        :disabled="readonlyFields.containers"
                                                        class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder="端口号">
                                                    <select v-model="port.protocol"
                                                        :disabled="readonlyFields.containers"
                                                        class="block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option v-for="option in getOptions('protocol')"
                                                            :key="option.dictValue" :value="option.dictValue">
                                                            {{ option.dictName }}
                                                        </option>
                                                    </select>
                                                    <button type="button" @click="removePort(index)"
                                                        v-if="!readonlyFields.containers"
                                                        class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                                </div>
                                                <button type="button" @click="addPort"
                                                    :disabled="readonlyFields.containers"
                                                    v-if="!readonlyFields.containers"
                                                    class="w-full px-3 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600">+
                                                    添加端口</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!-- 对话框底部 -->
                        <div class="el-dialog-footer-custom">
                            <!-- 价格信息 -->
                            <div class="el-price-info">
                                <span v-if="priceInfo.loading" class="el-price-loading">
                                    <span class="el-price-spinner"></span>
                                    查询价格中...
                                </span>
                                <span v-else-if="priceInfo.errorMsg" class="el-price-error">
                                    {{ priceInfo.errorMsg }}
                                </span>
                                <div v-else-if="priceInfo.isRange" class="el-price-text">
                                    <!-- <div>{{ priceInfo.minPrice }}~{{ priceInfo.maxPrice }} {{ priceInfo.currency }}/秒 </div> -->
                                    <div class="el-price-hour">{{ priceInfo.minPrice * 3600 }}~{{ priceInfo.maxPrice *
                                        3600 }} {{ priceInfo.currency }}/小时</div>
                                </div>
                                <div v-else class="el-price-text">
                                    <!-- <div>{{ priceInfo.minPrice }} {{ priceInfo.currency }}/秒</div> -->
                                    <div class="el-price-hour">{{ priceInfo.minPrice * 3600 }} {{ priceInfo.currency
                                    }}/小时</div>
                                </div>
                            </div>

                            <!-- 按钮组 -->
                            <div class="el-dialog-buttons">
                                <button @click="closeCreateDialog" :disabled="submitting" type="button"
                                    class="el-btn el-btn-default">
                                    取消
                                </button>
                                <button @click="submitCreate" :disabled="submitting || loadingDictOptions" type="button"
                                    class="el-btn el-btn-primary">
                                    <span v-if="submitting" class="el-btn-loading"></span>
                                    {{ submitting ? '创建中...' : '创建' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
module.exports = {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        apiBaseUrl: {
            type: String,
            required: true
        },
        containerScene: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            loadingDictOptions: false,
            submitting: false,
            dictOptions: [],
            // 表单数据
            formData: {
                channelCode: 'ALIYUN-CHEN',
                containerGroupName: '',
                regionId: '',
                vpcId: '',
                vSwitchId: '',
                securityGroupId: '',
                cpu: '',
                memory: '',
                instanceType: '',
                spotStrategy: '',
                spotPriceLimit: null,
                restartPolicy: '',
                autoMatchImageCache: 1
            },
            // 容器配置
            container: {
                name: '',
                image: '',
                imagePullPolicy: '',
                command: [],
                args: [],
                ports: []
            },
            // 价格信息
            priceInfo: {
                loading: false,
                currency: 'CNY',
                minPrice: 0,
                maxPrice: 0,
                errorMsg: "",
                isRange: false
            },
            // 只读字段映射
            readonlyFields: {
                channelCode: false,
                regionId: false,
                vpcId: false,
                vSwitchId: false,
                securityGroupId: false,
                cpu: false,
                memory: false,
                instanceType: false,
                spotStrategy: false,
                restartPolicy: false,
                imagePullPolicy: false,
                containerGroupName: false,
                containers: false
            }
        };
    },
    computed: {
        // 内存选项（根据CPU级联）
        memoryOptions: function () {
            if (!this.formData.cpu) return [];
            var cpuDict = this.dictOptions.find(function (d) { return d.dictCode === 'cpu'; });
            if (!cpuDict) return [];
            var cpuOption = cpuDict.options.find(function (o) { return o.dictValue === this.formData.cpu; });
            return cpuOption && cpuOption.children ? cpuOption.children : [];
        }
    },
    watch: {
        visible: function (newVal) {
            if (newVal) {
                this.resetForm();
                this.loadDictOptions();
            }
        },
        'formData.channelCode': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.regionId': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.vpcId': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.vSwitchId': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.securityGroupId': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.cpu': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.memory': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.instanceType': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.spotStrategy': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.spotPriceLimit': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.restartPolicy': function () {
            if (this.visible) {
                this.fetchContainerGroupPrice();
            }
        }
    },
    methods: {
        // 关闭创建对话框
        closeCreateDialog: function () {
            if (this.submitting) return;
            this.$emit('close');
        },
        // 处理对话框遮罩点击
        handleDialogMaskClick: function () {
            // 不允许点击遮罩关闭对话框，保持与之前逻辑一致
        },
        // 加载字典选项
        loadDictOptions: async function () {
            var self = this;
            self.loadingDictOptions = true;
            try {
                var response = await fetchWithToken(self.apiBaseUrl + '/tengu/instance/getContainerGroupDictOptions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "containerScene": this.containerScene
                    })
                });
                var result = await response.json();
                if (!response.ok) {
                    console.error('网络响应错误:', response.statusText);
                    window.$message('加载数据失败: ' + response.statusText, 'error');
                } else if (result.resultCode === 1 && result.data && result.data.dictOptions) {
                    self.dictOptions = result.data.dictOptions.sort(function (a, b) {
                        return (b.weight || 0) - (a.weight || 0);
                    });
                    // 自动填充默认值
                    self.applyDefaultValues();
                    // 设置为只读 readonly
                    self.applyReadonly();
                    // 加载默认值后查询价格
                    self.$nextTick(function () {
                        self.fetchContainerGroupPrice();
                    });
                } else {
                    window.$message('加载配置选项失败', 'error');
                }
            } catch (error) {
                console.error('加载字典选项失败:', error);
                window.$message('加载配置选项失败: ' + error.message, 'error');
            } finally {
                self.loadingDictOptions = false;
            }
        },
        // 获取字典选项
        getOptions: function (dictCode) {
            var dict = this.dictOptions.find(function (d) { return d.dictCode === dictCode; });
            if (!dict) return [];
            // 按weight排序
            return dict.options.sort(function (a, b) {
                return (b.weight || 0) - (a.weight || 0);
            });
        },
        // 重置表单
        resetForm: function () {
            this.formData = {
                channelCode: 'ALIYUN-CHEN',
                containerGroupName: '',
                regionId: '',
                vpcId: '',
                vSwitchId: '',
                securityGroupId: '',
                cpu: '',
                memory: '',
                instanceType: '',
                spotStrategy: '',
                spotPriceLimit: null,
                restartPolicy: '',
                autoMatchImageCache: 1
            };
            this.container = {
                name: '',
                image: '',
                imagePullPolicy: '',
                command: [],
                args: [],
                ports: []
            };
            // 重置只读字段状态
            this.readonlyFields = {
                channelCode: false,
                regionId: false,
                vpcId: false,
                vSwitchId: false,
                securityGroupId: false,
                cpu: false,
                memory: false,
                instanceType: false,
                spotStrategy: false,
                restartPolicy: false,
                imagePullPolicy: false,
                containers: false,
                containerGroupName: false
            };
        },
        // 提交创建
        submitCreate: async function () {
            var self = this;
            // 验证必填项
            if (!self.formData.regionId) {
                window.$message('请选择地域', 'warning');
                return;
            }
            if (!self.formData.spotStrategy) {
                window.$message('请选择付费模式', 'warning');
                return;
            }
            if (self.formData.spotStrategy === 'SpotWithPriceLimit' && !self.formData.spotPriceLimit) {
                window.$message('请输入价格上限', 'warning');
                return;
            }
            if (!self.formData.restartPolicy) {
                window.$message('请选择重启策略', 'warning');
                return;
            }
            if (!self.container.name) {
                window.$message('请输入容器名称', 'warning');
                return;
            }
            if (!self.container.image) {
                window.$message('请输入镜像地址', 'warning');
                return;
            }

            // 构建请求数据
            var requestData = {
                containerScene: self.containerScene,
                channelCode: self.formData.channelCode,
                regionId: self.formData.regionId,
                containerGroupName: self.formData.containerGroupName,
                vpcId: self.formData.vpcId,
                vSwitchId: self.formData.vSwitchId,
                securityGroupId: self.formData.securityGroupId,
                instanceType: self.formData.instanceType,
                spotStrategy: self.formData.spotStrategy,
                restartPolicy: self.formData.restartPolicy,
                autoMatchImageCache: self.formData.autoMatchImageCache,
                containers: [
                    {
                        name: self.container.name,
                        image: self.container.image
                    }
                ]
            };

            // 可选字段
            if (self.formData.cpu) {
                requestData.cpu = parseFloat(self.formData.cpu);
            }
            if (self.formData.memory) {
                requestData.memory = parseFloat(self.formData.memory);
            }
            if (self.formData.spotStrategy === 'SpotWithPriceLimit' && self.formData.spotPriceLimit) {
                requestData.spotPriceLimit = self.formData.spotPriceLimit;
            }
            if (self.container.imagePullPolicy) {
                requestData.containers[0].imagePullPolicy = self.container.imagePullPolicy;
            }
            if (self.container.command.length > 0) {
                requestData.containers[0].command = self.container.command.filter(function (cmd) {
                    return cmd.trim() !== '';
                });
            }
            if (self.container.args.length > 0) {
                requestData.containers[0].args = self.container.args.filter(function (arg) {
                    return arg.trim() !== '';
                });
            }
            if (self.container.ports.length > 0) {
                requestData.containers[0].ports = self.container.ports.filter(function (p) {
                    return p.port;
                });
            }


            self.submitting = true;
            try {
                var response = await fetchWithToken(self.apiBaseUrl + '/tengu/instance/createContainerGroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
                var result = await response.json();

                if (result.resultCode === 1) {
                    window.$message('创建成功！容器组ID: ' + (result.data && result.data.containerGroupId || ''), 'success');
                    // 触发创建成功事件
                    self.$emit('created', result.data);
                    setTimeout(function () {
                        self.closeCreateDialog();
                    }, 200);
                } else {
                    window.$message('创建失败: ' + (result.message || '未知错误'), 'error');
                }
            } catch (error) {
                console.error('创建容器组失败:', error);
                window.$message('创建失败: ' + error.message, 'error');
            } finally {
                self.submitting = false;
            }
        },
        // 查询容器组价格
        fetchContainerGroupPrice: async function () {
            clearTimeout(window._fetchPriceTimer__);
            window._fetchPriceTimer__ = setTimeout(() => {
                this.fetchContainerGroupPrice0()
            }, 200);
        },
        fetchContainerGroupPrice0: async function () {
            var self = this;
            // 构建请求数据 - 使用与 createContainerGroup 相同的参数
            var requestData = {
                containerScene: self.containerScene,
                channelCode: self.formData.channelCode,
                regionId: self.formData.regionId,
                containerGroupName: self.formData.containerGroupName,
                vpcId: self.formData.vpcId,
                vSwitchId: self.formData.vSwitchId,
                securityGroupId: self.formData.securityGroupId,
                instanceType: self.formData.instanceType,
                spotStrategy: self.formData.spotStrategy,
                restartPolicy: self.formData.restartPolicy,
                autoMatchImageCache: self.formData.autoMatchImageCache,
                containers: [
                    {
                        name: self.container.name,
                        image: self.container.image
                    }
                ]
            };

            // 可选字段
            if (self.formData.cpu) {
                requestData.cpu = parseFloat(self.formData.cpu);
            }
            if (self.formData.memory) {
                requestData.memory = parseFloat(self.formData.memory);
            }
            if (self.formData.spotStrategy === 'SpotWithPriceLimit' && self.formData.spotPriceLimit) {
                requestData.spotPriceLimit = self.formData.spotPriceLimit;
            }
            if (self.container.imagePullPolicy) {
                requestData.containers[0].imagePullPolicy = self.container.imagePullPolicy;
            }
            if (self.container.command.length > 0) {
                requestData.containers[0].command = self.container.command.filter(function (cmd) {
                    return cmd.trim() !== '';
                });
            }
            if (self.container.args.length > 0) {
                requestData.containers[0].args = self.container.args.filter(function (arg) {
                    return arg.trim() !== '';
                });
            }
            if (self.container.ports.length > 0) {
                requestData.containers[0].ports = self.container.ports.filter(function (p) {
                    return p.port;
                });
            }

            self.priceInfo.errorMsg = "";
            self.priceInfo.loading = true;
            try {
                var response = await fetchWithToken(self.apiBaseUrl + '/tengu/instance/describeContainerGroupPrice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                var result = await response.json();

                if (!response.ok) {
                    if (result.message) {
                        self.priceInfo.errorMsg = result.message;
                    } else {
                        self.priceInfo.errorMsg = "查询价格失败";
                    }
                } else if (result.resultCode === 1 && result.data && result.data.priceInfo) {
                    var priceInfo = result.data.priceInfo;
                    self.priceInfo.currency = priceInfo.currency || 'CNY';

                    // 判断是单一价格还是价格区间
                    if (priceInfo.spotPrices && Array.isArray(priceInfo.spotPrices) && priceInfo.spotPrices.length > 0) {
                        // 价格区间：从 spotPrices 中找出最低和最高的 spotPrice
                        var spotPrices = priceInfo.spotPrices.map(function (item) {
                            return item.spotPrice;
                        });
                        self.priceInfo.minPrice = Math.min.apply(Math, spotPrices);
                        self.priceInfo.maxPrice = Math.max.apply(Math, spotPrices);
                        self.priceInfo.isRange = self.priceInfo.minPrice !== self.priceInfo.maxPrice;
                    } else if (priceInfo.tradePrice !== undefined) {
                        // 单一价格
                        self.priceInfo.minPrice = priceInfo.tradePrice;
                        self.priceInfo.maxPrice = priceInfo.tradePrice;
                        self.priceInfo.isRange = false;
                    } else {
                        // 没有价格信息，重置
                        self.priceInfo.minPrice = 0;
                        self.priceInfo.maxPrice = 0;
                        self.priceInfo.isRange = false;
                    }
                } else {
                    console.error('查询价格失败:', result);
                    // 失败时重置价格
                    self.priceInfo.minPrice = 0;
                    self.priceInfo.maxPrice = 0;
                    self.priceInfo.isRange = false;
                }
            } catch (error) {
                self.priceInfo.errorMsg = error;
                console.error('查询价格失败:', error);
                // 失败时重置价格
                self.priceInfo.minPrice = 0;
                self.priceInfo.maxPrice = 0;
                self.priceInfo.isRange = false;
            } finally {
                self.priceInfo.loading = false;
            }
        },
        // CPU改变时重置内存
        onCpuChange: function () {
            this.formData.memory = '';
        },
        // 付费模式改变
        onSpotStrategyChange: function () {
            if (this.formData.spotStrategy !== 'SpotWithPriceLimit') {
                this.formData.spotPriceLimit = null;
            }
        },
        // 添加命令
        addCommand: function () {
            this.container.command.push('');
        },
        // 删除命令
        removeCommand: function (index) {
            this.container.command.splice(index, 1);
        },
        // 添加参数
        addArg: function () {
            this.container.args.push('');
        },
        // 删除参数
        removeArg: function (index) {
            this.container.args.splice(index, 1);
        },
        // 添加端口
        addPort: function () {
            this.container.ports.push({
                port: null,
                protocol: 'TCP'
            });
        },
        // 删除端口
        removePort: function (index) {
            this.container.ports.splice(index, 1);
        },
        // 设置为只读 readonly
        applyReadonly: function () {
            var self = this;
            self.dictOptions.forEach(function (dict) {
                if (dict.readonly) {
                    // 根据dictCode设置对应字段为只读
                    switch (dict.dictCode) {
                        case 'regionId':
                            self.readonlyFields.regionId = true;
                            break;
                        case 'channelCode':
                            self.readonlyFields.channelCode = true;
                            break;
                        case 'vpcId':
                            self.readonlyFields.vpcId = true;
                            break;
                        case 'vSwitchId':
                            self.readonlyFields.vSwitchId = true;
                            break;
                        case 'securityGroupId':
                            self.readonlyFields.securityGroupId = true;
                            break;
                        case 'cpu':
                            self.readonlyFields.cpu = true;
                            break;
                        case 'memory':
                            self.readonlyFields.memory = true;
                            break;
                        case 'instanceType':
                            self.readonlyFields.instanceType = true;
                            break;
                        case 'spotStrategy':
                            self.readonlyFields.spotStrategy = true;
                            break;
                        case 'restartPolicy':
                            self.readonlyFields.restartPolicy = true;
                            break;
                        case 'imagePullPolicy':
                            self.readonlyFields.imagePullPolicy = true;
                            break;
                        case 'containerGroupName':
                            self.readonlyFields.containerGroupName = true;
                            break;
                        case 'containers':
                            self.readonlyFields.containers = true;
                            break;
                    }
                }
            });
        },
        // 应用默认值
        applyDefaultValues: function () {
            var self = this;
            self.dictOptions.forEach(function (dict) {
                if (dict.defaultOptionsDictValue) {
                    // 根据dictCode设置对应的formData字段
                    switch (dict.dictCode) {
                        case 'regionId':
                            self.formData.regionId = dict.defaultOptionsDictValue;
                            break;
                        case 'channelCode':
                            self.formData.channelCode = dict.defaultOptionsDictValue;
                            break;
                        case 'vpcId':
                            self.formData.vpcId = dict.defaultOptionsDictValue;
                            break;
                        case 'vSwitchId':
                            self.formData.vSwitchId = dict.defaultOptionsDictValue;
                            break;
                        case 'securityGroupId':
                            self.formData.securityGroupId = dict.defaultOptionsDictValue;
                            break;
                        case 'cpu':
                            self.formData.cpu = dict.defaultOptionsDictValue;
                            // CPU改变时需要更新内存选项
                            self.updateMemoryOptionsForDefaultCpu(dict.defaultOptionsDictValue);
                            break;
                        case 'instanceType':
                            self.formData.instanceType = dict.defaultOptionsDictValue;
                            break;
                        case 'spotStrategy':
                            self.formData.spotStrategy = dict.defaultOptionsDictValue;
                            break;
                        case 'restartPolicy':
                            self.formData.restartPolicy = dict.defaultOptionsDictValue;
                            break;
                        case 'imagePullPolicy':
                            self.container.imagePullPolicy = dict.defaultOptionsDictValue;
                            break;
                        case 'containerGroupName':
                            self.formData.containerGroupName = dict.defaultOptionsDictValue;
                            break;
                    }
                }

                // 处理容器列表的默认值
                if (dict.dictCode === 'containers' && dict.options && dict.options.length > 0) {
                    //目前只处理第一个容器的默认值
                    var containerOption = dict.options[0];
                    if (containerOption.defaultOptionsDictValue) {
                        self.applyContainerDefaultValues(containerOption.defaultOptionsDictValue);
                    }
                }
            });
        },
        // 应用容器默认值
        applyContainerDefaultValues: function (containerDefaults) {
            if (containerDefaults.name) {
                this.container.name = containerDefaults.name;
            }
            if (containerDefaults.image) {
                this.container.image = containerDefaults.image;
            }
            if (containerDefaults.imagePullPolicy) {
                this.container.imagePullPolicy = containerDefaults.imagePullPolicy;
            }
            if (containerDefaults.command && Array.isArray(containerDefaults.command)) {
                this.container.command = containerDefaults.command.slice();
            }
            if (containerDefaults.args && Array.isArray(containerDefaults.args)) {
                this.container.args = containerDefaults.args.slice();
            }
            if (containerDefaults.ports && Array.isArray(containerDefaults.ports)) {
                this.container.ports = containerDefaults.ports.map(function (port) {
                    return {
                        port: port.port || null,
                        protocol: port.protocol || 'TCP'
                    };
                });
            }
        },
        // 为默认CPU更新内存选项
        updateMemoryOptionsForDefaultCpu: function (cpuValue) {
            var cpuDict = this.dictOptions.find(function (d) { return d.dictCode === 'cpu'; });
            if (cpuDict) {
                var cpuOption = cpuDict.options.find(function (o) { return o.dictValue === cpuValue; });
                if (cpuOption && cpuOption.children && cpuOption.children.length > 0) {
                    // 自动选择第一个内存选项（weight最高的）
                    var sortedMemory = cpuOption.children.sort(function (a, b) {
                        return (b.weight || 0) - (a.weight || 0);
                    });
                    this.formData.memory = sortedMemory[0].dictValue;
                }
            }
        }
    }
};
</script>
