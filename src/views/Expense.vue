<script setup>
import { ref, onMounted } from 'vue'
import { mdiCurrencyUsd } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import axios from 'axios';

const showFormPopup = ref(false)
const title = ref('')
const amount = ref(0)
const image = ref(null) // Changed from expenseFile
const description = ref('')
const expenses = ref([]); // To store expenses data

const openFormPopup = () => {
  showFormPopup.value = true
}

console.log(localStorage.getItem('authToken'));

const fetchExpenses = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/expense/getByUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    expenses.value = response.data.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};

onMounted(() => {
  fetchExpenses();
});

const submitExpenseClaim = async () => {
  if (title.value && amount.value && description.value && image.value) {
    const formData = new FormData();
    formData.append('Title', title.value);
    formData.append('Amount', amount.value);
    formData.append('Description', description.value);
    formData.append('image', image.value); // Changed from expenseFile

    try {
      await axios.post('http://localhost:8080/api/v1/expense/create', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Expense submitted successfully');
      closeFormPopup();
      fetchExpenses(); // Fetch expenses again after successful submission
    } catch (error) {
      console.error(error);
      alert('Error submitting expense: ' + error.message);
    }
  } else {
    alert('Please fill in all the required fields.');
  }
};



const closeFormPopup = () => {
  showFormPopup.value = false
}

const handleFileUpload = (event) => {
  image.value = event.target.files[0] // Changed from expenseFile
}

const handleFileDrop = (event) => {
  event.preventDefault()
  image.value = event.dataTransfer.files[0] // Changed from expenseFile
}

const handleDragOver = (event) => {
  event.preventDefault()
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCurrencyUsd" title="My Expenses" main>
        <BaseButton
          @click="openFormPopup"
          label="Submit Expense Claim"
          color="primary"
          rounded-full
          small
          class="hover:bg-green-500"
        />
      </SectionTitleLineWithButton>

      <!-- Expense claim form popup -->
      <div v-if="showFormPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-gray-300 p-10 rounded-lg">
          <form @submit="submitExpenseClaim">
            <div class="mb-4">
              <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
              <input v-model="title" type="text" id="title" name="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="mb-4">
              <label for="amount" class="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
              <input v-model="amount" type="number" id="amount" name="amount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea v-model="description" id="description" name="description" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
            </div>
            <div class="mb-4">
              <label for="proof" class="block text-gray-700 text-sm font-bold mb-2">Proof:</label>
              <input type="file" id="proof" name="proof" accept=".pdf" @change="handleFileUpload" @dragover="handleDragOver" @drop="handleFileDrop" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
              <small class="text-gray-500">Only PDF files will be accepted</small>
            </div>
            <div class="flex justify-end">
              <BaseButton
                type="button"
                @click="closeFormPopup"
                label="Cancel"
                color="secondary"
                rounded-full
                small
                class="mr-2"
              />
              <BaseButton
                type="submit"
                label="Submit"
                color="primary"
                rounded-full
                small
                class="hover:bg-green-500"
              />
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
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Amount</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Description</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Proof of Expense</th>
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in expenses" :key="expense.ExpenseId">
                <td class="px-6 py-4">{{ expense.Title }}</td>
                <td class="px-6 py-4">${{ expense.Amount }}</td>
                <td class="px-6 py-4">{{ expense.Description }}</td>
                <td class="px-6 py-4">
                  <a :href="expense.ExpenseFile" target="_blank" class="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">View File</a>
                </td>
                <td class="px-6 py-4">
                  <span v-if="expense.Status === 1" class="text-orange-500">Pending</span>
                  <span v-else class="text-green-500">Approved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
