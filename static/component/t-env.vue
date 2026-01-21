<style scoped>
.iframe-container {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.iframe-container iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}

.iframe-container iframe.dragging {
    pointer-events: none;
}

.drag-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
}

.drag-overlay.active {
    display: block;
}

.control-panel-container {
    position: fixed;
    top: 0;
    right: 0;
    text-align: center;
    width: 500px;
    /* height: 27px; */
    cursor: move;
    user-select: none;
    border-radius: 5px;
    background: rgb(79, 193, 255);
    color: white;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.21);
}

.control-panel-cost {
    padding: 4px 10px;
}
</style>

<template>
    <div class="iframe-container">
        <div class="drag-overlay" :class="{ active: isDragging }"></div>
        <div class="control-panel-container" ref="controlPanel" @mousedown="startDrag"
            v-show="this.controlPanel.costStr"
            :style="{ top: position.y + 'px', left: position.x + 'px', right: 'auto', zIndex: isDragging ? 10000 : 1000 }">
            <div class="control-panel-cost text-xs">
                <!-- 需要展示 cpu/内存/磁盘/网络（丢包率）/时间/成本  -->
                消费:{{ this.controlPanel.costStr }} / 已运行:{{ this.controlPanel.timeElapsedStr }}

                <button @click="releaseItem()" class="text-red-600 hover:text-red-700 cursor-pointer">释放</button>

            </div>
        </div>
        <iframe ref="iframe" id="iframe" :class="{ dragging: isDragging }"></iframe>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            position: { x: 0, y: 0 },
            isDragging: false,
            dragOffset: { x: 0, y: 0 },

            controlPanel: {
                break: false, //break the loop
                costStr: "",
                timeElapsedStr: "",
            }
        }
    },
    mounted() {
        const panel = this.$refs.controlPanel;
        const rect = panel.getBoundingClientRect();

        // 尝试从 localStorage 恢复位置
        this.loadPosition(rect);

        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
        window.addEventListener('resize', this.onWindowResize);
        // document.getElementById('iframe').src=location.hash.split('#')[1]+"?folder=/tmp" 
        document.getElementById('iframe').src = location.hash.split('#')[1]

        setTimeout(async () => {
            let sleepMs = 3000
            while (true) {
                await sleep(sleepMs)
                //todo 控制 sleep
                //todo 控制退出

                if (this.controlPanel.break){
                    break
                }

                await this.refreshControlPanel()
                if (sleepMs < 60000) {
                    sleepMs += 100
                }
            }
        }, 10)

    },
    unmounted() {
        this.controlPanel.break = true
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
        window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
        async refreshControlPanel() {
            const response = await fetch(`${apiBaseUrl()}/tengu/container/control/panel?id=` + this.$route.params.id, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) {
                return
            }

            if (result.resultCode != 1) {
                return
            }

            // Math.round(item.rawData.price * (new Date().getTime()-(item.rawData.createTime))/1000*10000)/10000 }} 

            this.controlPanel.costStr = (Math.round(result.data.price * (result.data.currentTime - result.data.createTime) / 1000 * 10000) / 10000) + " " + result.data.currency
            this.controlPanel.timeElapsedStr = getTimeElapsed(result.data.createTime)


            // result.

            //             {
            //     "resultCode": 1,
            //     "data": {
            //         "id": 20,
            //         "regionId": "cn-shenzhen",
            //         "zoneId": "cn-shenzhen-c",
            //         "cpu": 1,
            //         "memory": 1,
            //         "price": 0.00000389,
            //         "currency": "CNY",
            //         "status": "Running",
            //         "containerGroupStatus": "Running",
            //         "createTime": 1768961698187,
            //         "updateTime": 1768961840092,
            //         "currentTime": 1768965829394,
            //         "metrics": {
            //             "cpu": 100,
            //             "usedCpu": 50,
            //             "mem": 2048,
            //             "usedMem": 1024,
            //             "disk": 10240,
            //             "usedDisk": 5120,
            //             "pingLoss": 1,
            //             "pingLatency": 20
            //         }
            //     }
            // }
            // console.log(result)
        },
        // 释放
        async releaseItem() {
            let id = this.$route.params.id
            try {
                const confirmed = await window.$confirm(`确定要释放计算资源吗?`, '确认释放');
                if (!confirmed) {
                    return;
                }
            } catch (error) {
                return;
            }

            try {

                const response = await fetch(`${apiBaseUrl()}/tengu/instance/deleteContainerGroup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                });

                const result = await response.json();

                if (result.resultCode === 1) {
                    window.$message('释放成功！', 'success');
                    // 刷新列表
                } else if (result.resultCode === 0) {
                    window.$message(result.message || '该容器实例记录已被删除', 'info');
                    // 刷新列表
                } else {
                    window.$message('释放失败: ' + (result.message || '未知错误'), 'error');
                }
            } catch (error) {
                console.error('释放容器组失败:', error);
                window.$message('释放失败: ' + error.message, 'error');
            }
        },
        constrainPosition() {
            // 获取面板的当前尺寸
            const panel = this.$refs.controlPanel;
            if (!panel) return;

            const rect = panel.getBoundingClientRect();

            // 限制位置在窗口内
            this.position.x = Math.max(0, Math.min(this.position.x, window.innerWidth - rect.width));
            this.position.y = Math.max(0, Math.min(this.position.y, window.innerHeight - rect.height));
        },
        loadPosition(rect) {
            try {
                const saved = localStorage.getItem('__controlPanelPosition');
                if (saved) {
                    const savedData = JSON.parse(saved);
                    const savedWindowSize = savedData.windowSize;
                    const savedPos = savedData.position;

                    // 计算相对于窗口的位置比例
                    const relativeX = savedPos.x / savedWindowSize.width;
                    const relativeY = savedPos.y / savedWindowSize.height;

                    // 根据当前窗口尺寸计算新位置
                    let newX = relativeX * window.innerWidth;
                    let newY = relativeY * window.innerHeight;

                    // 确保面板在可视区域内
                    newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
                    newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));

                    this.position.x = newX;
                    this.position.y = newY;
                } else {
                    // 默认位置：右上角
                    this.position.x = window.innerWidth - rect.width;
                    this.position.y = 0;
                }
            } catch (e) {
                // localStorage 出错时使用默认位置
                this.position.x = window.innerWidth - rect.width;
                this.position.y = 0;
            }
        },
        onWindowResize() {
            // 窗口大小改变时，确保面板不超出边界
            this.constrainPosition();
        },
        savePosition() {
            try {
                const data = {
                    position: { x: this.position.x, y: this.position.y },
                    windowSize: { width: window.innerWidth, height: window.innerHeight }
                };
                localStorage.setItem('__controlPanelPosition', JSON.stringify(data));
            } catch (e) {
                // localStorage 可能被禁用或已满，忽略错误
                console.warn('Failed to save position to localStorage:', e);
            }
        },
        startDrag(e) {
            e.preventDefault();
            this.isDragging = true;
            this.dragOffset.x = e.clientX - this.position.x;
            this.dragOffset.y = e.clientY - this.position.y;
        },
        onDrag(e) {
            if (this.isDragging) {
                e.preventDefault();
                this.position.x = e.clientX - this.dragOffset.x;
                this.position.y = e.clientY - this.dragOffset.y;

                // 实时限制位置在窗口内
                this.constrainPosition();
            }
        },
        stopDrag(e) {
            if (this.isDragging) {
                e.preventDefault();
                // 拖动结束时保存位置
                this.savePosition();
            }
            this.isDragging = false;
        }
    }
}
</script>
