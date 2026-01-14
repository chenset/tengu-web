<style scoped>

</style>

<template>
    <div class="container mx-auto p-6">
        <div class="bg-white rounded-lg shadow">
            <!-- 表格容器 -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">容器组ID/名称</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事件</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规格</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">所在可用区</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">安全组/虚拟交换机</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ item.id }}</div>
                                <div class="text-sm text-gray-500">{{ item.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {{ item.tag }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.user }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(item.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                    {{ item.status }}
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
                                <button @click="viewDetail(item)" class="text-indigo-600 hover:text-indigo-900 mr-3">详情</button>
                                <button @click="openItem(item)" class="text-green-600 hover:text-green-900 mr-3">打开</button>
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
                            显示第 <span class="font-medium">{{ startItem }}</span> 到 <span class="font-medium">{{ endItem }}</span> 条，
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
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            tableData: []
        }
    },
    computed: {
        // 总条数
        totalItems() {
            return this.tableData.length;
        },
        // 总页数
        totalPages() {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        // 当前页数据
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
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
        }
    },
    mounted() {
        this.generateMockData();
    },
    beforeDestroy() {
    },
    methods: {
        // 生成50条模拟数据
        generateMockData() {
            const statuses = ['运行中', '已停止', '创建中', '异常'];
            const zones = ['可用区A', '可用区B', '可用区C'];
            const specs = ['2核4G', '4核8G', '8核16G', '16核32G'];
            const events = ['正常', '重启', '升级', '维护'];

            for (let i = 1; i <= 50; i++) {
                this.tableData.push({
                    id: `pod-${String(i).padStart(4, '0')}`,
                    name: `容器组-${i}`,
                    tag: `标签${i % 5 + 1}`,
                    user: `user${i % 10 + 1}`,
                    status: statuses[i % 4],
                    event: events[i % 4],
                    spec: specs[i % 4],
                    zone: zones[i % 3],
                    createTime: this.getRandomDate(),
                    securityGroup: `sg-${String(i).padStart(5, '0')}`,
                    vSwitch: `vsw-${String(i).padStart(5, '0')}`
                });
            }
        },
        // 生成随机日期
        getRandomDate() {
            const start = new Date(2024, 0, 1);
            const end = new Date();
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().slice(0, 19).replace('T', ' ');
        },
        // 根据状态返回不同的样式类
        getStatusClass(status) {
            const classMap = {
                '运行中': 'bg-green-100 text-green-800',
                '已停止': 'bg-gray-100 text-gray-800',
                '创建中': 'bg-yellow-100 text-yellow-800',
                '异常': 'bg-red-100 text-red-800'
            };
            return classMap[status] || 'bg-gray-100 text-gray-800';
        },
        // 上一页
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        // 下一页
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        // 跳转到指定页
        goToPage(page) {
            this.currentPage = page;
        },
        // 查看详情
        viewDetail(item) {
            console.log('查看详情:', item);
            alert(`查看详情: ${item.name}`);
        },
        // 打开
        openItem(item) {
            console.log('打开:', item);
            alert(`打开: ${item.name}`);
        },
        // 释放
        releaseItem(item) {
            if (confirm(`确定要释放 ${item.name} 吗?`)) {
                console.log('释放:', item);
                alert(`已释放: ${item.name}`);
            }
        }
    }
}
</script>
