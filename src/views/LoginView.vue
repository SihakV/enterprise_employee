<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // Import Axios
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useMainStore } from '@/stores/main'
import { onMounted } from 'vue'

const store = useMainStore()

const form = reactive({
  login: '',
  pass: '',
  remember: false
})

const errorMessage = ref('') // To store error messages

const router = useRouter()

const submit = async () => {
  try {
    const formData = new FormData()
    formData.append('email', form.login)
    formData.append('password', form.pass)
    // Replace `http://yourbackenddomain.com/api/v1/admin/login` with your actual login endpoint
    const response = await axios.post('http://127.0.0.1:8080/api/v1/employee/login', formData)
    // Assuming the token is returned in the response
    const token = response.data.token
    // Store the token in localStorage or sessionStorage
    localStorage.setItem('authToken', token)
    console.log(localStorage.getItem('authToken')); // Use 'authToken' instead of 'token'
    // Redirect to dashboard
    store.fetchUserProfile();
    router.push('/expense')
  } catch (error) {
    // Handle errors (e.g., show error message)
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error
    } else {
      errorMessage.value = 'An error occurred.'
    }
  }
}


</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <!-- Display error message if it exists -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>
        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
          />
        </FormField>
        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember me"
          :input-value="true"
        />
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <!-- <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>