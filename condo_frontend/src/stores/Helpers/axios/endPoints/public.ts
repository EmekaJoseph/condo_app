import { $instance } from '../instances'

export default {
    recents() {
        return $instance.get(`deceased/recents`)
    },
}