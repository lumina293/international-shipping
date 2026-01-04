/**
 * @typedef {Object} Product
 * @property {string} sku - Stock Keeping Unit
 * @property {string} description - Product description for customs
 * @property {number} quantity - Quantity ordered
 * @property {number} unitPrice - Price per unit in USD
 * @property {number} weight - Weight in kg
 * @property {string} hsCode - Harmonized System code (6-10 digits)
 * @property {string} countryOfOrigin - ISO country code
 */

/**
 * @typedef {Object} Address
 * @property {string} name - Customer name
 * @property {string} company - Company name (optional)
 * @property {string} address1 - Address line 1
 * @property {string} address2 - Address line 2 (optional)
 * @property {string} city - City name
 * @property {string} state - State/Province
 * @property {string} postalCode - Postal/ZIP code
 * @property {string} country - ISO country code (2-letter)
 * @property {string} countryName - Full country name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 */

/**
 * @typedef {Object} ComplianceCheck
 * @property {string} checkType - Type of compliance check
 * @property {string} status - 'passed' | 'warning' | 'blocked'
 * @property {string} message - Human-readable message
 * @property {Object} [details] - Additional details
 */

/**
 * @typedef {Object} CostBreakdown
 * @property {number} subtotal - Items subtotal in USD
 * @property {number} shipping - Shipping cost in USD
 * @property {number} duties - Estimated duties in USD
 * @property {number} taxes - Estimated taxes (VAT/GST) in USD
 * @property {number} total - Total landed cost in USD
 */

/**
 * @typedef {Object} VATInfo
 * @property {string} [vatNumber] - VAT/GST registration number
 * @property {boolean} [validated] - Whether VAT number was validated
 * @property {string} [validationMessage] - Validation result message
 */

/**
 * @typedef {Object} Documentation
 * @property {string} type - 'commercial_invoice' | 'cn22' | 'cn23' | 'country_specific'
 * @property {string} formType - Specific form identifier
 * @property {Object} data - Form data
 * @property {string} [generatedAt] - ISO timestamp
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique order identifier
 * @property {string} orderNumber - Display order number
 * @property {string} status - 'pending' | 'ready_to_ship' | 'pending_review' | 'blocked' | 'shipped'
 * @property {string} createdAt - ISO timestamp
 * @property {Product[]} products - Array of products in order
 * @property {Address} shippingAddress - Shipping destination
 * @property {Address} billingAddress - Billing address
 * @property {ComplianceCheck[]} complianceChecks - Results of compliance screening
 * @property {CostBreakdown} [costBreakdown] - Cost calculation results
 * @property {VATInfo} [vatInfo] - VAT/GST information for B2B
 * @property {Documentation[]} [documentation] - Generated documents
 * @property {string} [holdReason] - Reason for compliance hold
 * @property {Object} [metadata] - Additional order metadata
 */

export default {};