export default function diffParser(arr) {
    return arr.map((item) => {
        if (item[0] === -1) {
            return `~~${item[1]}~~`
        } else if (item[0] === 0) {
            return item[1]
        } else if (item[0] === 1) {
            return `**${item[1]}**`
        }
    }).join("")
}