/**
 * Async handler wrapper - catches async errors and passes to next()
 * @param {Function} fn - Async route handler function
 * @returns {Function} - Wrapped function with error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
