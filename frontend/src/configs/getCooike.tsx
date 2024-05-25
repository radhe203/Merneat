export default function getCookie(cname: string): string | undefined {
    const value = document.cookie
    const splits = value.split(`${cname}=`)

    if (splits.length === 2) {
        return splits.pop()?.split(';').shift()
    }
    return undefined
}