import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Calendar from '@/pages/Calendar'
import CalendarEvent from '@/pages/calendar/CalendarEvent'
import CalendarAppointment from '@/pages/calendar/CalendarAppointment'
import CalendarDay from '@/pages/calendar/CalendarDay'
import CalendarDayResource from '@/pages/calendar/CalendarDayResource'
import CalendarWeek from '@/pages/calendar/CalendarWeek'
import CalendarWeekResource from '@/pages/calendar/CalendarWeekResource'
import CalendarDayProgram from '@/pages/calendar/CalendarDayProgram'
import CalendarWeekProgram from '@/pages/calendar/CalendarWeekProgram'
import CalendarMonth from '@/pages/calendar/CalendarMonth'
import NewReservation from '@/pages/form/NewReservation'
import EditReservation from '@/pages/form/EditReservation'
import Resources from '@/pages/Resources'
import Debug from '@/pages/Debug'

Vue.use(Router)

const config = {
  mode: 'hash',
  base: '/proxy',
  routes: [
    {
      path: '/',
      redirect: 'Index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources
    },
    {
      path: '/calendar',
      component: Calendar,
      children: [
        {
          path: 'event',
          component: CalendarEvent,
          name: 'CalendarEvent'
        },
        {
          path: 'appointments',
          component: CalendarAppointment,
          name: 'CalendarAppointment'
        },
        {
          path: 'day',
          component: CalendarDay,
          name: 'CalendarDay'
        },
        {
          path: 'day-resource',
          component: CalendarDayResource,
          name: 'CalendarDayResource'
        },
        {
          path: '',
          component: CalendarWeek,
          name: 'Calendar'
        },
        {
          path: 'week-resource',
          component: CalendarWeekResource,
          name: 'CalendarWeekResource'
        },
        {
          path: 'week-program',
          component: CalendarWeekProgram,
          name: 'CalendarWeekProgram'
        },
        {
          path: 'day-program',
          component: CalendarDayProgram,
          name: 'CalendarDayProgram'
        },
        {
          path: 'month',
          component: CalendarMonth,
          name: 'CalendarMonth'
        }
      ]
    },
    {
      path: '/form/reservation',
      component: NewReservation,
      name: 'NewReservation'
    },
    {
      path: '/form/reservation/:id',
      component: EditReservation,
      name: 'EditReservation'
    },
    {
      path: '/DEBUG',
      component: Debug,
      name: 'DEBUG'
    },
    // default route, keep at the bottom
    {
      path: '*',
      redirect: '/'
    }
  ]
}

export default new Router(config)
