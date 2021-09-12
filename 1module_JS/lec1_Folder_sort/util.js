module.exports = {
    "Images": [".png", ".jpg", ".jpeg", ".gif"],
    "Audio": [".mp3"],
    "Documents": [".pdf", ".txt", ".doc"],
    "Compressed": [".zip"],
    "Videos": [".mkv"]
}
/*
    *   module.exports returns an empty object by default
    *   to export multiple items from this file we can use =>
    *   module.exports.name = "some name", module.exports.ext = extensions
    *   this will return an object of these values as they will be added to empty object
*/