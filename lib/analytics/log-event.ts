import amplitude from 'amplitude-js'

export function logEvent(name: string, props?: Record<string, any>) {
    amplitude.getInstance().logEvent(name, props || {})
}
