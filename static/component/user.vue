<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-7xl mx-auto">
            <!-- 使用公共 header 组件 -->
            <app-header title="用户管理"></app-header>

            <!-- 创建用户部分 -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">创建用户</h2>
                <form @submit.prevent="handleCreateUser" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            邮箱 <span class="text-red-500">*</span>
                        </label>
                        <input type="email" v-model="createForm.email" required placeholder="请输入邮箱"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            昵称
                        </label>
                        <input type="text" v-model="createForm.nickname" placeholder="可选，不填则使用邮箱"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            密码 <span class="text-red-500">*</span>
                        </label>
                        <input type="password" v-model="createForm.password" required placeholder="请输入密码"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            角色
                        </label>
                        <select v-model="createForm.role"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div class="md:col-span-2 lg:col-span-4">
                        <button type="submit" :disabled="createLoading" class="el-btn el-btn-primary px-6 py-2">
                            <span v-if="createLoading" class="el-btn-loading"></span>
                            {{ createLoading ? '创建中...' : '创建用户' }}
                        </button>
                    </div>
                </form>
            </div>

            <!-- 用户列表部分 -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-gray-800">用户列表</h2>
                    <button @click="fetchUserList" class="el-btn el-btn-default px-4 py-2">
                        刷新
                    </button>
                </div>

                <!-- 表格 -->
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">ID</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">邮箱</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">昵称</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">角色</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">状态</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">最后登录时间</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">最后登录IP</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">创建时间</th>
                                <th class="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="listLoading">
                                <td colspan="9" class="px-4 py-8 text-center text-gray-500">
                                    <div class="flex items-center justify-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        <span class="ml-3">加载中...</span>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else-if="userList.length === 0">
                                <td colspan="9" class="px-4 py-8 text-center text-gray-500">
                                    暂无数据
                                </td>
                            </tr>
                            <tr v-else v-for="user in userList" :key="user.id" class="hover:bg-gray-50 transition">
                                <td class="px-4 py-3 text-sm text-gray-900 border-b">{{ user.id }}</td>
                                <td class="px-4 py-3 text-sm text-gray-900 border-b">{{ user.email }}</td>
                                <td class="px-4 py-3 text-sm text-gray-900 border-b">{{ user.nickname || '-' }}</td>
                                <td class="px-4 py-3 text-sm border-b">
                                    <span
                                        :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                                        class="px-2 py-1 rounded text-xs font-medium">
                                        {{ user.role }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm border-b">
                                    <span
                                        :class="user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                        class="px-2 py-1 rounded text-xs font-medium">
                                        {{ user.status === 1 ? '正常' : '禁用' }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600 border-b">
                                    {{ formatTime(user.last_login_time) }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600 border-b">
                                    {{ user.last_login_ip || '-' }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600 border-b">
                                    {{ formatTime(user.create_time) }}
                                </td>
                                <td class="px-4 py-3 text-sm border-b">
                                    <div class="flex justify-center gap-2">
                                        <button @click="handleToggleStatus(user)"
                                            class="el-btn el-btn-default px-3 py-1 text-xs">
                                            {{ user.status === 1 ? '禁用' : '启用' }}
                                        </button>
                                        <button @click="handleResetPassword(user)"
                                            class="el-btn el-btn-default px-3 py-1 text-xs">
                                            重置密码
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 分页 -->
                <div class="flex justify-between items-center mt-6">
                    <div class="text-sm text-gray-600">
                        共 {{ pagination.total }} 条记录
                    </div>
                    <div class="flex gap-2">
                        <button @click="handlePageChange(pagination.page - 1)" :disabled="pagination.page <= 1"
                            class="el-btn el-btn-default px-4 py-2">
                            上一页
                        </button>
                        <span class="px-4 py-2 text-sm text-gray-700">
                            第 {{ pagination.page }} / {{ totalPages }} 页
                        </span>
                        <button @click="handlePageChange(pagination.page + 1)" :disabled="pagination.page >= totalPages"
                            class="el-btn el-btn-default px-4 py-2">
                            下一页
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
            createForm: {
                email: '',
                nickname: '',
                password: '',
                role: 'user'
            },
            createLoading: false,
            userList: [],
            listLoading: false,
            pagination: {
                page: 1,
                size: 20,
                total: 0
            }
        }
    },
    computed: {
        apiBaseUrl() {
            return apiBaseUrl();
        },
        totalPages() {
            return Math.ceil(this.pagination.total / this.pagination.size);
        }
    },
    methods: {
        async handleCreateUser() {
            if (!this.createForm.email || !this.createForm.password) {
                window.$message('请填写必填项', 'warning');
                return;
            }

            this.createLoading = true;
            try {
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/account/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.createForm.email,
                        nickname: this.createForm.nickname,
                        password: this.createForm.password,
                        role: this.createForm.role
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    window.$message('创建成功', 'success');
                    // 重置表单
                    this.createForm = {
                        email: '',
                        nickname: '',
                        password: '',
                        role: 'user'
                    };
                    // 刷新列表
                    this.fetchUserList();
                } else {
                    window.$message(result.message || '创建失败', 'error');
                }
            } catch (error) {
                console.error('创建用户错误:', error);
                window.$message('创建失败: ' + error.message, 'error');
            } finally {
                this.createLoading = false;
            }
        },

        async fetchUserList() {
            this.listLoading = true;
            try {
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/account/page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        page: this.pagination.page,
                        size: this.pagination.size
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    this.userList = result.data.rows || [];
                    this.pagination.total = result.data.total || 0;
                } else {
                    window.$message(result.message || '获取列表失败', 'error');
                }
            } catch (error) {
                console.error('获取用户列表错误:', error);
                window.$message('获取列表失败: ' + error.message, 'error');
            } finally {
                this.listLoading = false;
            }
        },

        async handleToggleStatus(user) {
            const action = user.status === 1 ? '禁用' : '启用';
            const confirmed = await window.$confirm(
                '确定要' + action + '用户 "' + user.email + '" 吗?',
                '确认' + action
            );

            if (!confirmed) {
                return;
            }

            try {
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/account/status/switch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    window.$message(action + '成功', 'success');
                    this.fetchUserList();
                } else {
                    window.$message(result.message || action + '失败', 'error');
                }
            } catch (error) {
                console.error('切换状态错误:', error);
                window.$message(action + '失败: ' + error.message, 'error');
            }
        },

        async handleResetPassword(user) {
            const confirmed = await window.$confirm(
                '确定要重置用户 "' + user.email + '" 的密码吗?',
                '确认重置密码'
            );

            if (!confirmed) {
                return;
            }

            try {
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/account/password/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    const newPassword = result.data.password;
                    // 显示新密码弹窗
                    this.showPasswordDialog(user.email, newPassword);
                } else {
                    window.$message(result.message || '重置密码失败', 'error');
                }
            } catch (error) {
                console.error('重置密码错误:', error);
                window.$message('重置密码失败: ' + error.message, 'error');
            }
        },

        showPasswordDialog(email, password) {
            const content = `
                <div style="padding: 20px;">
                    <p style="margin-bottom: 15px; font-size: 14px; color: #606266;">
                        用户 <strong>${email}</strong> 的新密码：
                    </p>
                    <div style="background: #f5f7fa; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                        <code style="font-size: 16px; color: #409eff; font-weight: bold;">${password}</code>
                    </div>
                    <p style="font-size: 12px; color: #909399;">
                        请复制并妥善保管新密码，关闭后将无法再次查看。
                    </p>
                </div>
            `;

            window.$largeDialog({
                title: '密码重置成功',
                content: content,
                width: 'w-96',
                showFooter: true,
                cancelText: '',
                confirmText: '关闭',
                onConfirm: function () {
                    return Promise.resolve();
                }
            });
        },

        handlePageChange(page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }
            this.pagination.page = page;
            this.fetchUserList();
        },

        formatTime(timestamp) {
            return formatTimestamp(timestamp);
        }
    },
    mounted() {
        this.fetchUserList();
    }
}
</script>

<style scoped>
/* 使用全局样式 */
</style>
