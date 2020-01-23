export const setBodyRootClass = (bodyClass, rootClass) => {
  document.body.className = bodyClass;
  document.querySelector(`#root`).className = rootClass;
};
