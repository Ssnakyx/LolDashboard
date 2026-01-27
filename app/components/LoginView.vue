<template>
  <div class="login-overlay">
    <div class="login-card">
      <div class="logo-area"></div>
      <h2 class="glow-text">CONNEXION</h2>
      <p class="subtitle">Connectez-vous ou créez un compte</p>
      
      <div class="input-group">
        <label>PSEUDO</label>
        <input v-model="form.pseudo" type="text" placeholder="Pseudo" />
      </div>
      
      <div class="input-group">
        <label>MOT DE PASSE</label>
        <input v-model="form.password" type="password" placeholder="••••••••" />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <button @click="handleAuth" class="login-btn" :disabled="!isFormValid">
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useAccount } from '../composables/useAccount'

const { login } = useAccount()
const error = ref('')
const form = reactive({ pseudo: '', password: '' })

const isFormValid = computed(() => form.pseudo.length > 2 && form.password.length > 3)

const handleAuth = () => {
  error.value = ''
  const result = login(form.pseudo, form.password)
  if (!result.success) {
    error.value = result.message || 'Erreur de connexion'
  }
}
</script>

<style scoped>
.login-overlay {
  position: fixed; inset: 0; background: radial-gradient(circle, #111827, #020617);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.login-card {
  background: rgba(15, 23, 42, 0.8); padding: 40px; border-radius: 24px;
  border: 1px solid rgba(124, 58, 237, 0.3); text-align: center; width: 350px;
  backdrop-filter: blur(10px); box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.logo-area { font-size: 3rem; margin-bottom: 10px; }
.glow-text { font-size: 1.5rem; color: white; letter-spacing: 4px; font-weight: 900; }
.subtitle { color: #94a3b8; font-size: 0.8rem; margin-bottom: 30px; }
.input-group { text-align: left; margin-bottom: 20px; }
.input-group label { display: block; font-size: 10px; color: #7c3aed; font-weight: 900; margin-bottom: 5px; }
.input-group input {
  width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; color: white; outline: none;
}
.input-group input:focus { border-color: #7c3aed; }
.login-btn {
  width: 100%; padding: 14px; background: #7c3aed; border: none; border-radius: 8px;
  color: white; font-weight: 900; cursor: pointer; transition: 0.3s;
}
.login-btn:hover:not(:disabled) { background: #6d28d9; transform: scale(1.02); }
.login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.error-msg { color: #ef4444; font-size: 0.8rem; margin-bottom: 15px; font-weight: bold; }
</style>