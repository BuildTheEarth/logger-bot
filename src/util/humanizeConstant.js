export default function humanizeConstant(name, uppercaseExceptions, lowercaseExceptions) {
    return name
        .split("_")
        .map(word => {
            if (uppercaseExceptions.includes(word)) return word.toUpperCase()
            if (lowercaseExceptions.includes(word)) return word.toLowerCase()
            return word[0].toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(" ")
}
