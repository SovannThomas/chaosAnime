# Service API

Service générique pour gérer les appels backend.

## Configuration

Par défaut, l'API pointe vers `http://localhost:3000`.

Pour changer l'URL de base, créez un fichier `.env` à la racine du projet front :

```env
VITE_API_URL=http://localhost:3000
```

## Utilisation

### Import

```javascript
import CallBackend from '@/services/api.js'
// ou
import CallBackend from '../services/api.js'
```

### Méthodes disponibles

#### GET
```javascript
// Simple GET
const data = await CallBackend.get('/animes')

// GET avec paramètres
const data = await CallBackend.get('/animes', { page: 1, limit: 10 })
// => /animes?page=1&limit=10
```

#### POST
```javascript
const newAnime = await CallBackend.post('/animes', {
  title: 'Naruto',
  genre: 'Action'
})
```

#### PUT
```javascript
const updated = await CallBackend.put('/animes/123', {
  title: 'Naruto Shippuden'
})
```

#### PATCH
```javascript
const patched = await CallBackend.patch('/animes/123', {
  title: 'Naruto Shippuden'
})
```

#### DELETE
```javascript
await CallBackend.delete('/animes/123')
```

### Gestion des erreurs

```javascript
try {
  const data = await CallBackend.get('/animes')
} catch (error) {
  console.error('Erreur:', error.message)
}
```

### Authentification

Le service gère automatiquement les tokens d'authentification :

```javascript
// Définir le token
CallBackend.setToken('your-jwt-token')

// Le token sera automatiquement inclus dans toutes les requêtes
const data = await CallBackend.get('/protected-route')

// Supprimer le token
CallBackend.setToken(null)
```

## Exemple complet dans un composant Vue

```vue
<script setup>
import { ref, onMounted } from 'vue'
import CallBackend from '../services/api.js'

const animes = ref([])
const loading = ref(false)
const error = ref(null)

const fetchAnimes = async () => {
  loading.value = true
  error.value = null
  
  try {
    animes.value = await CallBackend.get('/animes')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAnimes()
})
</script>
```

