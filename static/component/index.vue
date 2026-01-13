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
        this.position.x = window.innerWidth - rect.width;
        this.position.y = 0;

        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
    },
    methods: {
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
            }
            this.isDragging = false;
        }
    }
}
</script>
