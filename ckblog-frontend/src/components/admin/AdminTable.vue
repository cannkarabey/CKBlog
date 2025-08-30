<script setup lang="ts">
interface Column {
  key: string;
  label: string;
}

defineProps<{
  columns: Column[];
  rows: Record<string, any>[];
  actions?: (row: Record<string, any>) => any; // slot ile aksiyon butonları
}>();
</script>

<template>
  <div class="admin-table-wrapper">
    <table class="admin-table">
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
          <th v-if="$slots.actions">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td v-for="c in columns" :key="c.key">{{ r[c.key] }}</td>
          <td v-if="$slots.actions">
            <slot name="actions" :row="r" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
