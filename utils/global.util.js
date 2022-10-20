const deepCloneObject = (object) => {
    try {
        return structuredClone(object)
    } catch (error) {
        console.log('structuredClone is not supported !!')
        return JSON.parse(JSON.stringify(object))
    }
}

module.exports = {
    deepCloneObject
}