<template>
    <!-- loading  -->
    <div style="display:none;position:fixed;top:0;left:0;z-index: 9999;width: 100%;height: 100%;" id="layer"></div>
    <div class="lds-dual-ring" id="loading"></div>
</template>

<script>
module.exports = {
    data() {
        return {}
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
</style>