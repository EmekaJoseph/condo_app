import { $instance, $instanceUnderground } from './instances'

export default {
    recents() {
        return $instance.get(`public/recents`)
    },

    search(str: string) {
        return $instanceUnderground.get(`public/search/${str}`)
    },

    details(id: any) {
        return $instance.get(`public/deceased/${id}`)
    },

    condolences(id: any) {
        return $instanceUnderground.get(`public/condolences/${id}`)
    },

    postCondolence(obj: any) {
        return $instance.post(`public/condolences`, JSON.stringify(obj))
    },
}