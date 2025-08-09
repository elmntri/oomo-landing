import { toast } from "vue-sonner"

export function useShowToast() {
    return ({
        title,
        description,
        action = {
            label: "ok!",
            onClick: () => {
                return true
            },
        },
    }) => {
        toast(title, {
            description: description,
            action: action,
        })
    }
}
