import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {

  const userName = ref('')
  const userEmail = ref('')
  const userProfilePic = ref('');
  const cloudBaseUrl = 'https://enterprise-class.sgp1.digitaloceanspaces.com';

  const userAvatar = computed(() => {
    return userProfilePic.value ? `${cloudBaseUrl}/${userProfilePic.value}` : '';
  });

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
    if(payload.profile)
    {
      userProfilePic.value = payload.profile;
    }
  }

  async function fetchUserProfile() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/getProfile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming JWT is stored in localStorage
        }
      })
      const userData = response.data.data[0]
      setUser({
        name: userData.Username,
        email: userData.Email,
        profile: userData.Profile,
        // You can also set other fields here if necessary
      })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        console.error('Error fetching clients:', error.message)
      })
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        console.error('Error fetching history:', error.message)
      })
  }

  fetchUserProfile()

  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser,
    fetchUserProfile, // Make the function available to call from components
    fetchSampleClients,
    fetchSampleHistory
  }
})
