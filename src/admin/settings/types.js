/**
 * @typedef {Object} WordPressGlobals
 * @property {Object} wp - WordPress global object
 * @property {Object} wp.element - WordPress element utilities
 * @property {Object} wp.i18n - WordPress i18n utilities
 * @property {Object} wp.components - WordPress components
 */

/**
 * @typedef {Object} PostNestUser
 * @property {number} id - User ID
 * @property {string} name - User display name
 * @property {string} email - User email
 * @property {string} avatar - User avatar URL
 */

/**
 * @typedef {Object} PostNestCapabilities
 * @property {boolean} canManageOptions - Can manage options
 * @property {boolean} canPublishPosts - Can publish posts
 */

/**
 * @typedef {Object} PostNestSettings
 * @property {string} apiUrl - API base URL
 * @property {string} nonce - WordPress nonce
 * @property {string} adminUrl - WordPress admin URL
 * @property {PostNestUser} user - Current user data
 * @property {PostNestCapabilities} capabilities - User capabilities
 * @property {string} initialRoute - Initial route path
 */

// Extend window object
window.postNestSettings = window.postNestSettings || {}; 