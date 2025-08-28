<script setup lang="ts">
import { useUiStore } from '../stores/ui'
const ui = useUiStore()
</script>
<template>
<button class="btn btn-ghost" @click="ui.toggleTheme()">Tema</button>
</template>