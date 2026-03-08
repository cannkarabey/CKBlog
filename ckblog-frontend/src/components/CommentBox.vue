<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { MessageSquare, Send, LogIn } from "lucide-vue-next";

const auth = useAuthStore();
const { locale } = useI18n();
const text = ref("");
const submitted = ref(false);

function submit() {
  if (!auth.isAuthed) return;
  submitted.value = true;
  text.value = "";
  setTimeout(() => (submitted.value = false), 3000);
}
</script>

<template>
  <div class="comment-section">
    <!-- Header -->
    <div class="comment-header">
      <MessageSquare class="comment-header-icon" />
      <h3 class="comment-title">{{ locale === 'tr' ? 'Yorumlar' : 'Comments' }}</h3>
    </div>

    <!-- Comment form -->
    <div class="comment-form">
      <textarea
        v-model="text"
        class="comment-textarea"
        rows="4"
        :placeholder="locale === 'tr' ? 'Düşüncelerini paylaş...' : 'Share your thoughts...'"
        :disabled="!auth.isAuthed"
      ></textarea>

      <div class="comment-form-footer">
        <!-- Not logged in message -->
        <div v-if="!auth.isAuthed" class="comment-auth-msg">
          <LogIn class="auth-msg-icon" />
          <span>{{ locale === 'tr' ? 'Yorum yapmak için giriş yapmalısın.' : 'Sign in to leave a comment.' }}</span>
        </div>

        <!-- Success message -->
        <div v-else-if="submitted" class="comment-success">
          {{ locale === 'tr' ? 'Yorum gönderildi!' : 'Comment submitted!' }}
        </div>

        <div v-else class="comment-spacer"></div>

        <button
          class="comment-submit"
          :disabled="!auth.isAuthed || !text.trim()"
          @click="submit"
        >
          <Send class="submit-icon" />
          <span>{{ locale === 'tr' ? 'Gönder' : 'Submit' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.comment-header-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-accent);
}
.comment-title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.comment-textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 120px;
}
.comment-textarea::placeholder {
  color: var(--color-text-muted);
}
.comment-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
}
.comment-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.comment-form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.comment-auth-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-weight: 500;
}
.auth-msg-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.6;
}

.comment-success {
  font-size: 0.8125rem;
  color: var(--color-success);
  font-weight: 600;
}

.comment-spacer {
  flex: 1;
}

.comment-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: 9999px;
  border: none;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: filter 0.2s ease, opacity 0.2s ease;
}
.comment-submit:hover:not(:disabled) {
  filter: brightness(1.1);
}
.comment-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.submit-icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
