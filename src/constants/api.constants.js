module.exports = {
  container: {
    folder: '/container/folder/', // attach object hash
    object: '/container/object/', // attach object hash
    staredObjects: '/container/objects/stared', // attach object hash
    recentObjects: '/container/objects/recent', // attach object hash
    trash: '/container/trash/', // trash base
    upload: '/container/object/upload/',
    newFolder: '/container/folder/new',
    deleteForever: '/container/trash/'
  },
  trash: {
    getTrash: '/container/trash/',
    deleteForever: '/container/trash/'
  }
}