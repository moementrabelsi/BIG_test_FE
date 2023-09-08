// Styles
import 'vuetify/styles'
import {aliases, fa} from 'vuetify/iconsets/fa'


// Vuetify
import { createVuetify } from 'vuetify'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import 'vuetify/dist/vuetify.min.css';


export default createVuetify(
  {
    components: {
      VDataTable,
      VDataTableServer,
      VDataTableVirtual,
    },
 icons:{
  defaultSet: 'fa',
  aliases,
  sets: {
    fa,
  }
 }
}
)
