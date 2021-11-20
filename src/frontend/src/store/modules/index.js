// Automatically imports all the modules and exports as a single module object
const requireContext = require.context('../../modules/', true, /store\.js$/);

export default requireContext.keys().reduce((modules, filename) => {
  const moduleName = filename
    .split('/')[1]
    .replace(/^\w/, c => c.toUpperCase());
  modules[moduleName] =
    requireContext(filename).default || requireContext(filename);
  return modules;
}, {});
