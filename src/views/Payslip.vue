<script setup>
import { mdiCreditCardCheckOutline, mdiCurrencyUsd } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'

// Define payslip data for an employee
const payslips = [
  {
    name: 'John Doe',
    role: 'Software Engineer',
    dateJoined: '2023-01-15',
    employeeID: 'EMP12345',
    amount: 2000,
    datePaid: '2024-01-30',
  },
  {
    name: 'John Doe',
    role: 'Software Engineer',
    dateJoined: '2023-01-15',
    employeeID: 'EMP12345',
    amount: 2000,
    datePaid: '2024-02-30',
  },
  {
    name: 'John Doe',
    role: 'Software Engineer',
    dateJoined: '2023-01-15',
    employeeID: 'EMP12345',
    amount: 2000,
    datePaid: '2024-03-30',
  },
  {
    name: 'John Doe',
    role: 'Software Engineer',
    dateJoined: '2023-01-15',
    employeeID: 'EMP12345',
    amount: 2000,
    datePaid: '2024-04-30',
  },
  // Add more payslip data objects as needed
]

// Function to handle payslip download
const downloadPayslip = (employeeID) => {
  // Implement the logic to generate and download the payslip for the given employeeID
  // You can use a library or method suitable for generating PDFs or other file formats.
  // Example: window.open(`/generate-payslip?employeeID=${employeeID}`, '_blank');
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCreditCardCheckOutline" title="My Payslips" main>
        <!-- You can add a button to download all payslips here if needed -->
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <table class="min-w-full">
          <thead>
            <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date Joined
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Amount Paid
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date of Payment
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through payslips and display each one in a row -->
            <tr v-for="payslip in payslips" :key="payslip.employeeID">
              <td class="px-6 py-4 whitespace-no-wrap">{{ payslip.name }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{{ payslip.role }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{{ payslip.dateJoined }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{{ payslip.employeeID }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">${{ payslip.amount }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{{ payslip.datePaid }}</td>
              <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <BaseButton
                  @click="downloadPayslip(payslip.employeeID)"
                  :icon="mdiDownload"
                  label="Download Payslip"
                  color="primary"
                  rounded-full
                  small
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
