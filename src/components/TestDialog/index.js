import dialog from './index.vue'
import Portal from './Portal'

const p = new Portal(dialog)
export default p.render.bind(p)