// function filterByInterest(array, comparedArray) {
//     return array.filter(function(items) {
//         console.log(items);
//         return array.filter(function(v) {
//             console.log(v);
//           return v === items
//         }) === comparedArray
//     })
// }

// Compared our comparedArray to our base condition Array.
// Loop -- through the base condition Array and see if any values in comparedArray don't match the values in the base condition Array.
// If -- they do not, that wrong ELEMENT would be noted or discarded right away.
// Else if -- the correct, matching elements should be stored into a new array then passed into the query.

function filterByInterest(array, comparedArray) {
    return array.filter(function (items) {
        comparedArray.filter((compareArrayElements) => {
            console.log("compare items " + items)
            console.log("compare elements " + compareArrayElements)
            console.log(items === compareArrayElements)
        })
    })
}
