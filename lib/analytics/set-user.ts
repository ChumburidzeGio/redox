import amplitude from "amplitude-js";

export function setUser(id: string) {
    amplitude.getInstance().setUserId(id);
}
