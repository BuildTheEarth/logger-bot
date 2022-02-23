export default function humanizeConstant(name) {
    return name
        .split("_")
        .map(word => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(" ")
}
