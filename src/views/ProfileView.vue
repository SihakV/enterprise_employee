<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

// Reactive object to store user profile data
const userProfile = reactive({
  name: '',
  email: '',
  userid: '',
  role: '',
  position: '',
  dob: '',
  phone: '',
  salary: '',
  // Add other fields as necessary
});

// Function to fetch user profile
const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/user/getProfile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming JWT is stored in localStorage
      }
    });
    const userData = response.data.data[0];
    userProfile.name = userData.Username;
    userProfile.email = userData.Email;
    userProfile.userid = userData.UserId;
    userProfile.role = userData.RoleId;
    userProfile.position = userData.PositionId;
    userProfile.salary = userData.Salary;
    // Set other fields similarly
    // For example:
    userProfile.dob = userData.Dob;
    userProfile.phone = userData.Phone;

    // Set other fields similarly
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
};

// Fetch user profile when component is mounted
onMounted(fetchUserProfile);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main></SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <CardBox>
        <div class="grid grid-cols-2 gap-4 p-4">

          <div>
            <div class="mb-4">
              <h2 class="font-semibold">ID:</h2>
              <p>{{ userProfile.userid }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Name:</h2>
              <p>{{ userProfile.name }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Email:</h2>
              <p>{{ userProfile.email }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Phone:</h2>
              <p>{{ userProfile.phone }}</p>
            </div>
          </div>

          <div>
            <div class="mb-4">
              <h2 class="font-semibold">Date of Birth:</h2>
              <p>{{ userProfile.dob.substring(0, 10) }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Role:</h2>
              <p>{{ userProfile.role }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Position:</h2>
              <p>{{ userProfile.position }}</p>
            </div>

            <BaseDivider />

            <div class="mb-4">
              <h2 class="font-semibold">Salary:</h2>
              <p>{{ userProfile.salary }}</p>
            </div>
          </div>

        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
