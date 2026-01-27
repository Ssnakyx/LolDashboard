import { ref } from 'vue'

const user = ref({
  pseudo: '',
  password: '',
  favorites: [],
  isLoggedIn: false
})

export const useAccount = () => {
  if (process.client) {
    const session = localStorage.getItem('current_session')
    if (session) {
      user.value = JSON.parse(session)
    }
  }

  const login = (pseudo, password) => {
    if (!process.client) return { success: false }

    const accounts = JSON.parse(localStorage.getItem('all_accounts') || '{}')

    if (!accounts[pseudo]) {
      accounts[pseudo] = { pseudo, password, favorites: [] }
      localStorage.setItem('all_accounts', JSON.stringify(accounts))
    } 
    
    if (accounts[pseudo].password !== password) {
      return { success: false, message: 'Mot de passe incorrect' }
    }

    user.value = { ...accounts[pseudo], isLoggedIn: true }
    saveSession()
    return { success: true }
  }

  const updateAccount = (newPseudo, newPassword) => {
    if (!process.client) return
    
    const accounts = JSON.parse(localStorage.getItem('all_accounts') || '{}')
    const oldPseudo = user.value.pseudo

    if (oldPseudo !== newPseudo) {
      delete accounts[oldPseudo]
    }

    accounts[newPseudo] = { 
      pseudo: newPseudo, 
      password: newPassword, 
      favorites: user.value.favorites 
    }

    localStorage.setItem('all_accounts', JSON.stringify(accounts))
    
    user.value.pseudo = newPseudo
    user.value.password = newPassword
    saveSession()
  }

  const toggleFavorite = (championId) => {
    const index = user.value.favorites.indexOf(championId)
    
    if (index > -1) {
      user.value.favorites.splice(index, 1)
    } else {
      user.value.favorites.push(championId)
    }

    saveSession()
    syncWithDatabase()
  }

  const logout = () => {
    user.value = { pseudo: '', password: '', favorites: [], isLoggedIn: false }
    localStorage.removeItem('current_session')
  }
  const saveSession = () => {
    localStorage.setItem('current_session', JSON.stringify(user.value))
  }

  const syncWithDatabase = () => {
    const accounts = JSON.parse(localStorage.getItem('all_accounts') || '{}')
    if (accounts[user.value.pseudo]) {
      accounts[user.value.pseudo].favorites = user.value.favorites
      localStorage.setItem('all_accounts', JSON.stringify(accounts))
    }
  }

  return { 
    user, 
    login, 
    logout, 
    toggleFavorite, 
    updateAccount 
  }
}