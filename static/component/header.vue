<style scoped>
.header-container {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-right-item {
    /* background: red; */
    /* margin-left: 10px; */
}

.logout-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
}

.logout-btn:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
}

.logout-btn:focus {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
    ring-color: #6366f1;
}

.logout-btn:active {
    background-color: #f3f4f6;
}

/* Dark mode support */
.dark .header-title {
    color: #f9fafb;
}

.dark .logout-btn {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
}

.dark .logout-btn:hover {
    background-color: #4b5563;
    border-color: #6b7280;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.75rem;
    color: #374151;
}

.user-info-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
}

.user-info-label {
    font-weight: 500;
    color: #6b7280;
}

.user-info-value {
    font-weight: 600;
    color: #111827;
}

.dark .user-info {
    color: #f9fafb;
}

.dark .user-info-label {
    color: #9ca3af;
}

.dark .user-info-value {
    color: #f9fafb;
}
</style>

<template>
    <div class="header-container">
        <h1 class="header-title">{{ title }}</h1>
        <div class="header-right">
            <!-- 插槽：允许父组件传入自定义按钮 -->
            <slot></slot>

            <!-- 用户信息显示 -->
            <div class="user-info header-right-item" v-if="currentLoginAccount.email">
                <div class="user-info-item">
                    <!-- <span class="user-info-label">邮箱:</span> -->
                    <span class="user-info-value">{{ currentLoginAccount.email }}</span>
                </div>
                <!-- <div class="user-info-item">
                    <span class="user-info-label">总时长:</span>
                    <span class="user-info-value">{{ formatSeconds(currentLoginAccount.totalSeconds) }}</span>
                </div> -->
                <div class="user-info-item">
                    <span class="user-info-label">近24h费用:</span>
                    <span class="user-info-value">¥{{ formatPrice(currentLoginAccount.price_24h) }}</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-label">总费用:</span>
                    <span class="user-info-value">¥{{ formatPrice(currentLoginAccount.totalPrice) }}</span>
                </div>
            </div>

            <!-- 用户管理按钮 -->
            <div style="display: none;" id="user-menu-btn" class="header-right-item">
                <router-link v-if="!isActive('/user')" :to="{ path: '/user', query: {} }">
                    <button class="logout-btn">
                        用户管理
                    </button>
                </router-link>
            </div>

            <!-- 容器列表 -->
            <div style="display: none;" id="container-menu-btn" class="header-right-item">
                <router-link v-if="!isActive('/', '/list')" :to="{ path: '/', query: {} }">
                    <button class="logout-btn">
                        容器组
                    </button>
                </router-link>
            </div>

            <!-- 登出按钮 -->
            <button @click="handleLogout" class="logout-btn header-right-item">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                    </path>
                </svg>
                登出
            </button>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        title: {
            type: String,
            default: '容器组'
        }
    },
    data() {
        return {
            isLoggingOut: false,
            currentLoginAccount: {
                email: "", role: "", nickname: "", permissionList: [],
                totalSeconds: 0, price_24h: 0, totalPrice: 0
            }
        }
    },
    mounted() {
        this.currentLoginAccount = JSON.parse(localStorage.getItem('_current_login_account') || '{}')
        this.menuControlByAccount()
        this.fetchSessionAccount()
    },
    methods: {
        isActive(...paths) {
            for (const v of paths) {
                if (this.$route.path === v) {
                    return true
                }
            }
            return false
        },
        formatSeconds(seconds) {
            if (!seconds || seconds <= 0) {
                return '0秒';
            }
            var days = Math.floor(seconds / 86400);
            var hours = Math.floor((seconds % 86400) / 3600);
            var minutes = Math.floor((seconds % 3600) / 60);
            var secs = Math.floor(seconds % 60);

            var parts = [];
            if (days > 0) parts.push(days + '天');
            if (hours > 0) parts.push(hours + '时');
            if (minutes > 0) parts.push(minutes + '分');
            if (secs > 0 || parts.length === 0) parts.push(secs + '秒');

            return parts.join('');
        },
        formatPrice(price) {
            if (!price && price !== 0) {
                return '0.00';
            }
            return parseFloat(price).toFixed(2);
        },
        async fetchSessionAccount() {
            const response = await fetchWithToken(apiBaseUrl() + '/tengu/account/my', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result?.resultCode !== 1) {
                return
            }

            // console.log(result.data)
            this.currentLoginAccount = result.data || {};
            if (this.currentLoginAccount.permission && this.currentLoginAccount.permission.startsWith('[') && this.currentLoginAccount.permission.endsWith(']')) {
                this.currentLoginAccount.permissionList = JSON.parse(this.currentLoginAccount.permission)
            } else {
                this.currentLoginAccount.permissionList = []
            }
            localStorage.setItem('_current_login_account', JSON.stringify(this.currentLoginAccount));
            this.menuControlByAccount()
        },
        async menuControlByAccount() {
            if (this.currentLoginAccount?.role === 'admin') {
                const userMenuBtn = document.getElementById('user-menu-btn');
                if (userMenuBtn) {
                    // userMenuBtn.style.display = 'inline-flex';
                    userMenuBtn.style.display = 'block';
                    // userMenuBtn.style.display = 'flex';
                }
                const containerMenuBtn = document.getElementById('container-menu-btn');
                if (containerMenuBtn) {
                    // containerMenuBtn.style.display = 'inline-flex';
                    containerMenuBtn.style.display = 'block';
                    // containerMenuBtn.style.display = 'flex';
                }
            }

        },
        async handleLogout() {
            if (this.isLoggingOut) {
                return;
            }

            try {
                this.isLoggingOut = true;

                // 调用登出 API
                const response = await fetchWithToken(apiBaseUrl() + '/tengu/logout', {
                    method: 'GET'
                    // credentials: 'include' // 携带 cookie
                });

                // 无论 API 是否成功，都跳转到登录页
                // 清除可能的本地存储
                if (window.localStorage) {
                    window.localStorage.clear();
                }
                if (window.sessionStorage) {
                    window.sessionStorage.clear();
                }

                // 跳转到登录页
                window.location.href = '#/login';

                // 可选：显示成功消息
                if (window.$message) {
                    window.$message('已退出登录', 'success');
                }
            } catch (error) {
                console.error('Logout error:', error);

                // 即使出错也跳转到登录页
                window.location.href = '#/login';

                if (window.$message) {
                    window.$message('退出登录失败，请重试', 'error');
                }
            } finally {
                this.isLoggingOut = false;
            }
        }
    }
}
</script>
