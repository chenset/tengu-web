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
    background: rgb(79, 193, 255);
    cursor: move;
    user-select: none;
}
.control-panel-cost{
    padding: 4px 10px;
}

</style>

<template>
    <div class="iframe-container">
        <div class="drag-overlay" :class="{ active: isDragging }"></div>
        <div class="control-panel-container"
             ref="controlPanel"
             @mousedown="startDrag"
             :style="{ top: position.y + 'px', left: position.x + 'px', right: 'auto', zIndex: isDragging ? 10000 : 1000 }">
            <div class="control-panel-cost">
                Cost: 100 RMB
            </div>
        </div>
        <iframe ref="iframe" src="http://192.168.2.147:828/?folder=/tmp" :class="{ dragging: isDragging }"></iframe>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            position: { x: 0, y: 0 },
            isDragging: false,
            dragOffset: { x: 0, y: 0 }
        }
    },
    mounted() {
        const panel = this.$refs.controlPanel;
        const rect = panel.getBoundingClientRect();

        // 尝试从 localStorage 恢复位置
        this.loadPosition(rect);

        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
    },
    methods: {
        loadPosition(rect) {
            try {
                const saved = localStorage.getItem('controlPanelPosition');
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
        savePosition() {
            try {
                const data = {
                    position: { x: this.position.x, y: this.position.y },
                    windowSize: { width: window.innerWidth, height: window.innerHeight }
                };
                localStorage.setItem('controlPanelPosition', JSON.stringify(data));
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
