<script setup>
import { ref, onMounted } from 'vue'
import { mdiCalendar } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import axios from 'axios';

const cloudBaseUrl = 'https://enterprise-class.sgp1.digitaloceanspaces.com';
const showFormPopup = ref(false)
const title = ref('')
const description = ref('')
const leaveFile = ref(null)
const fromDate = ref(null)
const toDate = ref(null)
const status = ref(null)
const leaveRequests = ref([]); // To store leave requests data

const openFormPopup = () => {
  showFormPopup.value = true
}

console.log(localStorage.getItem('authToken'));

const fetchLeaveRequests = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/leave/getByUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    leaveRequests.value = response.data.data;
    console.log(leaveRequests)
  } catch (error) {
    console.error('Error fetching leave requests:', error);
  }
};

onMounted(() => {
  fetchLeaveRequests();
});


const submitLeaveRequest = async () => {
  const formData = new FormData();
  formData.append('Title', title.value);
  formData.append('Description', description.value);
  formData.append('LeaveDateFrom', fromDate.value); // Changed from leaveDateFrom
  formData.append('LeaveDateTo', toDate.value); // Changed from leaveDateTo
  if (leaveFile.value) {
    formData.append('image', leaveFile.value);
  }

  try {
    await axios.post('http://localhost:8080/api/v1/leave/create', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Leave request submitted successfully');
    FetchLeaveRequests();// Fetch leave requests again after successful submission
  } catch (error) {
    console.error(error);
    alert('Error submitting leave request: ' + error.message);
  }
};

const closeFormPopup = () => {
  showFormPopup.value = false
}

const handleFileUpload = (event) => {
  leaveFile.value = event.target.files[0]
}

const handleFileDrop = (event) => {
  event.preventDefault()
  leaveFile.value = event.dataTransfer.files[0]
}

const handleDragOver = (event) => {
  event.preventDefault()
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCalendar" title="Leave Requests" main>
        <BaseButton @click="openFormPopup" label="Submit Leave Request" color="primary" rounded-full small
          class="hover:bg-green-500" />
      </SectionTitleLineWithButton>

      <!-- Leave request form popup -->
      <div v-if="showFormPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-gray-300 p-10 rounded-lg">
          <form @submit="submitLeaveRequest">
            <div class="mb-4">
              <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
              <input v-model="title" type="text" id="title" name="title"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required>
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea v-model="description" id="description" name="description" rows="4"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required></textarea>
            </div>
            <div class="mb-4">
              <label for="leaveFile" class="block text-gray-700 text-sm font-bold mb-2">Leave File:</label>
              <input type="file" id="leaveFile" name="leaveFile" accept=".pdf" @change="handleFileUpload"
                @dragover="handleDragOver" @drop="handleFileDrop"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required>
              <small class="text-gray-500">Only PDF files will be accepted</small>
            </div>
            <div class="mb-4">
              <label for="fromDate" class="block text-gray-700 text-sm font-bold mb-2">From Date:</label>
              <input v-model="fromDate" type="date" id="fromDate" name="fromDate"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required>
            </div>
            <div class="mb-4">
              <label for="toDate" class="block text-gray-700 text-sm font-bold mb-2">To Date:</label>
              <input v-model="toDate" type="date" id="toDate" name="toDate"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required>
            </div>
            <div class="flex justify-end">
              <BaseButton type="button" @click="closeFormPopup" label="Cancel" color="secondary" rounded-full small
                class="mr-2" />
              <BaseButton type="submit" label="Submit" color="primary" rounded-full small class="hover:bg-green-500" />
            </div>
          </form>
        </div>
      </div>

      <CardBox class="mb-6" has-table>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Title</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Description</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Leave File</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Leave Date (From - To)</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leaveRequest in leaveRequests" :key="leaveRequest.LeaveRequestId">
                <td class="px-6 py-4">{{ leaveRequest.Title }}</td>
                <td class="px-6 py-4">{{ leaveRequest.Description }}</td>
                <td class="px-6 py-4">
                  <a :href="`${cloudBaseUrl}/${leaveRequest.LeaveFile}`" target="_blank" class="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">View File</a>
                </td>
                <td class="px-6 py-4">{{ new Date(leaveRequest.LeaveDateFrom).toISOString().split('T')[0] }} - {{ new Date(leaveRequest.LeaveDateTo).toISOString().split('T')[0] }}</td>
                <td class="px-6 py-4">
                  <span v-if="expense.Status === 1" class="text-orange-500">Pending</span>
                  <span v-else-if="expense.Status === 2" class="text-green-500">Approved</span>
                  <span v-else-if="expense.Status === 0" class="text-red-500">Rejected</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
