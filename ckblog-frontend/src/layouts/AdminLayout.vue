<script setup lang="ts"></script>
<template>
  <div style="min-height:100%; display:grid; grid-template-columns: 240px 1fr;">
    <aside style="border-right:1px solid var(--border); padding:16px;">Admin Sidebar</aside>
    <main class="container main">
      <RouterView />
    </main>
  </div>
</template>
