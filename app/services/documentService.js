import { CN_FORM_THRESHOLD } from '../data/constants';
import { calculateOrderSubtotal } from '../data/mockData';

/**
 * Simulate API delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate commercial invoice data
 * US Story 3: Automated Generation of Commercial Invoice
 */
export async function generateCommercialInvoice(order, packageNumber = 1, totalPackages = 1) {
    await delay(300);

    const subtotal = calculateOrderSubtotal(order);
    const valuePerPackage = totalPackages > 1 ? subtotal / totalPackages : subtotal;

    return {
        type: 'commercial_invoice',
        formType: 'COMMERCIAL_INVOICE',
        generatedAt: new Date().toISOString(),
        data: {
            invoiceNumber: `INV-${order.orderNumber.replace('#', '')}`,
            invoiceDate: new Date().toISOString().split('T')[0],
            packageInfo: totalPackages > 1 ? `Package ${packageNumber} of ${totalPackages}` : null,

            seller: {
                name: 'International Shipping Co.',
                address: '123 Export Street',
                city: 'New York',
                state: 'NY',
                postalCode: '10001',
                country: 'United States',
                taxId: 'US123456789',
                phone: '+1 212 555 0100',
                email: 'exports@intlshipping.com'
            },

            buyer: {
                name: order.shippingAddress.name,
                company: order.shippingAddress.company,
                address: order.shippingAddress.address1,
                address2: order.shippingAddress.address2,
                city: order.shippingAddress.city,
                state: order.shippingAddress.state,
                postalCode: order.shippingAddress.postalCode,
                country: order.shippingAddress.countryName,
                phone: order.shippingAddress.phone,
                email: order.shippingAddress.email
            },

            lineItems: order.products.map((product, index) => ({
                lineNumber: index + 1,
                description: product.description,
                hsCode: product.hsCode,
                countryOfOrigin: product.countryOfOrigin,
                quantity: totalPackages > 1 ? Math.ceil(product.quantity / totalPackages) : product.quantity,
                unitValue: product.unitPrice,
                totalValue: totalPackages > 1
                    ? parseFloat(((product.unitPrice * product.quantity) / totalPackages).toFixed(2))
                    : product.unitPrice * product.quantity,
                weight: product.weight * (totalPackages > 1 ? Math.ceil(product.quantity / totalPackages) : product.quantity)
            })),

            totals: {
                subtotal: parseFloat(valuePerPackage.toFixed(2)),
                currency: 'USD'
            },

            shippingInfo: {
                incoterm: 'DAP', // Delivered At Place
                reasonForExport: 'Sale',
                shippingMethod: 'International Express'
            },

            declarations: [
                'I hereby certify that the information on this invoice is true and correct.',
                'The goods described are of the origin stated and comply with all applicable regulations.'
            ]
        }
    };
}

/**
 * Generate CN22 or CN23 customs declaration form
 * US Story 6: Automated Customs Declaration (CN22/CN23) Form Generation
 */
export async function generateCustomsDeclaration(order) {
    await delay(250);

    const subtotal = calculateOrderSubtotal(order);
    const useCN23 = subtotal >= CN_FORM_THRESHOLD;

    const baseData = {
        sender: {
            name: 'International Shipping Co.',
            address: '123 Export Street, New York, NY 10001, USA',
            phone: '+1 212 555 0100'
        },

        recipient: {
            name: order.shippingAddress.name,
            address: `${order.shippingAddress.address1}${order.shippingAddress.address2 ? ', ' + order.shippingAddress.address2 : ''}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.countryName}`,
            phone: order.shippingAddress.phone
        },

        contentType: 'Sale of goods',

        items: order.products.map(product => ({
            description: product.description,
            quantity: product.quantity,
            weight: product.weight * product.quantity,
            value: product.unitPrice * product.quantity,
            hsCode: product.hsCode.substring(0, 6), // CN forms typically use 6-digit
            origin: product.countryOfOrigin
        })),

        totals: {
            totalWeight: order.products.reduce((sum, p) => sum + (p.weight * p.quantity), 0),
            totalValue: subtotal,
            currency: 'USD'
        }
    };

    if (useCN23) {
        return {
            type: 'cn23',
            formType: 'CN23',
            generatedAt: new Date().toISOString(),
            data: {
                ...baseData,
                cn23Number: `CN23-${order.orderNumber.replace('#', '')}`,
                date: new Date().toISOString().split('T')[0],
                licenseNumber: null,
                certificateNumber: null,
                invoiceNumber: `INV-${order.orderNumber.replace('#', '')}`,
                comments: 'Commercial shipment'
            }
        };
    }

    return {
        type: 'cn22',
        formType: 'CN22',
        generatedAt: new Date().toISOString(),
        data: {
            ...baseData,
            gift: false,
            commercialSample: false,
            returnedGoods: false,
            other: true,
            otherExplanation: 'Sale'
        }
    };
}

/**
 * Generate all required documentation for an order
 */
export async function generateAllDocumentation(order, costBreakdown) {
    const packageCount = order.metadata?.packageCount || 1;

    // Generate commercial invoices (one per package if split shipment)
    const invoicePromises = [];
    for (let i = 1; i <= packageCount; i++) {
        invoicePromises.push(generateCommercialInvoice(order, i, packageCount));
    }

    const [commercialInvoices, customsDeclaration] = await Promise.all([
        Promise.all(invoicePromises),
        generateCustomsDeclaration(order)
    ]);

    return {
        commercialInvoices,
        customsDeclaration,
        packageCount
    };
}