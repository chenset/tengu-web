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
    color: #303133;
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
    <div class="container mx-auto p-6">
        <!-- 头部操作栏 -->
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900">容器组管理</h1>
            <button @click="openCreateDialog"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                创建实例
            </button>
        </div>

        <!-- 筛选条件 -->
        <div class="mb-4 bg-white rounded-lg shadow p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- 地域多选 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">地域</label>
                    <div class="relative" ref="regionDropdown">
                        <div @click.stop="toggleRegionDropdown"
                            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white cursor-pointer hover:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[38px]">
                            <div class="flex flex-wrap gap-1">
                                <span v-for="regionId in filterParams.regionIdList" :key="regionId"
                                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {{ getRegionLabel(regionId) }}
                                    <button type="button" @click.stop="removeRegion(regionId)"
                                        class="ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 rounded-full">
                                        ×
                                    </button>
                                </span>
                                <span v-if="filterParams.regionIdList.length === 0" class="text-gray-400">请选择地域</span>
                            </div>
                        </div>
                        <div v-if="showRegionDropdown"
                            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                            @click.stop>
                            <div v-for="option in regionOptions" :key="option.value" @click="toggleRegion(option.value)"
                                class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" :checked="filterParams.regionIdList.includes(option.value)"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 pointer-events-none">
                                <span class="text-sm text-gray-900">{{ option.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 状态多选 -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">容器状态</label>
                    <div class="relative" ref="statusDropdown">
                        <div @click.stop="toggleStatusDropdown"
                            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white cursor-pointer hover:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[38px]">
                            <div class="flex flex-wrap gap-1">
                                <span v-for="status in filterParams.containerGroupStatusList" :key="status"
                                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {{ getStatusLabel(status) }}
                                    <button type="button" @click.stop="removeStatus(status)"
                                        class="ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 rounded-full">
                                        ×
                                    </button>
                                </span>
                                <span v-if="filterParams.containerGroupStatusList.length === 0"
                                    class="text-gray-400">请选择状态</span>
                            </div>
                        </div>
                        <div v-if="showStatusDropdown"
                            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                            @click.stop>
                            <div v-for="option in statusOptions" :key="option.value" @click="toggleStatus(option.value)"
                                class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100">
                                <input type="checkbox"
                                    :checked="filterParams.containerGroupStatusList.includes(option.value)"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 pointer-events-none">
                                <span class="text-sm text-gray-900">{{ option.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-end">
                    <button @click="loadTableData"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        查询
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow">
            <!-- 加载状态 -->
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p class="mt-4 text-sm text-gray-500">加载中...</p>
            </div>

            <!-- 空状态 -->
            <div v-else-if="tableData.length === 0" class="text-center py-12">
                <p class="text-gray-500">暂无数据</p>
            </div>

            <!-- 表格容器 -->
            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                容器组ID/名称</th>
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                标签</th> -->
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                用户</th> -->
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                订单状态</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                容器状态</th>
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                事件</th> -->
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                规格</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                所在可用区</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                创建时间</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                安全组/虚拟交换机</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in this.tableData" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ item.containerGroupId }}</div>
                                <div class="text-sm text-gray-500">{{ item.containerGroupName }}</div>
                            </td>
                            <!-- <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 tex「方案选单」t-blue-800">
                                    {{ item.tag }}
                                </span>
                            </td> -->
                            <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.user }}</td> -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(item.status)"
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                    {{ item.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(item.containerGroupStatus)"
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                    {{ item.containerGroupStatus }}
                                </span>
                            </td>
                            <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.event }}</td> -->
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.spec }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.zone }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.createTime }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ item.securityGroup }}</div>
                                <div class="text-sm text-gray-500">{{ item.vSwitch }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <!-- <button @click="viewDetail(item)" -->
                                <!-- class="text-indigo-600 hover:text-indigo-900 mr-3">详情</button> -->
                                <button @click="openItem(item)"
                                    class="text-green-600 hover:text-green-900 mr-3">打开</button>
                                <button @click="refreshItem(item)"
                                    class="text-blue-600 hover:text-blue-900 mr-3">刷新</button>
                                <button @click="releaseItem(item)" class="text-red-600 hover:text-red-900">释放</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 分页组件 -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="flex-1 flex justify-between sm:hidden">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        上一页
                    </button>
                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        下一页
                    </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            第 <span class="font-medium">{{ startItem }}</span> 到 <span class="font-medium">{{ endItem
                            }}</span> 条，
                            共 <span class="font-medium">{{ totalItems }}</span> 条
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button @click="prevPage" :disabled="currentPage === 1"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                上一页
                            </button>
                            <button v-for="page in displayPages" :key="page" @click="goToPage(page)"
                                :class="page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                {{ page }}
                            </button>
                            <button @click="nextPage" :disabled="currentPage === totalPages"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                下一页
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <!-- 创建实例对话框 - Element Plus 风格 -->
        <transition name="el-dialog-fade">
            <div v-if="showCreateDialog" class="el-dialog-overlay" @click="handleDialogMaskClick">
                <div class="el-dialog-wrapper" @click.stop>
                    <div class="el-create-dialog-container">
                        <!-- 对话框头部 -->
                        <div class="el-dialog-header-custom">
                            <span class="el-dialog-title-custom">创建容器组实例</span>
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
                            <!-- 基础配置 -->
                            <div class="border-b pb-4">
                                <h4 class="text-md font-semibold text-gray-700 mb-3">基础配置</h4>
                                <div class="grid grid-cols-1 gap-4">
                                    <!-- 容器组名称 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">容器组名称 <span
                                                class="text-red-500">*</span></label>
                                        <input v-model="formData.containerGroupName" type="text" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="请输入容器组名称">
                                    </div>

                                    <!-- 选择通道账号 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">通道账号选择 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.channelCode" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option>请选择通道账号</option>
                                            <option v-for="option in getOptions('channelCode')" :key="option.dictValue"
                                                :value="option.dictValue">
                                                {{ option.dictName }} <span v-if="option.remark"
                                                    class="text-gray-500">({{ option.remark }})</span>
                                            </option>
                                        </select>
                                    </div>

                                    <!-- 地域选择 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">地域选择 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.regionId" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                                        <select v-model="formData.vpcId" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                                        <select v-model="formData.vSwitchId" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">请选择交换机</option>
                                            <option v-for="option in getOptions('vSwitchId')" :key="option.dictValue"
                                                :value="option.dictValue">
                                                {{ option.dictName }} <span v-if="option.remark"
                                                    class="text-gray-500">({{ option.remark }})</span>
                                            </option>
                                        </select>
                                    </div>

                                    <!-- 安全组 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">安全组 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.securityGroupId" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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

                            <!-- 规格配置 -->
                            <div class="border-b pb-4">
                                <h4 class="text-md font-semibold text-gray-700 mb-3">规格配置</h4>
                                <div class="grid grid-cols-2 gap-4">
                                    <!-- CPU规格 -->
                                    <div>
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
                                    </div>

                                    <!-- 内存规格（级联） -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">内存规格</label>
                                        <select v-model="formData.memory" :disabled="!formData.cpu"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100">
                                            <option value="">请选择内存</option>
                                            <option v-for="option in memoryOptions" :key="option.dictValue"
                                                :value="option.dictValue">
                                                {{ option.dictName }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- ECS实例规格 -->
                                    <div class="col-span-2">
                                        <label class="block text-sm font-medium text-gray-700">ECS实例规格 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.instanceType" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">请选择实例规格</option>
                                            <option v-for="option in getOptions('instanceType')" :key="option.dictValue"
                                                :value="option.dictValue">
                                                {{ option.dictName }} <span v-if="option.remark"
                                                    class="text-gray-500">({{ option.remark }})</span>
                                            </option>
                                        </select>
                                    </div>

                                    <!-- 付费模式 -->
                                    <div class="col-span-2">
                                        <label class="block text-sm font-medium text-gray-700">付费模式 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.spotStrategy" @change="onSpotStrategyChange" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">请选择付费模式</option>
                                            <option v-for="option in getOptions('spotStrategy')" :key="option.dictValue"
                                                :value="option.dictValue">
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
                                    <div class="col-span-2">
                                        <label class="block text-sm font-medium text-gray-700">重启策略 <span
                                                class="text-red-500">*</span></label>
                                        <select v-model="formData.restartPolicy" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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

                            <!-- 容器配置 -->
                            <div>
                                <h4 class="text-md font-semibold text-gray-700 mb-3">容器配置</h4>
                                <div class="space-y-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                                    <!-- 容器名称 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">容器名称 <span
                                                class="text-red-500">*</span></label>
                                        <input v-model="container.name" type="text" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="请输入容器名称">
                                    </div>

                                    <!-- 镜像 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">镜像地址 <span
                                                class="text-red-500">*</span></label>
                                        <input v-model="container.image" type="text" required
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="请输入镜像地址">
                                    </div>

                                    <!-- 镜像拉取策略 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">镜像拉取策略</label>
                                        <select v-model="container.imagePullPolicy"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">请选择拉取策略</option>
                                            <option v-for="option in getOptions('imagePullPolicy')"
                                                :key="option.dictValue" :value="option.dictValue">
                                                {{ option.dictName }} <span v-if="option.remark"
                                                    class="text-gray-500">({{ option.remark }})</span>
                                            </option>
                                        </select>
                                    </div>

                                    <!-- 启动命令 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">启动命令</label>
                                        <div class="space-y-2">
                                            <div v-for="(cmd, index) in container.command" :key="'cmd-' + index"
                                                class="flex gap-2">
                                                <input v-model="container.command[index]" type="text"
                                                    class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="请输入命令">
                                                <button type="button" @click="removeCommand(index)"
                                                    class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                            </div>
                                            <button type="button" @click="addCommand"
                                                class="w-full px-3 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600">+
                                                添加命令</button>
                                        </div>
                                    </div>

                                    <!-- 启动参数 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">启动参数</label>
                                        <div class="space-y-2">
                                            <div v-for="(arg, index) in container.args" :key="'arg-' + index"
                                                class="flex gap-2">
                                                <input v-model="container.args[index]" type="text"
                                                    class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="请输入参数">
                                                <button type="button" @click="removeArg(index)"
                                                    class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                            </div>
                                            <button type="button" @click="addArg"
                                                class="w-full px-3 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600">+
                                                添加参数</button>
                                        </div>
                                    </div>

                                    <!-- 端口配置 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">端口配置</label>
                                        <div class="space-y-2">
                                            <div v-for="(port, index) in container.ports" :key="'port-' + index"
                                                class="flex gap-2">
                                                <input v-model.number="port.port" type="number" min="1" max="65535"
                                                    class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="端口号">
                                                <select v-model="port.protocol"
                                                    class="block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option v-for="option in getOptions('protocol')"
                                                        :key="option.dictValue" :value="option.dictValue">
                                                        {{ option.dictName }}
                                                    </option>
                                                </select>
                                                <button type="button" @click="removePort(index)"
                                                    class="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">删除</button>
                                            </div>
                                            <button type="button" @click="addPort"
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
                                    <div>{{ priceInfo.minPrice }}~{{ priceInfo.maxPrice }} {{ priceInfo.currency }}/秒</div>
                                    <div class="el-price-hour">{{ priceInfo.minPrice * 3600 }}~{{ priceInfo.maxPrice * 3600 }} {{ priceInfo.currency }}/小时</div>
                                </div>
                                <div v-else class="el-price-text">
                                    <div>{{ priceInfo.minPrice }} {{ priceInfo.currency }}/秒</div>
                                    <div class="el-price-hour">{{ priceInfo.minPrice * 3600 }} {{ priceInfo.currency }}/小时</div>
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
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            totalItems: 0,
            loading: false,
            // 筛选参数
            filterParams: {
                regionIdList: [],
                containerGroupStatusList: ['Running', 'Pending', 'Scheduling', 'Updating', 'Terminating', 'Restarting']
            },
            // 下拉菜单状态
            showRegionDropdown: false,
            showStatusDropdown: false,
            // 地域选项
            regionOptions: [
                { value: 'cn-shenzhen', label: '华南1-深圳' },
                { value: 'cn-beijing', label: '华北2-北京' },
                { value: 'cn-hangzhou', label: '华东1-杭州' }
            ],
            // 状态选项
            statusOptions: [
                { value: 'Pending', label: '启动中' },
                { value: 'Running', label: '运行中' },
                { value: 'Succeeded', label: '运行成功' },
                { value: 'Failed', label: '运行失败' },
                { value: 'Scheduling', label: '创建中' },
                { value: 'ScheduleFailed', label: '创建失败' },
                { value: 'Restarting', label: '重启中' },
                { value: 'Updating', label: '更新中' },
                { value: 'Terminating', label: '终止中' },
                { value: 'Expired', label: '过期' },
                { value: 'Terminated', label: '已终止' }
            ],
            // 创建对话框相关
            showCreateDialog: false,
            loadingDictOptions: false,
            submitting: false,
            dictOptions: [],
            // 表单数据
            formData: {
                channelCode: 'ALIYUN-CHEN',
                containerGroupName: '',
                regionId: '',
                channelCode: '',
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
                isRange: false // 是否是价格区间
            }
        }
    },
    computed: {
        // 总页数
        totalPages() {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        // 当前页起始条数
        startItem() {
            return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
        },
        // 当前页结束条数
        endItem() {
            return Math.min(this.currentPage * this.pageSize, this.totalItems);
        },
        // 显示的页码
        displayPages() {
            const pages = [];
            const maxDisplay = 5; // 最多显示5个页码
            let start = Math.max(1, this.currentPage - Math.floor(maxDisplay / 2));
            let end = Math.min(this.totalPages, start + maxDisplay - 1);

            if (end - start < maxDisplay - 1) {
                start = Math.max(1, end - maxDisplay + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        // 内存选项（根据CPU级联）
        memoryOptions() {
            if (!this.formData.cpu) return [];
            const cpuDict = this.dictOptions.find(d => d.dictCode === 'cpu');
            if (!cpuDict) return [];
            const cpuOption = cpuDict.options.find(o => o.dictValue === this.formData.cpu);
            return cpuOption && cpuOption.children ? cpuOption.children : [];
        },
        // API基础URL
        apiBaseUrl() {
            // let u = window.location.origin;

            let u = "http://127.0.0.1:44056"

            if (window.location.port == '8551') {
                //邵含的本地开发机器
                u = "/"
            }

            if (u.endsWith('/')) {
                return u.slice(0, -1);
            }
            return u;
        }
    },
    watch: {
        // 监听表单关键字段变化，重新查询价格
        'formData.channelCode'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.regionId'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.vpcId'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.vSwitchId'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.securityGroupId'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.cpu'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.memory'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.instanceType'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.spotStrategy'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.spotPriceLimit'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        },
        'formData.restartPolicy'() {
            if (this.showCreateDialog) {
                this.fetchContainerGroupPrice();
            }
        }
    },
    mounted() {
        this.loadTableData();
        // 添加全局点击事件监听器
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        // 移除全局点击事件监听器
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        // 处理点击外部区域
        handleClickOutside(event) {
            // 检查地域下拉框
            if (this.$refs.regionDropdown && !this.$refs.regionDropdown.contains(event.target)) {
                this.showRegionDropdown = false;
            }
            // 检查状态下拉框
            if (this.$refs.statusDropdown && !this.$refs.statusDropdown.contains(event.target)) {
                this.showStatusDropdown = false;
            }
        },
        // 地域多选相关方法
        toggleRegionDropdown() {
            this.showRegionDropdown = !this.showRegionDropdown;
            this.showStatusDropdown = false;
        },
        closeRegionDropdown() {
            this.showRegionDropdown = false;
        },
        toggleRegion(value) {
            const index = this.filterParams.regionIdList.indexOf(value);
            if (index > -1) {
                this.filterParams.regionIdList.splice(index, 1);
            } else {
                this.filterParams.regionIdList.push(value);
            }
            this.handleFilterChange();
        },
        removeRegion(value) {
            const index = this.filterParams.regionIdList.indexOf(value);
            if (index > -1) {
                this.filterParams.regionIdList.splice(index, 1);
                this.handleFilterChange();
            }
        },
        getRegionLabel(value) {
            const option = this.regionOptions.find(opt => opt.value === value);
            return option ? option.label : value;
        },
        // 状态多选相关方法
        toggleStatusDropdown() {
            this.showStatusDropdown = !this.showStatusDropdown;
            this.showRegionDropdown = false;
        },
        closeStatusDropdown() {
            this.showStatusDropdown = false;
        },
        toggleStatus(value) {
            const index = this.filterParams.containerGroupStatusList.indexOf(value);
            if (index > -1) {
                this.filterParams.containerGroupStatusList.splice(index, 1);
            } else {
                this.filterParams.containerGroupStatusList.push(value);
            }
            this.handleFilterChange();
        },
        removeStatus(value) {
            const index = this.filterParams.containerGroupStatusList.indexOf(value);
            if (index > -1) {
                this.filterParams.containerGroupStatusList.splice(index, 1);
                this.handleFilterChange();
            }
        },
        getStatusLabel(value) {
            const option = this.statusOptions.find(opt => opt.value === value);
            return option ? option.label : value;
        },
        // 加载列表数据
        async loadTableData() {
            this.loading = true;

            try {
                const requestBody = {
                    page: this.currentPage,
                    rows: this.pageSize
                };

                // 添加可选筛选条件
                if (this.filterParams.regionIdList && this.filterParams.regionIdList.length > 0) {
                    requestBody.regionIdList = this.filterParams.regionIdList;
                }
                if (this.filterParams.containerGroupStatusList && this.filterParams.containerGroupStatusList.length > 0) {
                    requestBody.containerGroupStatusList = this.filterParams.containerGroupStatusList;
                }

                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/describeContainerGroupPage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const result = await response.json();
                this.tableData = [];// 清空数据以防止旧数据残留
                if (result.resultCode === 1 && result.data) {
                    this.tableData = this.formatTableData(result.data.rows || []);
                    this.totalItems = result.data.total || 0;
                } else {
                    console.error('加载数据失败:', result);
                    this.tableData = [];
                    this.totalItems = 0;
                }
            } catch (error) {
                console.error('加载列表数据失败:', error);
                window.$message('加载数据失败: ' + error.message, 'error');
                this.tableData = [];
                this.totalItems = 0;
            } finally {
                this.loading = false;
            }
        },
        // 格式化表格数据
        formatTableData(rows) {
            return rows.map(item => ({
                id: item.id || '',
                containerGroupId: item.containerGroupId || '',
                containerGroupName: item.containerGroupName || '',
                tag: this.formatRegion(item.regionId),
                user: item.email || '-',
                containerGroupStatus: this.formatStatus(item.containerGroupStatus),
                status: this.formatStatus(item.status),
                event: '-',
                spec: this.formatSpec(item.cpu, item.memory, item.instanceType),
                zone: this.formatRegion(item.regionId),
                createTime: this.formatTime(item.createTime),
                securityGroup: item.securityGroupId || '-',
                vSwitch: item.vswitchId || '-',
                rawData: item // 保存原始数据
            }));
        },
        // 格式化地域
        formatRegion(regionId) {
            const regionMap = {
                'cn-shenzhen': '华南1-深圳',
                'cn-beijing': '华北2-北京',
                'cn-hangzhou': '华东1-杭州'
            };
            return regionMap[regionId] || regionId;
        },
        // 格式化状态
        formatStatus(status) {
            const statusMap = {
                'Pending': '启动中',
                'Running': '运行中',
                'Succeeded': '运行成功',
                'Failed': '运行失败',
                'Scheduling': '创建中',
                'ScheduleFailed': '创建失败',
                'Restarting': '重启中',
                'Updating': '更新中',
                'Terminating': '终止中',
                'Expired': '过期',
                'Terminated': '已终止'
            };
            return statusMap[status] || status;
        },
        // 格式化规格
        formatSpec(cpu, memory, instanceType) {
            if (cpu && memory) {
                return `${cpu}核${memory}G`;
            }
            return instanceType || '-';
        },
        // 格式化时间
        formatTime(timestamp) {
            if (!timestamp) return '-';
            const date = new Date(timestamp);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        },
        // 筛选条件改变
        handleFilterChange() {
            this.currentPage = 1;
            this.loadTableData();
        },
        // 获取字典选项
        getOptions(dictCode) {
            const dict = this.dictOptions.find(d => d.dictCode === dictCode);
            if (!dict) return [];
            // 按weight排序
            return dict.options.sort((a, b) => (b.weight || 0) - (a.weight || 0));
        },
        // 打开创建对话框
        async openCreateDialog() {
            this.showCreateDialog = true;
            this.resetForm();
            await this.loadDictOptions();
            // 加载默认值后查询价格
            this.$nextTick(() => {
                this.fetchContainerGroupPrice();
            });
        },
        // 关闭创建对话框
        closeCreateDialog() {
            if (this.submitting) return;
            this.showCreateDialog = false;
            this.resetForm();
        },
        // 处理对话框遮罩点击
        handleDialogMaskClick() {
            // 不允许点击遮罩关闭对话框，保持与之前逻辑一致
            // 如果需要点击遮罩关闭，可以调用 closeCreateDialog()
        },
        // 重置表单
        resetForm() {
            this.formData = {
                channelCode: 'ALIYUN-CHEN',
                containerGroupName: '',
                regionId: '',
                channelCode: '',
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
        },
        // 加载字典选项
        async loadDictOptions() {
            this.loadingDictOptions = true;
            try {
                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/getContainerGroupDictOptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                const result = await response.json();
                if (result.resultCode === 1 && result.data && result.data.dictOptions) {
                    this.dictOptions = result.data.dictOptions.sort((a, b) => (b.weight || 0) - (a.weight || 0));
                    // 自动填充默认值
                    this.applyDefaultValues();
                } else {
                    window.$message('加载配置选项失败', 'error');
                }
            } catch (error) {
                console.error('加载字典选项失败:', error);
                window.$message('加载配置选项失败: ' + error.message, 'error');
            } finally {
                this.loadingDictOptions = false;
            }
        },
        // 应用默认值
        applyDefaultValues() {
            this.dictOptions.forEach(dict => {
                if (dict.defaultOptionsDictValue) {
                    // 根据dictCode设置对应的formData字段
                    switch (dict.dictCode) {
                        case 'regionId':
                            this.formData.regionId = dict.defaultOptionsDictValue;
                            break;
                        case 'channelCode':
                            this.formData.channelCode = dict.defaultOptionsDictValue;
                            break;
                        case 'vpcId':
                            this.formData.vpcId = dict.defaultOptionsDictValue;
                            break;
                        case 'vSwitchId':
                            this.formData.vSwitchId = dict.defaultOptionsDictValue;
                            break;
                        case 'securityGroupId':
                            this.formData.securityGroupId = dict.defaultOptionsDictValue;
                            break;
                        case 'cpu':
                            this.formData.cpu = dict.defaultOptionsDictValue;
                            // CPU改变时需要更新内存选项
                            this.updateMemoryOptionsForDefaultCpu(dict.defaultOptionsDictValue);
                            break;
                        case 'instanceType':
                            this.formData.instanceType = dict.defaultOptionsDictValue;
                            break;
                        case 'spotStrategy':
                            this.formData.spotStrategy = dict.defaultOptionsDictValue;
                            break;
                        case 'restartPolicy':
                            this.formData.restartPolicy = dict.defaultOptionsDictValue;
                            break;
                        case 'imagePullPolicy':
                            this.container.imagePullPolicy = dict.defaultOptionsDictValue;
                            break;
                        case 'containerGroupName':
                            this.formData.containerGroupName = dict.defaultOptionsDictValue;
                            break;
                    }
                }

                // 处理容器列表的默认值
                if (dict.dictCode === 'containers' && dict.options && dict.options.length > 0) {
                    //目前只处理第一个容器的默认值
                    const containerOption = dict.options[0];
                    if (containerOption.defaultOptionsDictValue) {
                        this.applyContainerDefaultValues(containerOption.defaultOptionsDictValue);
                    }
                }
            });
        },
        // 应用容器默认值
        applyContainerDefaultValues(containerDefaults) {
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
                this.container.command = [...containerDefaults.command];
            }
            if (containerDefaults.args && Array.isArray(containerDefaults.args)) {
                this.container.args = [...containerDefaults.args];
            }
            if (containerDefaults.ports && Array.isArray(containerDefaults.ports)) {
                this.container.ports = containerDefaults.ports.map(port => ({
                    port: port.port || null,
                    protocol: port.protocol || 'TCP'
                }));
            }
        },
        // 为默认CPU更新内存选项
        updateMemoryOptionsForDefaultCpu(cpuValue) {
            const cpuDict = this.dictOptions.find(d => d.dictCode === 'cpu');
            if (cpuDict) {
                const cpuOption = cpuDict.options.find(o => o.dictValue === cpuValue);
                if (cpuOption && cpuOption.children && cpuOption.children.length > 0) {
                    // 自动选择第一个内存选项（weight最高的）
                    const sortedMemory = cpuOption.children.sort((a, b) => (b.weight || 0) - (a.weight || 0));
                    this.formData.memory = sortedMemory[0].dictValue;
                }
            }
        },
        // CPU改变时重置内存
        onCpuChange() {
            this.formData.memory = '';
        },
        // 付费模式改变
        onSpotStrategyChange() {
            if (this.formData.spotStrategy !== 'SpotWithPriceLimit') {
                this.formData.spotPriceLimit = null;
            }
        },
        // 添加命令
        addCommand() {
            this.container.command.push('');
        },
        // 删除命令
        removeCommand(index) {
            this.container.command.splice(index, 1);
        },
        // 添加参数
        addArg() {
            this.container.args.push('');
        },
        // 删除参数
        removeArg(index) {
            this.container.args.splice(index, 1);
        },
        // 添加端口
        addPort() {
            this.container.ports.push({
                port: null,
                protocol: 'TCP'
            });
        },
        // 删除端口
        removePort(index) {
            this.container.ports.splice(index, 1);
        },
        // 提交创建
        async submitCreate() {
            // 验证必填项
            if (!this.formData.containerGroupName) {
                window.$message('请输入容器组名称', 'warning');
                return;
            }
            if (!this.formData.regionId) {
                window.$message('请选择地域', 'warning');
                return;
            }
            // if (!this.formData.vpcId) {
            //     window.$message('请选择专有网络', 'warning');
            //     return;
            // }
            // if (!this.formData.vSwitchId) {
            //     window.$message('请选择交换机', 'warning');
            //     return;
            // }
            // if (!this.formData.securityGroupId) {
            //     window.$message('请选择安全组', 'warning');
            //     return;
            // }
            if (!this.formData.instanceType) {
                window.$message('请选择ECS实例规格', 'warning');
                return;
            }
            if (!this.formData.spotStrategy) {
                window.$message('请选择付费模式', 'warning');
                return;
            }
            if (this.formData.spotStrategy === 'SpotWithPriceLimit' && !this.formData.spotPriceLimit) {
                window.$message('请输入价格上限', 'warning');
                return;
            }
            if (!this.formData.restartPolicy) {
                window.$message('请选择重启策略', 'warning');
                return;
            }
            if (!this.container.name) {
                window.$message('请输入容器名称', 'warning');
                return;
            }
            if (!this.container.image) {
                window.$message('请输入镜像地址', 'warning');
                return;
            }

            // 构建请求数据
            const requestData = {
                channelCode: this.formData.channelCode,
                regionId: this.formData.regionId,
                channelCode: this.formData.channelCode,
                containerGroupName: this.formData.containerGroupName,
                vpcId: this.formData.vpcId,
                vSwitchId: this.formData.vSwitchId,
                securityGroupId: this.formData.securityGroupId,
                instanceType: this.formData.instanceType,
                spotStrategy: this.formData.spotStrategy,
                restartPolicy: this.formData.restartPolicy,
                autoMatchImageCache: this.formData.autoMatchImageCache,
                containers: [
                    {
                        name: this.container.name,
                        image: this.container.image
                    }
                ]
            };

            // 可选字段
            if (this.formData.cpu) {
                requestData.cpu = parseFloat(this.formData.cpu);
            }
            if (this.formData.memory) {
                requestData.memory = parseFloat(this.formData.memory);
            }
            if (this.formData.spotStrategy === 'SpotWithPriceLimit' && this.formData.spotPriceLimit) {
                requestData.spotPriceLimit = this.formData.spotPriceLimit;
            }
            if (this.container.imagePullPolicy) {
                requestData.containers[0].imagePullPolicy = this.container.imagePullPolicy;
            }
            if (this.container.command.length > 0) {
                requestData.containers[0].command = this.container.command.filter(cmd => cmd.trim() !== '');
            }
            if (this.container.args.length > 0) {
                requestData.containers[0].args = this.container.args.filter(arg => arg.trim() !== '');
            }
            if (this.container.ports.length > 0) {
                requestData.containers[0].ports = this.container.ports.filter(p => p.port);
            }

            this.submitting = true;
            try {
                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/createContainerGroup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
                const result = await response.json();

                if (result.resultCode === 1) {
                    window.$message('创建成功！容器组ID: ' + (result.data?.containerGroupId || ''), 'success');
                    // 刷新列表
                    this.refreshList();
                    setTimeout(() => {
                        this.closeCreateDialog();
                    }, 200);
                } else {
                    window.$message('创建失败: ' + (result.message || '未知错误'), 'error');
                }
            } catch (error) {
                console.error('创建容器组失败:', error);
                window.$message('创建失败: ' + error.message, 'error');
            } finally {
                this.submitting = false;
            }
        },
        // 刷新列表
        refreshList() {
            this.currentPage = 1;
            this.loadTableData();
        },
        // 根据状态返回不同的样式类
        getStatusClass(status) {
            const classMap = {
                '运行中': 'bg-green-100 text-green-800',
                '运行成功': 'bg-green-100 text-green-800',
                '启动中': 'bg-blue-100 text-blue-800',
                '创建中': 'bg-blue-100 text-blue-800',
                '重启中': 'bg-blue-100 text-blue-800',
                '更新中': 'bg-blue-100 text-blue-800',
                '运行失败': 'bg-red-100 text-red-800',
                '创建失败': 'bg-red-100 text-red-800',
                '终止中': 'bg-yellow-100 text-yellow-800',
                '已终止': 'bg-gray-100 text-gray-800',
                '过期': 'bg-gray-100 text-gray-800'
            };
            return classMap[status] || 'bg-gray-100 text-gray-800';
        },
        // 上一页
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadTableData();
            }
        },
        // 下一页
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadTableData();
            }
        },
        // 跳转到指定页
        goToPage(page) {
            if (this.currentPage !== page) {
                this.currentPage = page;
                this.loadTableData();
            }
        },
        // 查看详情
        viewDetail(item) {
            console.log('查看详情:', item);
            window.$message(`查看详情: ${item.containerGroupName}`, 'info');
        },
        // 打开
        openItem(item) {
            window.open(`${this.apiBaseUrl}/tengu/container/open/redirect?id=${item.id}`, '_blank');
        },
        // 刷新
        async refreshItem(item) {
            try {
                const confirmed = await window.$confirm(`确定要刷新 ${item.containerGroupName} 吗?`, '确认刷新');
                if (!confirmed) {
                    return;
                }
            } catch (error) {
                return;
            }

            try {
                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/refreshContainerGroup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.id
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    window.$message('刷新成功！', 'success');
                    // 刷新列表
                    this.loadTableData();
                } else {
                    window.$message('刷新失败: ' + (result.message || '未知错误'), 'error');
                }
            } catch (error) {
                console.error('刷新容器组失败:', error);
                window.$message('刷新失败: ' + error.message, 'error');
            }
        },
        // 释放
        async releaseItem(item) {
            try {
                const confirmed = await window.$confirm(`确定要释放 ${item.containerGroupName} 吗?`, '确认释放');
                if (!confirmed) {
                    return;
                }
            } catch (error) {
                return;
            }

            try {

                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/deleteContainerGroup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.id
                    })
                });

                const result = await response.json();


                if (result.resultCode === 1) {
                    window.$message('释放成功！', 'success');
                    // 刷新列表
                    this.loadTableData();
                } else if (result.resultCode === 0) {
                    window.$message(result.message || '该容器实例记录已被删除', 'info');
                    // 刷新列表
                    this.loadTableData();
                } else {
                    window.$message('释放失败: ' + (result.message || '未知错误'), 'error');
                }
            } catch (error) {
                console.error('释放容器组失败:', error);
                window.$message('释放失败: ' + error.message, 'error');
            }
        },
        // 查询容器组价格
        async fetchContainerGroupPrice() {
            // 构建请求数据 - 使用与 createContainerGroup 相同的参数
            const requestData = {
                channelCode: this.formData.channelCode,
                regionId: this.formData.regionId,
                containerGroupName: this.formData.containerGroupName,
                vpcId: this.formData.vpcId,
                vSwitchId: this.formData.vSwitchId,
                securityGroupId: this.formData.securityGroupId,
                instanceType: this.formData.instanceType,
                spotStrategy: this.formData.spotStrategy,
                restartPolicy: this.formData.restartPolicy,
                autoMatchImageCache: this.formData.autoMatchImageCache,
                containers: [
                    {
                        name: this.container.name,
                        image: this.container.image
                    }
                ]
            };

            // 可选字段
            if (this.formData.cpu) {
                requestData.cpu = parseFloat(this.formData.cpu);
            }
            if (this.formData.memory) {
                requestData.memory = parseFloat(this.formData.memory);
            }
            if (this.formData.spotStrategy === 'SpotWithPriceLimit' && this.formData.spotPriceLimit) {
                requestData.spotPriceLimit = this.formData.spotPriceLimit;
            }
            if (this.container.imagePullPolicy) {
                requestData.containers[0].imagePullPolicy = this.container.imagePullPolicy;
            }
            if (this.container.command.length > 0) {
                requestData.containers[0].command = this.container.command.filter(cmd => cmd.trim() !== '');
            }
            if (this.container.args.length > 0) {
                requestData.containers[0].args = this.container.args.filter(arg => arg.trim() !== '');
            }
            if (this.container.ports.length > 0) {
                requestData.containers[0].ports = this.container.ports.filter(p => p.port);
            }

            this.priceInfo.errorMsg = ""
            this.priceInfo.loading = true;
            try {
                const response = await fetch(`${this.apiBaseUrl}/tengu/instance/describeContainerGroupPrice`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                const result = await response.json();

                if (!response.ok) {
                    if (result.message) {
                        this.priceInfo.errorMsg = result.message
                    } else {
                        this.priceInfo.errorMsg = "查询价格失败"
                    }
                } else if (result.resultCode === 1 && result.data && result.data.priceInfo) {
                    const priceInfo = result.data.priceInfo;
                    this.priceInfo.currency = priceInfo.currency || 'CNY';

                    // 判断是单一价格还是价格区间
                    if (priceInfo.spotPrices && Array.isArray(priceInfo.spotPrices) && priceInfo.spotPrices.length > 0) {
                        // 价格区间：从 spotPrices 中找出最低和最高的 spotPrice
                        const spotPrices = priceInfo.spotPrices.map(item => item.spotPrice);
                        this.priceInfo.minPrice = Math.min(...spotPrices);
                        this.priceInfo.maxPrice = Math.max(...spotPrices);
                        this.priceInfo.isRange = this.priceInfo.minPrice !== this.priceInfo.maxPrice;
                    } else if (priceInfo.tradePrice !== undefined) {
                        // 单一价格
                        this.priceInfo.minPrice = priceInfo.tradePrice;
                        this.priceInfo.maxPrice = priceInfo.tradePrice;
                        this.priceInfo.isRange = false;
                    } else {
                        // 没有价格信息，重置
                        this.priceInfo.minPrice = 0;
                        this.priceInfo.maxPrice = 0;
                        this.priceInfo.isRange = false;
                    }
                } else {
                    console.error('查询价格失败:', result);
                    // 失败时重置价格
                    this.priceInfo.minPrice = 0;
                    this.priceInfo.maxPrice = 0;
                    this.priceInfo.isRange = false;
                }
            } catch (error) {
                this.priceInfo.errorMsg = error
                console.error('查询价格失败:', error);
                // 失败时重置价格
                this.priceInfo.minPrice = 0;
                this.priceInfo.maxPrice = 0;
                this.priceInfo.isRange = false;
            } finally {
                this.priceInfo.loading = false;
            }
        }
    }
}
</script>
