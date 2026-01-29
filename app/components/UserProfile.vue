<template>
  <div class="profile-page">
    <div class="profile-container">
      <header class="profile-header">
        <h2 class="title italic">{{ $t('nav.profile') }}</h2>
        <p class="subtitle">{{ $t('profile.settings') }}</p>
      </header>

      <div class="profile-card">
        <div v-if="!isEditing" class="view-mode">
          <div class="user-info">
            <div class="avatar-circle">{{ user.pseudo.charAt(0).toUpperCase() }}</div>
            <div class="user-text">
              <h3>{{ user.pseudo }}</h3>
              <p class="joined-date">
                Compte crée le {{ user.joinedAt || 'récemment' }}
              </p>
            </div>
          </div>
          <div class="action-group">
            <button @click="startEditing" class="edit-btn">{{ $t('profile.edit') || 'MODIFIER'}}</button>
            <button @click="handleLogout" class="logout-btn">{{ $t('profile.logout') }}</button>
          </div>
        </div>

        <div v-else class="edit-mode">
          <Form @submit="saveChanges" :validation-schema="validationSchema" v-slot="{ errors, isSubmitting }">
            <div class="input-group">
              <label>NOUVEAU PSEUDO</label>
              <Field name="pseudo" v-slot="{ field }" as="input" type="text" />
              <input v-bind="field" type="text" :value="editForm.pseudo" @input="editForm.pseudo = $event.target.value" />
              <p v-if="errors.pseudo" class="field-error">{{ errors.pseudo }}</p>
            </div>
            
            <div class="input-group">
              <label>NOUVEAU MOT DE PASSE</label>
              <Field name="password" v-slot="{ field }" as="input" type="password" />
              <input v-bind="field" type="password" :value="editForm.password" @input="editForm.password = $event.target.value" />
              <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
            </div>
            
            <div class="action-group">
              <button type="submit" class="save-btn" :disabled="isSubmitting">{{ isSubmitting ? 'Enregistrement...' : 'VALIDER' }}</button>
              <button type="button" @click="isEditing = false" class="cancel-btn">ANNULER</button>
            </div>
          </Form>
        </div>
      </div>

      <div v-if="favoriteChampions.length > 0" class="analysis-section">
        <h3 class="section-title">Analyse du Style</h3>
        <div class="analysis-card">
          <p>Rôle de prédilection : <span class="highlight">{{ mainRole }}</span></p>
          <div class="role-bars">
            <div v-for="(count, role) in roleDistribution" :key="role" class="role-row">
              <span class="role-name">{{ role }}</span>
              <div class="progress-bg">
                <div class="progress-fill" :style="{ width: (count / favoriteChampions.length * 100) + '%' }"></div>
              </div>
              <span class="role-count">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="favorites-section">
        <h3 class="section-title">❤️ {{ $t('favorites.title') || 'MES FAVORIS' }} ({{ favoriteChampions.length }})</h3>
        <div v-if="favoriteChampions.length > 0" class="fav-grid">
          <div v-for="champ in favoriteChampions" :key="champ.id" class="fav-item">
            <img :src="champ.icon" class="fav-icon" />
            <div class="fav-info">
              <span class="fav-name">{{ champ.name }}</span>
              <button @click="toggleFavorite(champ.id)" class="remove-btn">{{ $t('favorites.remove') || 'Retirer'}}</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-fav">{{ $t('favorites.empty') || 'Aucun champion favori.'}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAccount } from '../composables/useAccount'
import champions from '../datas/champions'

const { user, logout, toggleFavorite, updateAccount } = useAccount()

const isEditing = ref(false)
const editForm = reactive({ pseudo: '', password: '' })

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

const startEditing = () => {
  editForm.pseudo = user.value.pseudo
  editForm.password = user.value.password
  isEditing.value = true
}

const saveChanges = (values) => {
  updateAccount(values.pseudo, values.password)
  isEditing.value = false
}

const handleLogout = () => { if (confirm("Se déconnecter ?")) logout() }
const favoriteChampions = computed(() => champions.filter(c => user.value.favorites.includes(c.id)))

const roleDistribution = computed(() => {
  const counts = {}
  favoriteChampions.value.forEach(c => {
    c.tags.forEach(t => {
      counts[t] = (counts[t] || 0) + 1
    })
  })
  return counts
})

const mainRole = computed(() => {
  const roles = roleDistribution.value
  return Object.keys(roles).length ? Object.keys(roles).reduce((a, b) => roles[a] > roles[b] ? a : b) : "Inconnu"
})
</script>

<style scoped>
.profile-page { display: flex; justify-content: center; padding: 40px 20px; }
.profile-container { width: 100%; max-width: 700px; }
.profile-header { text-align: center; margin-bottom: 30px; }
.title { font-size: 2.5rem; font-weight: 900; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; color: transparent; }
.subtitle { color: #a855f7; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; }

.profile-card { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(124, 58, 237, 0.3); padding: 30px; border-radius: 24px; margin-bottom: 40px; }
.view-mode, .edit-mode { display: flex; flex-direction: column; gap: 20px; }
.user-info { display: flex; align-items: center; gap: 20px; }
.avatar-circle { width: 60px; height: 60px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: white; }

.joined-date {
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-group { display: flex; gap: 10px; }
.edit-btn, .save-btn { flex: 1; background: #7c3aed; color: white; border: none; padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; }
.logout-btn, .cancel-btn { flex: 1; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ef4444; padding: 12px; border-radius: 12px; cursor: pointer; font-weight: bold; }

.input-group label { display: block; font-size: 0.7rem; color: #7c3aed; font-weight: bold; margin-bottom: 5px; }
.input-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 10px; color: white; outline: none; }
.field-error { color: #ef4444; font-size: 0.75rem; margin-top: 5px; font-weight: bold; }


.analysis-card { background: rgba(11, 16, 32, 0.6); padding: 25px; border-radius: 20px; margin-bottom: 40px; }
.highlight { color: #a855f7; font-weight: 900; text-transform: uppercase; }
.role-bars { margin-top: 20px; display: flex; flex-direction: column; gap: 12px; }
.role-row { display: flex; align-items: center; gap: 15px; }
.role-name { min-width: 80px; font-size: 0.8rem; color: #94a3b8; }
.progress-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: #7c3aed; transition: width 1s ease; }

.section-title { font-size: 1rem; color: #f1f5f9; margin-bottom: 20px; border-left: 4px solid #7c3aed; padding-left: 15px; }
.fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; }
.fav-item { background: rgba(15, 23, 42, 0.6); border-radius: 15px; padding: 10px; display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,255,255,0.05); }
.fav-icon { width: 45px; height: 45px; border-radius: 8px; object-fit: cover; }
.fav-info { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.fav-name { color: #f1f5f9; font-size: 0.9rem; font-weight: 600; }
.remove-btn { background: none; border: none; color: #ef4444; font-size: 0.7rem; cursor: pointer; font-weight: bold; text-align: left; }
.empty-fav { color: #94a3b8; text-align: center; padding: 40px 20px; }
</style>