<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">用户登录</h1>
                <p class="text-gray-500">请输入您的账户信息</p>
            </div>

            <form @submit.prevent="handleLogin">
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址
                    </label>
                    <input
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="请输入邮箱"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        密码
                    </label>
                    <input
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="请输入密码"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full el-btn el-btn-primary py-3 text-base font-medium"
                >
                    <span v-if="loading" class="el-btn-loading"></span>
                    {{ loading ? '登录中...' : '登录' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            loading: false
        }
    },
    computed: {
        apiBaseUrl() {
            return apiBaseUrl();
        }
    },
    methods: {
        async handleLogin() {
            if (!this.form.email || !this.form.password) {
                window.$message('请填写邮箱和密码', 'warning');
                return;
            }

            this.loading = true;
            try {
                const response = await fetchWithToken(this.apiBaseUrl + '/tengu/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.form.email,
                        password: this.form.password
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    // 保存token
                    if (result.data && result.data.apiAccessToken) {
                        setApiAccessToken(result.data.apiAccessToken);
                    }

                    window.$message('登录成功', 'success');

                    // 跳转到首页
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 500);
                } else {
                    window.$message(result.message || '登录失败', 'error');
                }
            } catch (error) {
                console.error('登录错误:', error);
                window.$message('登录失败: ' + error.message, 'error');
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        // 如果已经登录，直接跳转首页
        if (getApiAccessToken()) {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
/* 使用全局样式，无需额外样式 */
</style>
