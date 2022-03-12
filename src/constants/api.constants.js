module.exports = {
  container: {
    folder: '/container/folder/', // attach object hash
    object: '/container/object/', // attach object hash
    staredObjects: '/container/objects/stared', // attach object hash
    recentObjects: '/container/objects/recent', // attach object hash
    trash: '/container/trash/', // trash base
    upload: '/container/bucket/upload/',
    newFolder: '/container/folder/new',
    search: '/identity/user/search?',
    shareDetails: '/container/share/',
    shareByMe: '/container/byme',
    tome: '/container/tome',
    deleteForever: '/container/trash/',
    sharedWithMe: '/container/share/tome',
    sharedByMe: '/container/share/byme',
    browser: '/container/browse/',
    fileRename: '/container/bucket/object/rename',
    bucket: {
      folderCreate: '/container/bucket/folder/create',
      folderRename: '/container/bucket/folder/rename'
    },

  },
  authenticate: {
    sendOTP: '/identity/user/sendOTP',
    verifyOTP: '/identity/user/verifyOTP'
  },
  trash: {
    getTrash: '/container/trash/',
    deleteForever: '/container/trash/'
  },
}