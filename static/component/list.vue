<style scoped></style>

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
                            <div v-for="option in regionOptions" :key="option.value"
                                @click="toggleRegion(option.value)"
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
                            <div v-for="option in statusOptions" :key="option.value"
                                @click="toggleStatus(option.value)"
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
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                标签</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                用户</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                容器状态</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                事件</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                规格</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                所在可用区</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                创建时间</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                安全组/虚拟交换机</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                操作</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in this.tableData" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ item.containerGroupId }}</div>
                                <div class="text-sm text-gray-500">{{ item.containerGroupName }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 tex「方案选单」t-blue-800">
                                    {{ item.tag }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.user }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(item.containerGroupStatus)"
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                    {{ item.containerGroupStatus }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.event }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.spec }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.zone }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.createTime }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ item.securityGroup }}</div>
                                <div class="text-sm text-gray-500">{{ item.vSwitch }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button @click="viewDetail(item)"
                                    class="text-indigo-600 hover:text-indigo-900 mr-3">详情</button>
                                <button @click="openItem(item)"
                                    class="text-green-600 hover:text-green-900 mr-3">打开</button>
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
                            显示第 <span class="font-medium">{{ startItem }}</span> 到 <span class="font-medium">{{ endItem
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

        <!-- 创建实例对话框 -->
        <div v-if="showCreateDialog" class="fixed z-50 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- 背景遮罩 -->
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-0" @click="closeCreateDialog">
                </div>

                <!-- 对话框内容 -->
                <div
                    class="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">创建容器组实例</h3>
                            <button @click="closeCreateDialog" class="text-gray-400 hover:text-gray-500">
                                <span class="text-2xl">&times;</span>
                            </button>
                        </div>

                        <!-- 加载状态 -->
                        <div v-if="loadingDictOptions" class="text-center py-8">
                            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600">
                            </div>
                            <p class="mt-2 text-sm text-gray-500">加载配置选项中...</p>
                        </div>

                        <!-- 表单内容 -->
                        <form v-else @submit.prevent="submitCreate" class="space-y-6 max-h-[70vh] overflow-y-auto px-1">
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

                    <!-- 底部按钮 -->
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="submitCreate" :disabled="submitting || loadingDictOptions" type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="submitting"
                                class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                            {{ submitting ? '创建中...' : '创建' }}
                        </button>
                        <button @click="closeCreateDialog" :disabled="submitting" type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
                containerGroupStatusList: ['Running', 'Pending', 'Scheduling', 'Updating', 'Terminating','Restarting']
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

            if (u.endsWith('/')) {
                return u.slice(0, -1);
            }
            return u;
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
                alert('加载数据失败: ' + error.message);
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
        },
        // 关闭创建对话框
        closeCreateDialog() {
            if (this.submitting) return;
            this.showCreateDialog = false;
            this.resetForm();
        },
        // 重置表单
        resetForm() {
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
                    alert('加载配置选项失败');
                }
            } catch (error) {
                console.error('加载字典选项失败:', error);
                alert('加载配置选项失败: ' + error.message);
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
                alert('请输入容器组名称');
                return;
            }
            if (!this.formData.regionId) {
                alert('请选择地域');
                return;
            }
            // if (!this.formData.vpcId) {
            //     alert('请选择专有网络');
            //     return;
            // }
            // if (!this.formData.vSwitchId) {
            //     alert('请选择交换机');
            //     return;
            // }
            // if (!this.formData.securityGroupId) {
            //     alert('请选择安全组');
            //     return;
            // }
            if (!this.formData.instanceType) {
                alert('请选择ECS实例规格');
                return;
            }
            if (!this.formData.spotStrategy) {
                alert('请选择付费模式');
                return;
            }
            if (this.formData.spotStrategy === 'SpotWithPriceLimit' && !this.formData.spotPriceLimit) {
                alert('请输入价格上限');
                return;
            }
            if (!this.formData.restartPolicy) {
                alert('请选择重启策略');
                return;
            }
            if (!this.container.name) {
                alert('请输入容器名称');
                return;
            }
            if (!this.container.image) {
                alert('请输入镜像地址');
                return;
            }

            // 构建请求数据
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
                    alert('创建成功！容器组ID: ' + (result.data?.containerGroupId || ''));
                    this.closeCreateDialog();
                    // 刷新列表
                    this.refreshList();
                } else {
                    alert('创建失败: ' + (result.message || '未知错误'));
                }
            } catch (error) {
                console.error('创建容器组失败:', error);
                alert('创建失败: ' + error.message);
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
            alert(`查看详情: ${item.containerGroupName}`);
        },
        // 打开
        openItem(item) {
            console.log('打开:', item);
            alert(`打开: ${item.containerGroupName}`);
        },
        // 释放
        async releaseItem(item) {
            if (!confirm(`确定要释放 ${item.containerGroupName} 吗?`)) {
                return;
            }

            try {
                
                console.log(item)

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

                if (result.resultCode === 0) {
                    alert(result.message || '该容器实例记录已被删除');
                    // 刷新列表
                    this.loadTableData();
                } else {
                    alert('释放失败: ' + (result.message || '未知错误'));
                }
            } catch (error) {
                console.error('释放容器组失败:', error);
                alert('释放失败: ' + error.message);
            }
        }
    }
}
</script>
