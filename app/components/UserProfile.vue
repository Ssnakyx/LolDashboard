<template>
  <div class="profile-page">
    <div class="profile-container">
      <header class="profile-header">
        <h2 class="title italic">PROFIL</h2>
        <p class="subtitle">Gestion du compte</p>
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
            <button @click="startEditing" class="edit-btn"> MODIFIER</button>
            <button @click="handleLogout" class="logout-btn">DÉCONNEXION</button>
          </div>
        </div>

        <div v-else class="edit-mode">
          <div class="input-group">
            <label>NOUVEAU PSEUDO</label>
            <input v-model="editForm.pseudo" type="text" />
          </div>
          <div class="input-group">
            <label>NOUVEAU MOT DE PASSE</label>
            <input v-model="editForm.password" type="password" />
          </div>
          <div class="action-group">
            <button @click="saveChanges" class="save-btn" :disabled="!isFormValid">VALIDER</button>
            <button @click="isEditing = false" class="cancel-btn">ANNULER</button>
          </div>
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
        <h3 class="section-title">❤️ MES FAVORIS ({{ favoriteChampions.length }})</h3>
        <div v-if="favoriteChampions.length > 0" class="fav-grid">
          <div v-for="champ in favoriteChampions" :key="champ.id" class="fav-item">
            <img :src="champ.icon" class="fav-icon" />
            <div class="fav-info">
              <span class="fav-name">{{ champ.name }}</span>
              <button @click="toggleFavorite(champ.id)" class="remove-btn">Retirer</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-fav">Aucun champion favori.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useAccount } from '../composables/useAccount'
import champions from '../datas/champions'

const { user, logout, toggleFavorite, updateAccount } = useAccount()

const isEditing = ref(false)
const editForm = reactive({ pseudo: '', password: '' })

const startEditing = () => {
  editForm.pseudo = user.value.pseudo
  editForm.password = user.value.password
  isEditing.value = true
}

const isFormValid = computed(() => editForm.pseudo.length >= 3 && editForm.password.length >= 4)

const saveChanges = () => {
  updateAccount(editForm.pseudo, editForm.password)
  isEditing.value = false
}

const handleLogout = () => { if (confirm("Se déconnecter ?")) logout() }

// Logique pour les favoris et l'analyse
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
/* STYLES EXISTANTS */
.profile-page { display: flex; justify-content: center; padding: 40px 20px; }
.profile-container { width: 100%; max-width: 700px; }
.profile-header { text-align: center; margin-bottom: 30px; }
.title { font-size: 2.5rem; font-weight: 900; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; color: transparent; }
.subtitle { color: #a855f7; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; }

.profile-card { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(124, 58, 237, 0.3); padding: 30px; border-radius: 24px; margin-bottom: 40px; }
.view-mode, .edit-mode { display: flex; flex-direction: column; gap: 20px; }
.user-info { display: flex; align-items: center; gap: 20px; }
.avatar-circle { width: 60px; height: 60px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: white; }

/* STYLE DE LA DATE D'INSCRIPTION */
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
.remove-btn { background: none; border: none; color: #ef4444; font-size: 0.7rem; cursor: pointer; font-weight: bold; }
</style>