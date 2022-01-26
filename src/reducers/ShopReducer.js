const ShopReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case "SELECT_FOLDER":
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childItems: [],
        childFolders: [],
        recipients: [],
      };
    case "UPDATE_FOLDER":
      return {
        ...state,
        folder: payload.folder,
      };
    case "SET_CHILD_FOLDERS":
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case "SET_CHILD_FILES":
      return {
        ...state,
        childItems: payload.childItems,
      };
    case "SET_RECIPIENTS":
      return {
        ...state,
        recipients: payload.recipients,
      };
    default:
      return state;
  }
};
export default ShopReducer;
