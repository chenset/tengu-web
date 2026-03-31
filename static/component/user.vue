<template>
    <div class="container mx-auto p-6">
        <!-- 使用公共 header 组件 -->
        <app-header title="用户管理"></app-header>

        <!-- 创建用户部分 -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
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
                    <input type="text" v-model="createForm.nickname" placeholder="请输入飞书中的用户真名，用于@消息提醒"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        角色
                    </label>
                    <select v-model="createForm.role"
                        class="w-full px-3 py-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

                <div>
                    <button type="submit" :disabled="createLoading"
                        class="mt-7 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-md transition duration-200">
                        {{ createLoading ? '创建中...' : '创建用户' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- 用户列表部分 -->
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">用户列表</h2>
                <!-- <button @click="fetchUserList"
                    class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md transition duration-200">
                    刷新
                </button> -->
            </div>

            <!-- 筛选 -->
            <div class="flex flex-wrap gap-3 mb-4 items-center">
                <input v-model="filter.keyword" @keyup.enter="handleSearch" type="text" placeholder="搜索邮箱/昵称"
                    class="px-3 py-1.5 border border-gray-300 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52" />

                <div class="flex items-center gap-1">
                    <span class="text-sm mr-1 font-medium text-gray-700">状态</span>
                    <button @click="toggleFilter('statusList', '1')"
                        :class="filter.statusList.indexOf('1') !== -1 ? 'bg-green-100 text-green-800 border-green-100 hover:bg-green-50' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
                        class="py-1 px-3 border rounded text-xs font-medium transition duration-200">正常</button>
                    <button @click="toggleFilter('statusList', '0')"
                        :class="filter.statusList.indexOf('0') !== -1 ?  'bg-red-100 text-red-800 border-red-100 hover:bg-red-50' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
                        class="py-1 px-3 border rounded text-xs font-medium transition duration-200">禁用</button>
                </div>

                <div class="flex items-center gap-1">
                    <span class="text-sm mr-1 font-medium text-gray-700">角色</span>
                    <button @click="toggleFilter('roleList', 'admin')"
                        :class="filter.roleList.indexOf('admin') !== -1 ? 'bg-purple-100 text-purple-800 border-purple-100 hover:bg-purple-50' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
                        class="py-1 px-3 border rounded text-xs font-medium transition duration-200">admin</button>
                    <button @click="toggleFilter('roleList', 'user')"
                        :class="filter.roleList.indexOf('user') !== -1 ? 'bg-blue-100 text-blue-800 border-blue-100 hover:bg-blue-50' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
                        class="py-1 px-3 border rounded text-xs font-medium transition duration-200">user</button>
                </div>

                <button @click="handleSearch"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-md text-md transition duration-200">
                    搜索
                </button>
                <!-- <button @click="resetFilter"
                    class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-1.5 px-4 border border-gray-300 rounded-md text-sm transition duration-200">
                    重置
                </button> -->
            </div>

            <!-- 表格 -->
            <div class="overflow-x-auto">
                <table class="w-full border-collapse" style="min-width: 1400px;">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">ID</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">用户</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">角色</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">权限</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">总消耗</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">状态</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">登录/IP</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">创建/操作</th>
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
                        <tr v-else v-for="user in userList" :key="user.id" class="hover:bg-gray-50 transition"
                            :class="{ 'opacity-50': user.status !== 1 }">
                            <td class="px-4 py-3 text-sm text-gray-900 border-b">{{ user.id }}</td>
                            <td class="px-4 text-sm text-gray-900 border-b">{{ user.email }}
                                <br>
                                <small class="text-gray-400">
                                    {{ user.nickname || '-' }}
                                </small>
                            </td>
                            <td class="px-4 py-3 text-sm border-b">
                                <span
                                    :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                                    class="px-2 py-1 rounded text-xs font-medium">
                                    {{ user.role }}
                                </span>
                            </td>

                            <td class="px-4 py-3 text-sm border-b">
                                <span class="px-2 py-1 ml-1 rounded text-xs font-medium"
                                    :class="permission === 'R_WAN' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'"
                                    v-for="permission in user.permissionList" :key="permission">
                                    {{ permission }}
                                </span>
                                <span v-if="user.permissionList.length === 0"> - </span>
                            </td>

                            <td class="px-4 text-sm text-gray-900 border-b">
                                <span v-if="!user.statistics?.total">
                                    -
                                </span>

                                <span v-if="user.statistics?.total" class="text-sm font-medium text-orange-400">
                                    <span v-if="user.statistics.total >= 0.1">
                                        {{ Math.round(user.statistics?.total * 10) / 10 }} CNY
                                    </span>
                                    <span v-else>
                                        {{ Math.round(user.statistics?.total * 100000) / 100000 }} CNY
                                    </span>
                                </span>

                                <span v-if="user.statistics?.millis">
                                    <br>
                                    <strong class="text-sm text-gray-600">
                                        {{ getTimeElapsedDiffMs(user.statistics?.millis) }}
                                    </strong>
                                    <span v-if="user.statistics.count" class="text-gray-400">
                                        ({{ user.statistics.count }}次)
                                    </span>
                                </span>
                            </td>
                            
                            <td class="px-4 py-3 text-sm border-b">
                                <span
                                    :class="user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                    class="px-2 py-1 rounded text-xs font-medium">
                                    {{ user.status === 1 ? '正常' : '禁用' }}
                                </span>
                            </td>
                            <td class="px-4 text-sm text-gray-600 border-b">
                                {{ formatTime(user.lastLoginTime) }}
                                <small v-if="user.lastLoginIp" class="text-gray-400">
                                      <br>
                                    {{ user.lastLoginIp || '-' }}
                                </small>
                            </td>
                            <td class="px-4 text-sm text-gray-600 border-b">
                                {{ formatTime(user.createTime) }}
                                <small v-if="user.lastActiveTime" class="text-gray-400">
                                    <br>
                                    {{ formatTime(user.lastActiveTime) }}
                                </small>
                            </td>
                            <td class="px-4 py-3 text-sm border-b">
                                <div class="flex justify-center gap-2">
                                    <button @click="handleToggleStatus(user)"
                                        class="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-medium py-1 px-3 border border-gray-300 rounded text-xs transition duration-200">
                                        {{ user.status === 1 ? '禁用' : '启用' }}
                                    </button>
                                    <button @click="handleResetPassword(user)"
                                        class="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-medium py-1 px-3 border border-gray-300 rounded text-xs transition duration-200">
                                        重置密码
                                    </button>
                                    <button @click="showChangePermissionDialog(user)"
                                        class="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-medium py-1 px-3 border border-gray-300 rounded text-xs transition duration-200">
                                        权限
                                    </button>
                                    <button @click="showEditUserDialog(user)"
                                        class="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-medium py-1 px-3 border border-gray-300 rounded text-xs transition duration-200">
                                        编辑
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
                        class="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 font-medium py-2 px-4 border border-gray-300 rounded-md transition duration-200">
                        上一页
                    </button>
                    <span class="px-4 py-2 text-sm text-gray-700">
                        第 {{ pagination.page }} / {{ totalPages }} 页
                    </span>
                    <button @click="handlePageChange(pagination.page + 1)" :disabled="pagination.page >= totalPages"
                        class="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 font-medium py-2 px-4 border border-gray-300 rounded-md transition duration-200">
                        下一页
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    mixins: [mixins],
    data() {
        return {
            permissionOptions: {
                R_LAN: "风控部门内网权限组",
                R_WAN: "风控部门外网权限组",
            },
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
            },
            filter: {
                keyword: '',
                statusList: ['1'],
                roleList: []
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
            if (!this.createForm.email) {
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
                        role: this.createForm.role
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {

                    // 显示密码弹窗
                    this.showPasswordDialog(this.createForm.email, result.data.password);

                    // 重置表单
                    this.createForm = {
                        email: '',
                        nickname: '',
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
                this.userList = []
                this.pagination.total = 0
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/account/page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        page: this.pagination.page,
                        size: this.pagination.size,
                        keyword: this.filter.keyword || undefined,
                        statusList: this.filter.statusList,
                        roleList: this.filter.roleList
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    this.userList = result.data.rows || [];
                    this.userList.forEach(user => {
                        if (user.permission && user.permission.startsWith('[') && user.permission.endsWith(']')) {
                            user.permissionList = JSON.parse(user.permission)
                        } else {
                            user.permissionList = []
                        }
                    });
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
        async showChangePermissionDialog(user) {
            const self = this;

            // 生成复选框HTML
            let checkboxesHtml = '';
            for (const key in this.permissionOptions) {
                const isChecked = user.permissionList && user.permissionList.indexOf(key) !== -1;
                const checkboxId = 'permission-' + key;
                checkboxesHtml += `
                    <div style="margin-bottom: 12px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox"
                                   id="${checkboxId}"
                                   value="${key}"
                                   ${isChecked ? 'checked' : ''}
                                   style="width: 16px; height: 16px; margin-right: 8px; cursor: pointer;">
                            <span style="font-size: 14px; color: #606266;">${this.permissionOptions[key]}</span>
                        </label>
                    </div>
                `;
            }

            const content = `
                <div style="padding: 20px;">
                    <p style="margin-bottom: 15px; font-size: 14px; color: #606266;">
                        为用户 <strong>${user.email}</strong> 设置权限：
                    </p>
                    <div style="background: #f5f7fa; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                        ${checkboxesHtml}
                    </div>
                    <p style="font-size: 12px; color: #909399;">
                        请勾选需要授予的权限，可以不选择任何权限。
                    </p>
                </div>
            `;

            window.$dialog({
                title: '编辑用户权限',
                content: content,
                width: 'w-120',
                showFooter: true,
                cancelText: '取消',
                confirmText: '保存',
                onConfirm: async function () {
                    // 收集选中的权限
                    const selectedPermissions = [];
                    for (const key in self.permissionOptions) {
                        const checkbox = document.getElementById('permission-' + key);
                        if (checkbox && checkbox.checked) {
                            selectedPermissions.push(key);
                        }
                    }

                    // 调用API保存
                    try {
                        const response = await fetchWithToken(self.apiBaseUrl + '/tengu/account/permission/update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: user.id,
                                permissionList: selectedPermissions
                            })
                        });

                        const result = await response.json();

                        if (result.resultCode === 1) {
                            window.$message('权限更新成功', 'success');
                            self.fetchUserList();
                        } else {
                            window.$message(result.message || '权限更新失败', 'error');
                            throw new Error(result.message || '权限更新失败');
                        }
                    } catch (error) {
                        console.error('更新权限错误:', error);
                        window.$message('权限更新失败: ' + error.message, 'error');
                        throw error;
                    }
                }
            });
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

        showEditUserDialog(user) {
            const self = this;

            const content = `
                <div style="padding: 20px;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 6px;">昵称</label>
                        <input id="edit-user-nickname"
                               type="text"
                               value="${user.nickname || ''}"
                               placeholder="请输入飞书中的用户真名，用于@消息提醒"
                               style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;" />
                    </div>
                </div>
            `;

            window.$dialog({
                title: '编辑用户信息',
                content: content,
                width: 'w-96',
                showFooter: true,
                cancelText: '取消',
                confirmText: '保存',
                onConfirm: async function () {
                    const nickname = document.getElementById('edit-user-nickname').value.trim();

                    try {
                        const response = await fetchWithToken(self.apiBaseUrl + '/tengu/account/user/update', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: user.id, nickname: nickname })
                        });

                        const result = await response.json();

                        if (result.resultCode === 1) {
                            window.$message('保存成功', 'success');
                            self.fetchUserList();
                        } else {
                            window.$message(result.message || '保存失败', 'error');
                            throw new Error(result.message || '保存失败');
                        }
                    } catch (error) {
                        console.error('编辑用户信息错误:', error);
                        window.$message('保存失败: ' + error.message, 'error');
                        throw error;
                    }
                }
            });
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

            window.$dialog({
                title: '用户&密码设置成功',
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

        toggleFilter(field, value) {
            const idx = this.filter[field].indexOf(value);
            if (idx !== -1) {
                this.filter[field].splice(idx, 1);
            } else {
                this.filter[field].push(value);
            }
            this.handleSearch();
        },

        handleSearch() {
            this.pagination.page = 1;
            this.fetchUserList();
        },

        resetFilter() {
            this.filter.keyword = '';
            this.filter.statusList = ['1'];
            this.filter.roleList = [];
            this.handleSearch();
        },

        handlePageChange(page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }
            this.pagination.page = page;
            this.fetchUserList();
        },

        formatTime(timestamp) {
            if (!timestamp) {
                return ""
            }

            return timestamp.timestamp2yyyymmddhmShangHaiTime()
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
