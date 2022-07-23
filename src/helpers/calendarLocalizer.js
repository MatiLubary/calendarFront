import { format, parse, startOfWeek, getDay } from 'date-fns/esm'
import enUS from 'date-fns/locale/en-US'
import { dateFnsLocalizer } from 'react-big-calendar'



const locales = {
    'en-US': enUS,
  }
  
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  