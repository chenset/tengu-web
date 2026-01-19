<template>
    <!-- loading  -->
    <div style="display:none;position:fixed;top:0;left:0;z-index: 9999;width: 100%;height: 100%;" id="layer"></div>
    <div class="lds-dual-ring" id="loading"></div>

    <!-- 消息提示框 -->
    <transition name="message-fade">
        <div v-if="messageBox.visible" :class="['message-box', `message-${messageBox.type}`]">
            <div class="message-content">
                <svg v-if="messageBox.type === 'success'" class="message-icon" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
                </svg>
                <svg v-if="messageBox.type === 'error'" class="message-icon" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
                </svg>
                <svg v-if="messageBox.type === 'warning'" class="message-icon" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
                </svg>
                <svg v-if="messageBox.type === 'info'" class="message-icon" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
                </svg>
                <span class="message-text">{{ messageBox.message }}</span>
            </div>
        </div>
    </transition>

    <!-- 确认对话框 -->
    <transition name="dialog-fade">
        <div v-if="confirmBox.visible" class="dialog-overlay" @click="handleConfirmCancel">
            <div class="dialog-wrapper" @click.stop>
                <div class="dialog-container">
                    <div class="dialog-header">
                        <span class="dialog-title">{{ confirmBox.title }}</span>
                        <button class="dialog-close" @click="handleConfirmCancel">
                            <svg viewBox="0 0 1024 1024" width="14" height="14">
                                <path fill="currentColor"
                                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                            </svg>
                        </button>
                    </div>
                    <div class="dialog-body">
                        <svg class="dialog-icon dialog-icon-warning" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
                        </svg>
                        <div class="dialog-message">{{ confirmBox.message }}</div>
                    </div>
                    <div class="dialog-footer">
                        <button class="dialog-btn dialog-btn-default" @click="handleConfirmCancel">取消</button>
                        <button class="dialog-btn dialog-btn-primary" @click="handleConfirmOk">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
module.exports = {
    data() {
        return {
            messageBox: {
                visible: false,
                message: '',
                type: 'info', // success, error, warning, info
                duration: 3000
            },
            confirmBox: {
                visible: false,
                title: '提示',
                message: '',
                resolve: null,
                reject: null
            }
        }
    },
    mounted() {
        // 全局方法挂载
        if (!window.$message) {
            window.$message = this.showMessage;
        }
        if (!window.$confirm) {
            window.$confirm = this.showConfirm;
        }
        if (!window.$alert) {
            window.$alert = this.showAlert;
        }
    },
    methods: {
        // 显示消息提示
        showMessage(message, type = 'info', duration = 3000) {
            this.messageBox.message = message;
            this.messageBox.type = type;
            this.messageBox.duration = duration;
            this.messageBox.visible = true;

            if (this.messageTimer) {
                clearTimeout(this.messageTimer);
            }

            this.messageTimer = setTimeout(() => {
                this.messageBox.visible = false;
            }, duration);
        },

        // 显示确认对话框
        showConfirm(message, title = '提示') {
            return new Promise((resolve, reject) => {
                this.confirmBox.title = title;
                this.confirmBox.message = message;
                this.confirmBox.visible = true;
                this.confirmBox.resolve = resolve;
                this.confirmBox.reject = reject;
            });
        },

        // 显示警告框（只有确定按钮）
        showAlert(message, title = '提示', type = 'info') {
            return new Promise((resolve) => {
                this.showMessage(message, type, 3000);
                resolve();
            });
        },

        // 确认对话框 - 确定
        handleConfirmOk() {
            if (this.confirmBox.resolve) {
                this.confirmBox.resolve(true);
            }
            this.confirmBox.visible = false;
        },

        // 确认对话框 - 取消
        handleConfirmCancel() {
            if (this.confirmBox.reject) {
                this.confirmBox.reject(false);
            }
            this.confirmBox.visible = false;
        }
    }
}
</script>
<style>
/* Dark mode */
html[class~=dark] .sun {
    display: inline-block;
}

html:not(.dark) .moon {
    position: relative;
    left: -10px;
    display: inline-block;
}

/* 消息提示框样式 */
.message-box {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    min-width: 380px;
    padding: 15px 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s, transform 0.4s;
}

.message-content {
    display: flex;
    align-items: center;
}

.message-icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    flex-shrink: 0;
}

.message-text {
    font-size: 14px;
    line-height: 1;
    color: #606266;
}

.message-success {
    background-color: #f0f9ff;
    border-color: #c6f6d5;
}

.message-success .message-icon {
    color: #67c23a;
}

.message-success .message-text {
    color: #67c23a;
}

.message-error {
    background-color: #fef0f0;
    border-color: #fde2e2;
}

.message-error .message-icon {
    color: #f56c6c;
}

.message-error .message-text {
    color: #f56c6c;
}

.message-warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
}

.message-warning .message-icon {
    color: #e6a23c;
}

.message-warning .message-text {
    color: #e6a23c;
}

.message-info {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
}

.message-info .message-icon {
    color: #909399;
}

.message-info .message-text {
    color: #909399;
}

/* 消息框动画 */
.message-fade-enter-active {
    animation: message-fade-in 0.3s;
}

.message-fade-leave-active {
    animation: message-fade-out 0.3s;
}

@keyframes message-fade-in {
    0% {
        opacity: 0;
        transform: translate(-50%, -20px);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes message-fade-out {
    0% {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -20px);
    }
}

/* 确认对话框样式 */
.dialog-overlay {
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

.dialog-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-container {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    min-width: 420px;
    max-width: 90%;
}

.dialog-header {
    padding: 20px 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-title {
    font-size: 18px;
    font-weight: 500;
    color: #303133;
    line-height: 1;
}

.dialog-close {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    color: #909399;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-close:hover {
    color: #409eff;
}

.dialog-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    display: flex;
    align-items: flex-start;
}

.dialog-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    flex-shrink: 0;
}

.dialog-icon-warning {
    color: #e6a23c;
}

.dialog-message {
    flex: 1;
    line-height: 24px;
}

.dialog-footer {
    padding: 10px 20px 20px;
    text-align: right;
}

.dialog-btn {
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
    margin-left: 10px;
}

.dialog-btn:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.dialog-btn-default {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
}

.dialog-btn-default:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.dialog-btn-primary {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
}

.dialog-btn-primary:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

/* 对话框动画 */
.dialog-fade-enter-active {
    animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
    animation: dialog-fade-out 0.3s;
}

@keyframes dialog-fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes dialog-fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>