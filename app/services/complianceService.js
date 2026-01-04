import {
    BLOCKED_COUNTRIES,
    DENIED_PARTIES_MOCK,
    RESTRICTED_HS_CODES,
    COUNTRY_DOCS,
    COMPLIANCE_STATUS
} from '../data/constants';

/**
 * Simulate API delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if destination country is prohibited
 * US Story 10: Prohibited Shipping Destination Check
 */
export async function checkProhibitedDestination(countryCode) {
    await delay(200);

    const blockedCountry = BLOCKED_COUNTRIES.find(c => c.code === countryCode);

    if (blockedCountry) {
        return {
            checkType: 'prohibited_destination',
            status: COMPLIANCE_STATUS.BLOCKED,
            message: `Cannot ship to ${blockedCountry.name} due to ${blockedCountry.reason} restrictions`,
            details: {
                country: blockedCountry.name,
                reason: blockedCountry.reason
            }
        };
    }

    return {
        checkType: 'prohibited_destination',
        status: COMPLIANCE_STATUS.PASSED,
        message: 'Destination country is not restricted',
        details: {}
    };
}

/**
 * Screen customer against Denied Parties List
 * US Story 4: Denied Parties List (DPL) Screening
 */
export async function screenDeniedParties(customerName, companyName = '') {
    await delay(300);

    const nameToCheck = (companyName || customerName).toUpperCase();

    // Check for exact or partial matches
    const match = DENIED_PARTIES_MOCK.find(deniedParty => {
        return nameToCheck.includes(deniedParty) || deniedParty.includes(nameToCheck);
    });

    if (match) {
        // Check if it's a common false positive (e.g., "John Smith")
        const commonNames = ['JOHN SMITH', 'MARY JOHNSON', 'ROBERT WILLIAMS'];
        const isFalsePositive = commonNames.some(common => nameToCheck.includes(common));

        if (isFalsePositive) {
            return {
                checkType: 'dpl_screening',
                status: COMPLIANCE_STATUS.WARNING,
                message: 'Potential DPL match detected (likely false positive)',
                details: {
                    matchedName: match,
                    customerName: nameToCheck,
                    requiresReview: true,
                    falsePositiveLikely: true
                }
            };
        }

        return {
            checkType: 'dpl_screening',
            status: COMPLIANCE_STATUS.BLOCKED,
            message: 'Customer matches Denied Parties List',
            details: {
                matchedName: match,
                customerName: nameToCheck,
                requiresReview: true
            }
        };
    }

    return {
        checkType: 'dpl_screening',
        status: COMPLIANCE_STATUS.PASSED,
        message: 'No match found on Denied Parties List',
        details: {}
    };
}

/**
 * Check for restricted or dual-use products
 * US Story 5: Restricted & Dual-Use Product Check
 */
export async function checkRestrictedProducts(products, destinationCountry) {
    await delay(250);

    const restrictedItems = [];

    for (const product of products) {
        if (RESTRICTED_HS_CODES.includes(product.hsCode)) {
            // Encryption software to China is blocked
            if (product.hsCode === '5D002' && destinationCountry === 'CN') {
                restrictedItems.push({
                    sku: product.sku,
                    description: product.description,
                    hsCode: product.hsCode,
                    severity: 'blocked',
                    reason: 'Export of encryption software to China requires license'
                });
            }
            // Drones to China may require review
            else if (product.hsCode === '8806.92' && destinationCountry === 'CN') {
                restrictedItems.push({
                    sku: product.sku,
                    description: product.description,
                    hsCode: product.hsCode,
                    severity: 'warning',
                    reason: 'Dual-use item - may require export license'
                });
            }
            // Industrial chemicals
            else if (product.hsCode === '2903.69') {
                restrictedItems.push({
                    sku: product.sku,
                    description: product.description,
                    hsCode: product.hsCode,
                    severity: 'warning',
                    reason: 'Dual-use chemical - end-use certification may be required'
                });
            }
        }
    }

    if (restrictedItems.length > 0) {
        const hasBlocked = restrictedItems.some(item => item.severity === 'blocked');

        return {
            checkType: 'restricted_product',
            status: hasBlocked ? COMPLIANCE_STATUS.BLOCKED : COMPLIANCE_STATUS.WARNING,
            message: hasBlocked
                ? 'Order contains restricted products requiring export license'
                : 'Order contains dual-use items requiring review',
            details: {
                restrictedItems,
                requiresLicense: hasBlocked
            }
        };
    }

    return {
        checkType: 'restricted_product',
        status: COMPLIANCE_STATUS.PASSED,
        message: 'No restricted or dual-use products detected',
        details: {}
    };
}

/**
 * Validate HS codes for destination country
 * US Story 1: Automated HS Code Assignment & Validation
 */
export async function validateHSCodes(products, destinationCountry) {
    await delay(200);

    const issues = [];

    for (const product of products) {
        // Simulate specific HS code restrictions by country
        // Brazil has strict controls on electronics
        if (destinationCountry === 'BR' && product.hsCode.startsWith('85')) {
            issues.push({
                sku: product.sku,
                hsCode: product.hsCode,
                issue: 'Additional documentation required for electronics imports to Brazil'
            });
        }
    }

    if (issues.length > 0) {
        return {
            checkType: 'hs_code_validation',
            status: COMPLIANCE_STATUS.WARNING,
            message: 'HS codes validated with warnings',
            details: { issues }
        };
    }

    return {
        checkType: 'hs_code_validation',
        status: COMPLIANCE_STATUS.PASSED,
        message: 'All HS codes validated successfully',
        details: {}
    };
}

/**
 * Check country-specific documentation requirements
 * US Story 8: Country-Specific Documentation & Labeling Rules
 */
export async function checkCountryRequirements(destinationCountry, products) {
    await delay(150);

    const requirements = COUNTRY_DOCS[destinationCountry];

    if (requirements) {
        return {
            checkType: 'country_specific_requirements',
            status: COMPLIANCE_STATUS.WARNING,
            message: `${requirements.name} required`,
            details: {
                country: destinationCountry,
                requiredDocs: requirements.required,
                description: requirements.name
            }
        };
    }

    return {
        checkType: 'country_specific_requirements',
        status: COMPLIANCE_STATUS.PASSED,
        message: 'No special country requirements',
        details: {}
    };
}

/**
 * Run all compliance checks for an order
 */
export async function runAllComplianceChecks(order) {
    const checks = await Promise.all([
        checkProhibitedDestination(order.shippingAddress.country),
        screenDeniedParties(
            order.shippingAddress.name,
            order.shippingAddress.company
        ),
        checkRestrictedProducts(order.products, order.shippingAddress.country),
        validateHSCodes(order.products, order.shippingAddress.country),
        checkCountryRequirements(order.shippingAddress.country, order.products)
    ]);

    return checks;
}