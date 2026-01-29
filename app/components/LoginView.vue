<template>
  <div class="login-overlay">
    <div class="login-card">
      <div class="logo-area"></div>
      <h2 class="glow-text">CONNEXION</h2>
      <p class="subtitle">Connectez-vous ou créez un compte</p>
      
      <Form @submit="handleAuth" :validation-schema="validationSchema" v-slot="{ errors, isSubmitting }">
        <div class="input-group">
          <label>PSEUDO</label>
          <Field name="pseudo" v-slot="{ field }" as="input" type="text" placeholder="Pseudo" v-bind="field" />
          <p v-if="errors.pseudo" class="field-error">{{ errors.pseudo }}</p>
        </div>
        
        <div class="input-group">
          <label>MOT DE PASSE</label>
          <Field name="password" v-slot="{ field }" as="input" type="password" placeholder="••••••••" v-bind="field" />
          <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="login-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAccount } from '../composables/useAccount'

const { login } = useAccount()
const error = ref('')

const validationSchema = yup.object({
  pseudo: yup.string()
    .min(3, 'Le pseudo doit avoir au moins 3 caractères')
    .max(20, 'Le pseudo ne doit pas dépasser 20 caractères')
    .required('Le pseudo est requis'),
  password: yup.string()
    .min(4, 'Le mot de passe doit avoir au moins 4 caractères')
    .max(50, 'Le mot de passe ne doit pas dépasser 50 caractères')
    .required('Le mot de passe est requis')
})

const handleAuth = (values) => {
  error.value = ''
  const result = login(values.pseudo, values.password)
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
.field-error { color: #ef4444; font-size: 0.75rem; margin-top: 5px; font-weight: bold; }
</style>