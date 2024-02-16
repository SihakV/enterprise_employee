import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiCurrencyUsd,
  mdiBagChecked,
  mdiCreditCardCheckOutline
} from '@mdi/js'

export default [
  // {
  //   to: '/dashboard',
  //   icon: mdiMonitor,
  //   label: 'Dashboard'
  // },
  // {
  //   to: '/payslip',
  //   label: 'Payslip',
  //   icon: mdiCreditCardCheckOutline
  // },
  {
    to: '/expense',
    label: 'Expense',
    icon: mdiCurrencyUsd
  },
  {
    to: '/leave',
    label: 'Leave',
    icon: mdiBagChecked
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  // {
  //   to: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline
  // },
  // {
  //   to: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide
  // },
  // {
  //   to: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive
  // },
  // {
  //   to: '/',
  //   label: 'Styles',
  //   icon: mdiPalette
  // },
  // {
  //   to: '/login',
  //   label: 'Login',
  //   icon: mdiLock
  // },
  // {
  //   to: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One'
  //     },
  //     {
  //       label: 'Item Two'
  //     }
  //   ]
  // },
]
