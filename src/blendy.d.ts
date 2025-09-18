declare module 'blendy' {
    export type Blendy = {
        toggle: (key: string) => void
        untoggle: (key: string, cb?: () => void) => void
    }
    export function createBlendy(opts?: { animation?: 'dynamic' | 'static' }): Blendy
}
