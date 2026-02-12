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


.el-dialog-footer-custom {
    padding: 16px 24px;
    border-top: 1px solid #e4e7ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
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

/* 事件弹窗样式 */
.events-dialog-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 1700px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

/* 日志弹窗样式 */
.log-dialog-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 1600px;
    min-width: 1400px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.log-content {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 16px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 60vh;
    overflow-y: auto;
}

.log-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.log-content::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
}

.log-content::-webkit-scrollbar-thumb:hover {
    background-color: #666;
}

.log-content::-webkit-scrollbar-track {
    background-color: #2d2d2d;
}

.events-table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 60vh;
}

.events-table {
    width: 100%;
    border-collapse: collapse;
}

.events-table th {
    background-color: #f5f7fa;
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e4e7ed;
    position: sticky;
    top: 0;
    z-index: 1;
}

.events-table td {
    padding: 12px 16px;
    font-size: 14px;
    color: #606266;
    border-bottom: 1px solid #ebeef5;
}

.events-table tbody tr:hover {
    background-color: #f5f7fa;
}

.event-type-warning {
    color: #e6a23c;
    font-weight: 500;
}

.event-type-normal {
    color: #67c23a;
    font-weight: 500;
}
</style>

<template>
    <div class="container mx-auto p-6">

        <!-- 头部操作栏 - 使用公共 header 组件 -->
        <app-header title="容器组">
            <!-- <button @click="openCreateDialog"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                创建实例
            </button> -->
        </app-header>


        <!-- 创建容器组组件 -->
        <create-container :visible="showCreateDialog" :api-base-url="apiBaseUrl" @close="showCreateDialog = false"
            :container-scene="containerScene" @created="handleContainerCreated">
        </create-container>


        <!-- 筛选条件 -->
        <div class="mb-4 bg-white rounded-lg shadow p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <!-- 地域多选 -->
                <!-- <div>
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
                </div> -->
                <!-- 状态多选 -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">容器状态</label>
                    <div class="relative" ref="statusDropdown">
                        <div @click.stop="toggleStatusDropdown"
                            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white cursor-pointer hover:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[38px]">
                            <div class="flex items-center">
                                <div class="flex flex-wrap gap-1 flex-1">
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
                                <button v-if="filterParams.containerGroupStatusList.length > 0" type="button"
                                    @click.stop="clearAllStatus" style="margin-top: 2px;"
                                    class="ml-2 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                    title="清空所有选项">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div v-if="showStatusDropdown"
                            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                            @click.stop>
                            <div v-for="option in statusOptions" :key="option.value" @click="toggleStatus(option.value)"
                                class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100">
                                <input type="checkbox"
                                    :checked="filterParams?.containerGroupStatusList?.includes(option.value)"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 pointer-events-none">
                                <span class="text-sm text-gray-900">{{ option.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-end gap-2 md:col-span-1">
                    <button @click="loadTableData"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        查询
                    </button>
                    <button @click="openCreateLanDialog" v-if="currentLoginAccount?.permissionList?.includes('R_LAN')"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        创建内网实例
                    </button>
                    <button @click="openCreateWanDialog" v-if="currentLoginAccount?.permissionList?.includes('R_WAN')"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        创建公网实例
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
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email</th>
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                标签</th> -->
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                用户</th> -->
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                状态
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                事件</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                规格</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                可用区</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                总价/单价</th>

                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                运行/创建时间</th>
                            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 安全组/虚拟交换机</th> -->
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in this.tableData" :key="item.id" class="hover:bg-gray-50"
                            :class="{ 'opacity-60': item.rawData.email !== this.currentLoginAccount.email && this.currentLoginAccount?.email }">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    <span v-if="item?.rawData?.containerScene === 'R_LAN'" title="内网"
                                        class="px-2 py-1 mr-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                        内网
                                    </span>

                                    <span v-if="item?.rawData?.containerScene === 'R_WAN'" title="公网"
                                        class="px-2 py-1 mr-1 rounded text-xs font-medium bg-orange-100 text--800">
                                        公网
                                    </span>
                                    {{ item.containerGroupId }}
                                </div>
                                <div class="text-sm text-gray-500">{{ item.containerGroupName }}
                                    <span v-if="item?.rawData?.spotStrategy === 'SpotAsPriceGo'" title="抢占式"
                                        class="bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                        抢占式
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="{ 'font-semibold text-black': this.currentLoginAccount.role === 'admin' && item.rawData.email === this.currentLoginAccount.email }">
                                    {{ item.rawData.email }}
                                </span>
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
                                    <span v-if="item.status != item.containerGroupStatus">
                                        订单
                                    </span>
                                    {{ item.status }}
                                </span>
                                <br>
                                <span v-if="item.status != item.containerGroupStatus"
                                    :class="getStatusClass(item.containerGroupStatus)"
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                    <span v-if="item.status != item.containerGroupStatus">
                                        容器
                                    </span>
                                    {{ item.containerGroupStatus }}
                                </span>

                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span @click="openEventsDialog(item)" :class="getEventClass(item.events)"
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:opacity-80">
                                    {{ item.events?.length || '-' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div v-if="item.rawData.cpu" class="text-sm font-medium">
                                    {{ item.rawData.cpu }}核{{ item.rawData.memory }}G
                                    <span class="text-red-400" v-if="isGPUSpec(item?.rawData?.instanceType)">
                                        GPU
                                    </span>
                                </div>
                                <div v-if="item.rawData.instanceType" class="text-xs font-medium text-gray-500">
                                    {{ item.rawData.instanceType }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span v-if="!item.rawData.zoneId">
                                    {{ item.zone }}
                                </span>
                                <span v-if="item.rawData.zoneId">
                                    {{ getZoneDesc(item.rawData.zoneId) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div v-if="item.rawData.price > 0" class="text-sm font-medium text-orange-400">

                                    <span v-if="!item.rawData.deleteTime">
                                        {{ Math.round(item.rawData.price * (new Date().getTime() -
                                            (item.rawData.createTime)) / 1000 * 10000) / 10000 }}
                                    </span>

                                    <span v-if="item.rawData.deleteTime">
                                        {{ Math.round(item.rawData.price * (item.rawData.deleteTime -
                                            (item.rawData.createTime)) / 1000 * 10000) / 10000 }}
                                    </span>

                                    {{ item.rawData.currency }}
                                </div>
                                <div v-if="item.rawData.price > 0" class="text-xs text-gray-500">{{ Math.round(
                                    item.rawData.price * 3600 * 1000) / 1000 }} {{ item.rawData.currency }} / 小时</div>
                            </td>

                            <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ item.createTime }}
                            </td> -->

                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <strong>
                                    <span v-if="!item.rawData.deleteTime">
                                        {{ getTimeElapsed(item.rawData.createTime, new Date().getTime()) }}
                                    </span>

                                    <span v-if="item.rawData.deleteTime">
                                        {{ getTimeElapsed(item.rawData.createTime, item.rawData.deleteTime) }}
                                    </span>
                                </strong>

                                <br>

                                {{ item.createTime }}
                            </td>


                            <!--
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ item.securityGroup }}</div>
                                <div class="text-sm text-gray-500">{{ item.vSwitch }}</div>
                            </td>
                            -->
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                <!-- <button @click="viewDetail(item)" -->
                                <!-- class="text-indigo-600 hover:text-indigo-900 mr-3">详情</button> -->
                                <button @click="openItem(item)" v-if="item.rawData.host"
                                    class=" hover:text-green-900 mr-3 cursor-pointer"
                                    :class="{ 'text-green-600': item.rawData.status === 'Running', 'text-gray-400': item.rawData.status !== 'Running' }">打开</button>
                                <button @click="refreshItem(item)"
                                    class="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">刷新</button>
                                <button @click="viewLog(item)" v-if="this.currentLoginAccount?.role === 'admin'"
                                    class="text-purple-600 hover:text-purple-900 mr-3 cursor-pointer">日志</button>
                                <button @click="releaseItem(item)"
                                    class="hover:text-red-900 text-red-600 cursor-pointer">释放</button>
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

        <!-- 事件详情对话框 -->
        <transition name="el-dialog-fade">
            <div v-if="showEventsDialog" class="el-dialog-overlay" @click="closeEventsDialog">
                <div class="el-dialog-wrapper" @click.stop">
                    <div class="events-dialog-container">
                        <!-- 对话框头部 -->
                        <div class="el-dialog-header-custom">
                            <span class="el-dialog-title-custom">事件详情 - {{ currentEventsItem?.containerGroupName
                            }}</span>
                            <button @click="closeEventsDialog" class="el-dialog-close-custom">
                                <svg viewBox="0 0 1024 1024" width="16" height="16">
                                    <path fill="currentColor"
                                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                                </svg>
                            </button>
                        </div>

                        <!-- 对话框内容 -->
                        <div class="el-dialog-body-custom">
                            <div v-if="!currentEventsItem?.events || currentEventsItem.events.length === 0"
                                class="text-center py-8 text-gray-500">
                                暂无事件信息
                            </div>
                            <div v-else class="events-table-wrapper">
                                <table class="events-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 115px;">类型 / 次数</th>
                                            <!-- <th style="width: 60px;">次数</th> -->
                                            <th style="width: 170px;">首次 / 最后时间</th>
                                            <!-- <th style="width: 300px;">名称</th> -->
                                            <th style="">消息</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(event, index) in currentEventsItem.events" :key="index">
                                            <td>
                                                <span
                                                    :class="event.type === 'Warning' ? 'event-type-warning' : 'event-type-normal'">
                                                    {{ event.type }} / {{ event.count }}
                                                </span>
                                            </td>
                                            <!-- <td>{{ event.count }}</td> -->
                                            <td>
                                                {{ formatEventTime(event.firstTimestamp) }}</br>
                                                <span v-if="event.firstTimestamp !== event.lastTimestamp">
                                                    {{ formatEventTime(event.lastTimestamp) }}
                                                </span>
                                            </td>
                                            <!-- <td style="word-break: break-all;">{{ event.name }}</td> -->
                                            <!-- <td style="white-space:nowrap;">{{ event.message }}</td> -->
                                            <td style="">{{ event.message }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- 对话框底部 -->
                        <div class="el-dialog-footer-custom">
                            <div class="el-dialog-buttons">
                                <button @click="closeEventsDialog" type="button" class="el-btn el-btn-primary">
                                    关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- 日志详情对话框 -->
        <transition name="el-dialog-fade">
            <div v-if="showLogDialog" class="el-dialog-overlay" @click="closeLogDialog">
                <div class="el-dialog-wrapper" @click.stop>
                    <div class="log-dialog-container">
                        <!-- 对话框头部 -->
                        <div class="el-dialog-header-custom">
                            <span class="el-dialog-title-custom">容器日志 - {{ currentLogItem?.containerGroupName }}</span>
                            <button @click="closeLogDialog" class="el-dialog-close-custom">
                                <svg viewBox="0 0 1024 1024" width="16" height="16">
                                    <path fill="currentColor"
                                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                                </svg>
                            </button>
                        </div>

                        <!-- 对话框内容 -->
                        <div class="el-dialog-body-custom">
                            <div v-if="logLoading" class="el-loading-container">
                                <div class="el-loading-spinner"></div>
                                <div class="el-loading-text">加载日志中...</div>
                            </div>
                            <div v-else-if="!logContent" class="text-center py-8 text-gray-500">
                                暂无日志信息
                            </div>
                            <div v-else class="log-content">{{ logContent }}</div>
                        </div>

                        <!-- 对话框底部 -->
                        <div class="el-dialog-footer-custom">
                            <div class="el-dialog-buttons">
                                <button @click="closeLogDialog" type="button" class="el-btn el-btn-primary">
                                    关闭
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
    mixins: [mixins],
    components: {
        'create-container': Vue.defineAsyncComponent(httpVueLoaderVersion('/static/component/create-container.vue'))
    },
    data() {
        return {
            containerScene: "R_LANn", // R_WAN (风控公网) / R_LAN （风控内网）
            currentLoginAccount: { email: "", role: "", nickname: "", permissionList: [] },
            currentPage: 1,
            pageSize: 20,
            tableData: [],
            totalItems: 0,
            loading: false,
            // 筛选参数
            filterParams: {
                regionIdList: [],
                containerGroupStatusList: ['Running', 'Pending', 'Scheduling', 'Updating', 'Terminating', 'Restarting', 'ScheduleFailed']
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
            zoneIdMap: {
                "cn-qingdao-b": "青岛B",
                "cn-qingdao-c": "青岛C",
                "cn-beijing-a": "北京A",
                "cn-beijing-b": "北京B",
                "cn-beijing-c": "北京C",
                "cn-beijing-d": "北京D",
                "cn-beijing-e": "北京E",
                "cn-beijing-f": "北京F",
                "cn-beijing-g": "北京G",
                "cn-beijing-h": "北京H",
                "cn-beijing-i": "北京I",
                "cn-beijing-j": "北京J",
                "cn-beijing-k": "北京K",
                "cn-beijing-l": "北京L",
                "cn-zhangjiakou-a": "张家口A",
                "cn-zhangjiakou-b": "张家口B",
                "cn-zhangjiakou-c": "张家口C",
                "cn-huhehaote-a": "呼和浩特A",
                "cn-huhehaote-b": "呼和浩特B",
                "cn-wulanchabu-a": "乌兰察布A",
                "cn-wulanchabu-b": "乌兰察布B",
                "cn-wulanchabu-c": "乌兰察布C",
                "cn-hangzhou-b": "杭州B",
                "cn-hangzhou-e": "杭州E",
                "cn-hangzhou-f": "杭州F",
                "cn-hangzhou-g": "杭州G",
                "cn-hangzhou-h": "杭州H",
                "cn-hangzhou-i": "杭州I",
                "cn-hangzhou-j": "杭州J",
                "cn-hangzhou-k": "杭州K",
                "cn-shanghai-a": "上海A",
                "cn-shanghai-b": "上海B",
                "cn-shanghai-c": "上海C",
                "cn-shanghai-d": "上海D",
                "cn-shanghai-e": "上海E",
                "cn-shanghai-f": "上海F",
                "cn-shanghai-g": "上海G",
                "cn-shanghai-k": "上海K",
                "cn-shanghai-l": "上海L",
                "cn-shanghai-m": "上海M",
                "cn-shanghai-n": "上海N",
                "cn-shanghai-o": "上海O",
                "cn-nanjing-a": "南京A",
                "cn-fuzhou-a": "福州A",
                "cn-wuhan-lr-a": "武汉A",
                "cn-shenzhen-a": "深圳A",
                "cn-shenzhen-b": "深圳B",
                "cn-shenzhen-c": "深圳C",
                "cn-shenzhen-d": "深圳D",
                "cn-shenzhen-e": "深圳E",
                "cn-shenzhen-f": "深圳F",
                "cn-heyuan-a": "河源A",
                "cn-heyuan-b": "河源B",
                "cn-guangzhou-a": "广州A",
                "cn-guangzhou-b": "广州B",
                "cn-chengdu-a": "成都A",
                "cn-chengdu-b": "成都B",
                "cn-hongkong-b": "香港B",
                "cn-hongkong-c": "香港C",
                "cn-hongkong-d": "香港D",
                "ap-southeast-1a": "新加坡A",
                "ap-southeast-1b": "新加坡B",
                "ap-southeast-1c": "新加坡C",
                "ap-southeast-3a": "吉隆坡A",
                "ap-southeast-3b": "吉隆坡B",
                "ap-southeast-3c": "吉隆坡C",
                "ap-southeast-5a": "雅加达A",
                "ap-southeast-5b": "雅加达B",
                "ap-southeast-5c": "雅加达C",
                "ap-southeast-6a": "马尼拉A",
                "ap-southeast-6b": "马尼拉B",
                "ap-southeast-7a": "曼谷A",
                "ap-southeast-7b": "曼谷B",
                "ap-northeast-1a": "东京A",
                "ap-northeast-1b": "东京B",
                "ap-northeast-1c": "东京C",
                "ap-northeast-2a": "首尔A",
                "ap-northeast-2b": "首尔B",
                "us-west-1a": "硅谷A",
                "us-west-1b": "硅谷B",
                "us-east-1a": "弗吉尼亚A",
                "us-east-1b": "弗吉尼亚B",
                "eu-central-1a": "法兰克福A",
                "eu-central-1b": "法兰克福B",
                "eu-central-1c": "法兰克福C",
                "eu-west-1a": "伦敦A",
                "eu-west-1b": "伦敦B",
                "me-east-1a": "迪拜A",
                "me-east-1b": "迪拜B",
                "me-central-1a": "利雅得A",
                "me-central-1b": "利雅得B",
                "na-south-1a": "墨西哥A",
                "cn-hangzhou-finance-b": "杭州金融B",
                "cn-hangzhou-finance-c": "杭州金融C",
                "cn-hangzhou-finance-d": "杭州金融D",
                "cn-hangzhou-finance-h": "杭州金融H",
                "cn-hangzhou-finance-i": "杭州金融I",
                "cn-hangzhou-finance-j": "杭州金融J",
                "cn-hangzhou-finance-k": "杭州金融K",
                "cn-shanghai-finance-1a": "上海金融A",
                "cn-shanghai-finance-1b": "上海金融B",
                "cn-shanghai-finance-1f": "上海金融F",
                "cn-shanghai-finance-1g": "上海金融G",
                "cn-shanghai-finance-1k": "上海金融K",
                "cn-shanghai-finance-1z": "上海金融Z",
                "cn-shenzhen-finance-1a": "深圳金融A",
                "cn-shenzhen-finance-1b": "深圳金融B",
                "cn-shenzhen-finance-1d": "深圳金融D",
                "cn-shenzhen-finance-1e": "深圳金融E",
                "cn-beijing-finance-1f": "北京金融F",
                "cn-beijing-finance-1k": "北京金融K",
                "cn-beijing-finance-1l": "北京金融L",
                "cn-north-2-gov-1a": "北京政务A",
                "cn-north-2-gov-1b": "北京政务B",
                "cn-north-2-gov-1c": "北京政务C",
                "cn-north-2-gov-1d": "北京政务D",
                "cn-north-2-gov-1e": "北京政务E"
            },
            // 创建对话框相关
            showCreateDialog: false,
            // 事件弹窗
            showEventsDialog: false,
            currentEventsItem: null,
            // 日志弹窗
            showLogDialog: false,
            currentLogItem: null,
            logContent: '',
            logLoading: false
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
        // API基础URL
        apiBaseUrl() {
            return window.apiBaseUrl()
        }
    },
    mounted() {
        this.loadTableData();
        // 添加全局点击事件监听器
        document.addEventListener('click', this.handleClickOutside);

        // 获取当前登录账号信息
        this.currentLoginAccount = JSON.parse(localStorage.getItem('_current_login_account') || '{}')
        setTimeout(() => {
            this.currentLoginAccount = JSON.parse(localStorage.getItem('_current_login_account') || '{}')
        }, 1000);
    },
    beforeDestroy() {
        // 移除全局点击事件监听器
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        getZoneDesc(zoneId) {
            if (!zoneId) {
                return "-"
            }
            return this.zoneIdMap[zoneId] || zoneId
        },
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
        clearAllStatus() {
            this.filterParams.containerGroupStatusList = [];
            this.handleFilterChange();
        },
        getStatusLabel(value) {
            const option = this.statusOptions.find(opt => opt.value === value);
            return option ? option.label : value;
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
        getEventClass(events) {
            if (!events || !events.length) {
                return 'bg-gray-100 text-gray-800'
            }

            for (let v of events) {
                if (v.type === 'Warning') {
                    return 'bg-yellow-100 text-yellow-800'
                }
            }
            return 'bg-green-100 text-green-800'
        },
        // 打开事件弹窗
        openEventsDialog(item) {
            if (!item.events || item.events.length === 0) {
                window.$message('暂无事件信息', 'info');
                return;
            }
            this.currentEventsItem = item;
            this.showEventsDialog = true;
        },
        // 关闭事件弹窗
        closeEventsDialog() {
            this.showEventsDialog = false;
            this.currentEventsItem = null;
        },
        // 格式化事件时间
        formatEventTime(timestamp) {
            if (!timestamp) return '-';
            return new Date(timestamp).getTime().timestamp2yyyymmddhmsShangHaiTime()
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

                const response = await fetchWithToken(`${this.apiBaseUrl}/tengu/instance/describeContainerGroupPage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const result = await response.json();
                this.tableData = [];// 清空数据以防止旧数据残留
                this.totalItems = 0;
                if (!response.ok) {
                    console.error('网络响应错误:', response.statusText);
                    window.$message('加载数据失败: ' + response.statusText, 'error');
                } else if (result.resultCode === 1 && result.data) {
                    this.tableData = this.formatTableData(result.data.rows || []);
                    this.totalItems = result.data.total || 0;
                    //加载性能数据

                    this.fetchMetricData(result.data.rows);

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
        async fetchMetricData(rows) {
            if (!rows || rows.length === 0) {
                return;
            }
            let containerGroupIdList = rows.map(item => item.containerGroupId)
            if (containerGroupIdList.length === 0) {
                return;
            }

            const response = await fetchWithToken(`${this.apiBaseUrl}/tengu/instance/describeContainerGroupMetric`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    containerGroupIdList: containerGroupIdList
                })
            });

            if (!response.ok) {
                return
            }
            const result = await response.json();
            if (result.resultCode !== 1) {
                return
            }

            console.log('性能数据:', result.data);

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
                events: item.events,
                zone: this.formatRegion(item.regionId),
                createTime: item.createTime.timestamp2yyyymmddhmShangHaiTime(),
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
        isGPUSpec(instanceType) {
            return instanceType && (instanceType.startsWith("ecs.gn5") || instanceType.startsWith("ecs.gn8is"))
        },
        // 筛选条件改变
        handleFilterChange() {
            this.currentPage = 1;
            this.loadTableData();
        },
        // 打开创建内网实例对话框
        openCreateLanDialog() {
            this.containerScene = 'R_LAN';
            this.showCreateDialog = true;
        },
        // 打开创建公网实例对话框
        openCreateWanDialog() {
            this.containerScene = 'R_WAN';
            this.showCreateDialog = true;
        },
        // 打开
        openItem(item) {
            window.open(`${this.apiBaseUrl}/tengu/container/open/redirect?id=${item.id}&X-API-ACCESS-TOKEN=` + getApiAccessToken(), '_blank');
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
                const response = await fetchWithToken(`${this.apiBaseUrl}/tengu/instance/refreshContainerGroup`, {
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

                const response = await fetchWithToken(`${this.apiBaseUrl}/tengu/instance/deleteContainerGroup`, {
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
        // 处理容器创建成功
        handleContainerCreated: function (containerData) {
            this.showCreateDialog = false;
            window.$message('容器组创建成功', 'success');
            this.loadTableData();
        },
        // 查看容器日志
        async viewLog(item) {
            this.currentLogItem = item;
            this.showLogDialog = true;
            this.logLoading = true;
            this.logContent = '';

            try {
                const response = await fetchWithToken(`${this.apiBaseUrl}/tengu/instance/describeContainerLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.id,
                        tail: 3000
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1 && result.data) {
                    this.logContent = result.data.content || '暂无日志内容';
                } else {
                    this.logContent = '获取日志失败: ' + (result.message || '未知错误');
                }
            } catch (error) {
                console.error('获取容器日志失败:', error);
                this.logContent = '获取日志失败: ' + error.message;
            } finally {
                this.logLoading = false;
                // 滚动到底部
                this.$nextTick(function () {
                    var logContentElement = document.querySelector('.log-content');
                    if (logContentElement) {
                        logContentElement.scrollTop = logContentElement.scrollHeight;
                    }
                });
            }
        },
        // 关闭日志弹窗
        closeLogDialog() {
            this.showLogDialog = false;
            this.currentLogItem = null;
            this.logContent = '';
        }
    }
}
</script>
