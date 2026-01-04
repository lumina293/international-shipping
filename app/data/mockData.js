import { ORDER_STATUS, SAMPLE_HS_CODES } from './constants';

/**
 * Mock Orders Database
 * Contains 20+ test orders covering all scenarios from the 10 user stories
 */

export const MOCK_ORDERS = [
    // 1. SUCCESSFUL ORDERS (Clean, no issues)
    {
        id: 'ORD-001',
        orderNumber: '#2024-001',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-15T10:30:00Z',
        products: [
            {
                sku: 'TSH-BLK-M',
                description: "Men's Cotton T-Shirt - Black",
                quantity: 2,
                unitPrice: 25.00,
                weight: 0.2,
                hsCode: SAMPLE_HS_CODES.APPAREL_TSHIRT,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Hans Mueller',
            company: '',
            address1: '123 Hauptstrasse',
            address2: '',
            city: 'Berlin',
            state: 'Berlin',
            postalCode: '10115',
            country: 'DE',
            countryName: 'Germany',
            email: 'hans@example.de',
            phone: '+49 30 12345678'
        },
        billingAddress: {
            name: 'Hans Mueller',
            company: '',
            address1: '123 Hauptstrasse',
            address2: '',
            city: 'Berlin',
            state: 'Berlin',
            postalCode: '10115',
            country: 'DE',
            countryName: 'Germany',
            email: 'hans@example.de',
            phone: '+49 30 12345678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'clean_order',
            totalValue: 50.00
        }
    },

    {
        id: 'ORD-002',
        orderNumber: '#2024-002',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-16T14:20:00Z',
        products: [
            {
                sku: 'BOOK-TECH-001',
                description: 'Programming Guide Book',
                quantity: 1,
                unitPrice: 45.00,
                weight: 0.8,
                hsCode: SAMPLE_HS_CODES.BOOKS,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Sophie Martin',
            company: '',
            address1: '45 Rue de la Paix',
            address2: '',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75002',
            country: 'FR',
            countryName: 'France',
            email: 'sophie@example.fr',
            phone: '+33 1 42 00 00 00'
        },
        billingAddress: {
            name: 'Sophie Martin',
            company: '',
            address1: '45 Rue de la Paix',
            address2: '',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75002',
            country: 'FR',
            countryName: 'France',
            email: 'sophie@example.fr',
            phone: '+33 1 42 00 00 00'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'clean_order_books',
            totalValue: 45.00
        }
    },

    // 2. DE MINIMIS EDGE CASES (US Story 7)
    {
        id: 'ORD-003',
        orderNumber: '#2024-003',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-17T09:15:00Z',
        products: [
            {
                sku: 'JAC-DNM-L',
                description: 'Denim Jacket - Large',
                quantity: 2,
                unitPrice: 80.00,
                weight: 1.2,
                hsCode: SAMPLE_HS_CODES.APPAREL_JACKET,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Marie Dubois',
            company: '',
            address1: '78 Avenue des Champs',
            address2: 'Apt 4B',
            city: 'Lyon',
            state: 'Auvergne-Rhône-Alpes',
            postalCode: '69001',
            country: 'FR',
            countryName: 'France',
            email: 'marie@example.fr',
            phone: '+33 4 78 00 00 00'
        },
        billingAddress: {
            name: 'Marie Dubois',
            company: '',
            address1: '78 Avenue des Champs',
            address2: 'Apt 4B',
            city: 'Lyon',
            state: 'Auvergne-Rhône-Alpes',
            postalCode: '69001',
            country: 'FR',
            countryName: 'France',
            email: 'marie@example.fr',
            phone: '+33 4 78 00 00 00'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'de_minimis_above_threshold',
            totalValue: 160.00,
            deMinimisOptimization: true
        }
    },

    {
        id: 'ORD-004',
        orderNumber: '#2024-004',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-17T11:45:00Z',
        products: [
            {
                sku: 'COSM-LIP-01',
                description: 'Organic Lipstick',
                quantity: 3,
                unitPrice: 15.00,
                weight: 0.05,
                hsCode: SAMPLE_HS_CODES.COSMETICS_CREAM,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Emma Wilson',
            company: '',
            address1: '56 King Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'SW1A 1AA',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'emma@example.co.uk',
            phone: '+44 20 7123 4567'
        },
        billingAddress: {
            name: 'Emma Wilson',
            company: '',
            address1: '56 King Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'SW1A 1AA',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'emma@example.co.uk',
            phone: '+44 20 7123 4567'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'below_de_minimis',
            totalValue: 45.00
        }
    },

    // 3. B2B WITH VAT NUMBER (US Story 9)
    {
        id: 'ORD-005',
        orderNumber: '#2024-005',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-18T08:30:00Z',
        products: [
            {
                sku: 'ELEC-LAP-001',
                description: 'Business Laptop 15"',
                quantity: 5,
                unitPrice: 800.00,
                weight: 2.5,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_LAPTOP,
                countryOfOrigin: 'CN'
            }
        ],
        shippingAddress: {
            name: 'Klaus Schmidt',
            company: 'TechnoGmbH',
            address1: 'Industriestrasse 45',
            address2: '',
            city: 'Munich',
            state: 'Bavaria',
            postalCode: '80331',
            country: 'DE',
            countryName: 'Germany',
            email: 'klaus@technogmbh.de',
            phone: '+49 89 12345678'
        },
        billingAddress: {
            name: 'Klaus Schmidt',
            company: 'TechnoGmbH',
            address1: 'Industriestrasse 45',
            address2: '',
            city: 'Munich',
            state: 'Bavaria',
            postalCode: '80331',
            country: 'DE',
            countryName: 'Germany',
            email: 'klaus@technogmbh.de',
            phone: '+49 89 12345678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'b2b_valid_vat',
            totalValue: 4000.00,
            expectedVatNumber: 'DE123456789'
        }
    },

    {
        id: 'ORD-006',
        orderNumber: '#2024-006',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-18T10:00:00Z',
        products: [
            {
                sku: 'ELEC-PHN-001',
                description: 'Smartphone - 128GB',
                quantity: 10,
                unitPrice: 600.00,
                weight: 0.3,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_PHONE,
                countryOfOrigin: 'CN'
            }
        ],
        shippingAddress: {
            name: 'Jean Dupont',
            company: 'Commerce SARL',
            address1: '12 Boulevard Haussmann',
            address2: '',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75009',
            country: 'FR',
            countryName: 'France',
            email: 'jean@commerce.fr',
            phone: '+33 1 40 00 00 00'
        },
        billingAddress: {
            name: 'Jean Dupont',
            company: 'Commerce SARL',
            address1: '12 Boulevard Haussmann',
            address2: '',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75009',
            country: 'FR',
            countryName: 'France',
            email: 'jean@commerce.fr',
            phone: '+33 1 40 00 00 00'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'b2b_invalid_vat',
            totalValue: 6000.00,
            expectedVatNumber: 'FR999999999' // Invalid for testing
        }
    },

    // 4. DPL SCREENING ISSUES (US Story 4)
    {
        id: 'ORD-007',
        orderNumber: '#2024-007',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-19T13:20:00Z',
        products: [
            {
                sku: 'TSH-WHT-L',
                description: "Men's T-Shirt - White",
                quantity: 1,
                unitPrice: 25.00,
                weight: 0.2,
                hsCode: SAMPLE_HS_CODES.APPAREL_TSHIRT,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'SANCTIONED ENTITY LLC',
            company: 'SANCTIONED ENTITY LLC',
            address1: '100 Blocked Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'E1 6AN',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'contact@sanctioned.example',
            phone: '+44 20 7000 0000'
        },
        billingAddress: {
            name: 'SANCTIONED ENTITY LLC',
            company: 'SANCTIONED ENTITY LLC',
            address1: '100 Blocked Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'E1 6AN',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'contact@sanctioned.example',
            phone: '+44 20 7000 0000'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'dpl_match',
            totalValue: 25.00
        }
    },

    {
        id: 'ORD-008',
        orderNumber: '#2024-008',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-19T15:45:00Z',
        products: [
            {
                sku: 'COSM-CRM-01',
                description: 'Face Cream',
                quantity: 2,
                unitPrice: 30.00,
                weight: 0.15,
                hsCode: SAMPLE_HS_CODES.COSMETICS_CREAM,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'John Smith',
            company: '',
            address1: '789 Common Lane',
            address2: '',
            city: 'Toronto',
            state: 'Ontario',
            postalCode: 'M5H 2N2',
            country: 'CA',
            countryName: 'Canada',
            email: 'john@example.ca',
            phone: '+1 416 555 0123'
        },
        billingAddress: {
            name: 'John Smith',
            company: '',
            address1: '789 Common Lane',
            address2: '',
            city: 'Toronto',
            state: 'Ontario',
            postalCode: 'M5H 2N2',
            country: 'CA',
            countryName: 'Canada',
            email: 'john@example.ca',
            phone: '+1 416 555 0123'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'dpl_false_positive',
            totalValue: 60.00
        }
    },

    // 5. RESTRICTED/DUAL-USE PRODUCTS (US Story 5)
    {
        id: 'ORD-009',
        orderNumber: '#2024-009',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-20T09:00:00Z',
        products: [
            {
                sku: 'ELEC-DRN-001',
                description: 'Consumer Drone with Camera',
                quantity: 1,
                unitPrice: 450.00,
                weight: 1.5,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_DRONE,
                countryOfOrigin: 'CN'
            }
        ],
        shippingAddress: {
            name: 'Li Wei',
            company: '',
            address1: '88 East Nanjing Road',
            address2: 'Unit 1205',
            city: 'Shanghai',
            state: 'Shanghai',
            postalCode: '200002',
            country: 'CN',
            countryName: 'China',
            email: 'liwei@example.cn',
            phone: '+86 21 1234 5678'
        },
        billingAddress: {
            name: 'Li Wei',
            company: '',
            address1: '88 East Nanjing Road',
            address2: 'Unit 1205',
            city: 'Shanghai',
            state: 'Shanghai',
            postalCode: '200002',
            country: 'CN',
            countryName: 'China',
            email: 'liwei@example.cn',
            phone: '+86 21 1234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'dual_use_restricted',
            totalValue: 450.00
        }
    },

    {
        id: 'ORD-010',
        orderNumber: '#2024-010',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-20T11:30:00Z',
        products: [
            {
                sku: 'SOFT-ENC-001',
                description: 'Enterprise Encryption Software',
                quantity: 1,
                unitPrice: 1200.00,
                weight: 0.01,
                hsCode: SAMPLE_HS_CODES.ENCRYPTION_SOFTWARE,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Wang Chen',
            company: 'Tech Solutions Ltd',
            address1: '456 Beijing Road',
            address2: '',
            city: 'Beijing',
            state: 'Beijing',
            postalCode: '100000',
            country: 'CN',
            countryName: 'China',
            email: 'wang@techsolutions.cn',
            phone: '+86 10 8888 8888'
        },
        billingAddress: {
            name: 'Wang Chen',
            company: 'Tech Solutions Ltd',
            address1: '456 Beijing Road',
            address2: '',
            city: 'Beijing',
            state: 'Beijing',
            postalCode: '100000',
            country: 'CN',
            countryName: 'China',
            email: 'wang@techsolutions.cn',
            phone: '+86 10 8888 8888'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'restricted_encryption',
            totalValue: 1200.00
        }
    },

    // 6. PROHIBITED DESTINATIONS (US Story 10)
    {
        id: 'ORD-011',
        orderNumber: '#2024-011',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-21T08:15:00Z',
        products: [
            {
                sku: 'TSH-BLU-M',
                description: "Men's T-Shirt - Blue",
                quantity: 1,
                unitPrice: 25.00,
                weight: 0.2,
                hsCode: SAMPLE_HS_CODES.APPAREL_TSHIRT,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Customer Name',
            company: '',
            address1: 'Address Line 1',
            address2: '',
            city: 'Tehran',
            state: 'Tehran',
            postalCode: '11111',
            country: 'IR',
            countryName: 'Iran',
            email: 'customer@example.ir',
            phone: '+98 21 1234 5678'
        },
        billingAddress: {
            name: 'Customer Name',
            company: '',
            address1: 'Address Line 1',
            address2: '',
            city: 'Tehran',
            state: 'Tehran',
            postalCode: '11111',
            country: 'IR',
            countryName: 'Iran',
            email: 'customer@example.ir',
            phone: '+98 21 1234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'blocked_destination_iran',
            totalValue: 25.00
        }
    },

    {
        id: 'ORD-012',
        orderNumber: '#2024-012',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-21T10:30:00Z',
        products: [
            {
                sku: 'BOOK-FIC-001',
                description: 'Fiction Novel',
                quantity: 1,
                unitPrice: 20.00,
                weight: 0.5,
                hsCode: SAMPLE_HS_CODES.BOOKS,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Customer Name',
            company: '',
            address1: 'Address Line 1',
            address2: '',
            city: 'Havana',
            state: 'La Habana',
            postalCode: '10100',
            country: 'CU',
            countryName: 'Cuba',
            email: 'customer@example.cu',
            phone: '+53 7 123 4567'
        },
        billingAddress: {
            name: 'Customer Name',
            company: '',
            address1: 'Address Line 1',
            address2: '',
            city: 'Havana',
            state: 'La Habana',
            postalCode: '10100',
            country: 'CU',
            countryName: 'Cuba',
            email: 'customer@example.cu',
            phone: '+53 7 123 4567'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'blocked_destination_cuba',
            totalValue: 20.00
        }
    },

    // 7. COUNTRY-SPECIFIC REQUIREMENTS (US Story 8)
    {
        id: 'ORD-013',
        orderNumber: '#2024-013',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-22T09:45:00Z',
        products: [
            {
                sku: 'ELEC-PHN-002',
                description: 'Smartphone - 256GB',
                quantity: 1,
                unitPrice: 700.00,
                weight: 0.3,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_PHONE,
                countryOfOrigin: 'KR'
            }
        ],
        shippingAddress: {
            name: 'Abdullah Al-Rashid',
            company: '',
            address1: 'King Fahd Road',
            address2: 'Building 234',
            city: 'Riyadh',
            state: 'Riyadh',
            postalCode: '11564',
            country: 'SA',
            countryName: 'Saudi Arabia',
            email: 'abdullah@example.sa',
            phone: '+966 11 123 4567'
        },
        billingAddress: {
            name: 'Abdullah Al-Rashid',
            company: '',
            address1: 'King Fahd Road',
            address2: 'Building 234',
            city: 'Riyadh',
            state: 'Riyadh',
            postalCode: '11564',
            country: 'SA',
            countryName: 'Saudi Arabia',
            email: 'abdullah@example.sa',
            phone: '+966 11 123 4567'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'country_specific_saso',
            totalValue: 700.00
        }
    },

    {
        id: 'ORD-014',
        orderNumber: '#2024-014',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-22T14:00:00Z',
        products: [
            {
                sku: 'COSM-SHP-001',
                description: 'Natural Shampoo',
                quantity: 3,
                unitPrice: 18.00,
                weight: 0.5,
                hsCode: SAMPLE_HS_CODES.COSMETICS_CREAM,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Jennifer Thompson',
            company: '',
            address1: '123 Maple Street',
            address2: '',
            city: 'Vancouver',
            state: 'British Columbia',
            postalCode: 'V6B 1A1',
            country: 'CA',
            countryName: 'Canada',
            email: 'jennifer@example.ca',
            phone: '+1 604 555 0199'
        },
        billingAddress: {
            name: 'Jennifer Thompson',
            company: '',
            address1: '123 Maple Street',
            address2: '',
            city: 'Vancouver',
            state: 'British Columbia',
            postalCode: 'V6B 1A1',
            country: 'CA',
            countryName: 'Canada',
            email: 'jennifer@example.ca',
            phone: '+1 604 555 0199'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'country_specific_canada',
            totalValue: 54.00
        }
    },

    // 8. MULTI-PACKAGE SHIPMENTS (US Story 3)
    {
        id: 'ORD-015',
        orderNumber: '#2024-015',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-23T10:20:00Z',
        products: [
            {
                sku: 'JAC-LTH-M',
                description: 'Leather Jacket - Medium',
                quantity: 3,
                unitPrice: 250.00,
                weight: 2.0,
                hsCode: SAMPLE_HS_CODES.APPAREL_JACKET,
                countryOfOrigin: 'IT'
            },
            {
                sku: 'TSH-BLK-M',
                description: "Men's Cotton T-Shirt - Black",
                quantity: 6,
                unitPrice: 25.00,
                weight: 0.2,
                hsCode: SAMPLE_HS_CODES.APPAREL_TSHIRT,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'James Brown',
            company: '',
            address1: '456 Oxford Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'W1D 1BS',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'james@example.co.uk',
            phone: '+44 20 7946 0958'
        },
        billingAddress: {
            name: 'James Brown',
            company: '',
            address1: '456 Oxford Street',
            address2: '',
            city: 'London',
            state: 'Greater London',
            postalCode: 'W1D 1BS',
            country: 'GB',
            countryName: 'United Kingdom',
            email: 'james@example.co.uk',
            phone: '+44 20 7946 0958'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'multi_package_split',
            totalValue: 900.00,
            packageCount: 3
        }
    },

    // 9. HIGH VALUE ORDERS (CN23 forms)
    {
        id: 'ORD-016',
        orderNumber: '#2024-016',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-24T11:00:00Z',
        products: [
            {
                sku: 'JEWEL-GLD-001',
                description: 'Gold Necklace 18K',
                quantity: 1,
                unitPrice: 1500.00,
                weight: 0.05,
                hsCode: SAMPLE_HS_CODES.JEWELRY_GOLD,
                countryOfOrigin: 'IT'
            }
        ],
        shippingAddress: {
            name: 'Yuki Tanaka',
            company: '',
            address1: '1-1-1 Shibuya',
            address2: 'Apartment 305',
            city: 'Tokyo',
            state: 'Tokyo',
            postalCode: '150-0002',
            country: 'JP',
            countryName: 'Japan',
            email: 'yuki@example.jp',
            phone: '+81 3 1234 5678'
        },
        billingAddress: {
            name: 'Yuki Tanaka',
            company: '',
            address1: '1-1-1 Shibuya',
            address2: 'Apartment 305',
            city: 'Tokyo',
            state: 'Tokyo',
            postalCode: '150-0002',
            country: 'JP',
            countryName: 'Japan',
            email: 'yuki@example.jp',
            phone: '+81 3 1234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'high_value_cn23',
            totalValue: 1500.00
        }
    },

    // 10. LOW VALUE ORDERS (CN22 forms)
    {
        id: 'ORD-017',
        orderNumber: '#2024-017',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-24T13:30:00Z',
        products: [
            {
                sku: 'TSH-RED-S',
                description: "Women's T-Shirt - Red Small",
                quantity: 2,
                unitPrice: 22.00,
                weight: 0.18,
                hsCode: SAMPLE_HS_CODES.APPAREL_TSHIRT,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Sarah Johnson',
            company: '',
            address1: '789 Queen Street',
            address2: '',
            city: 'Sydney',
            state: 'New South Wales',
            postalCode: '2000',
            country: 'AU',
            countryName: 'Australia',
            email: 'sarah@example.au',
            phone: '+61 2 9876 5432'
        },
        billingAddress: {
            name: 'Sarah Johnson',
            company: '',
            address1: '789 Queen Street',
            address2: '',
            city: 'Sydney',
            state: 'New South Wales',
            postalCode: '2000',
            country: 'AU',
            countryName: 'Australia',
            email: 'sarah@example.au',
            phone: '+61 2 9876 5432'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'low_value_cn22',
            totalValue: 44.00
        }
    },

    // 11. ADDITIONAL MIXED SCENARIOS
    {
        id: 'ORD-018',
        orderNumber: '#2024-018',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-25T09:00:00Z',
        products: [
            {
                sku: 'ELEC-TAB-001',
                description: 'Tablet Computer 10"',
                quantity: 2,
                unitPrice: 350.00,
                weight: 0.6,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_LAPTOP,
                countryOfOrigin: 'CN'
            }
        ],
        shippingAddress: {
            name: 'Carlos Rodriguez',
            company: '',
            address1: 'Avenida Reforma 234',
            address2: '',
            city: 'Mexico City',
            state: 'Ciudad de México',
            postalCode: '06600',
            country: 'MX',
            countryName: 'Mexico',
            email: 'carlos@example.mx',
            phone: '+52 55 1234 5678'
        },
        billingAddress: {
            name: 'Carlos Rodriguez',
            company: '',
            address1: 'Avenida Reforma 234',
            address2: '',
            city: 'Mexico City',
            state: 'Ciudad de México',
            postalCode: '06600',
            country: 'MX',
            countryName: 'Mexico',
            email: 'carlos@example.mx',
            phone: '+52 55 1234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'electronics_mexico',
            totalValue: 700.00
        }
    },

    {
        id: 'ORD-019',
        orderNumber: '#2024-019',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-25T11:15:00Z',
        products: [
            {
                sku: 'COSM-PRF-001',
                description: 'Designer Perfume 50ml',
                quantity: 1,
                unitPrice: 95.00,
                weight: 0.2,
                hsCode: SAMPLE_HS_CODES.COSMETICS_CREAM,
                countryOfOrigin: 'FR'
            }
        ],
        shippingAddress: {
            name: 'Priya Sharma',
            company: '',
            address1: 'MG Road 456',
            address2: 'Flat 12B',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            country: 'IN',
            countryName: 'India',
            email: 'priya@example.in',
            phone: '+91 22 1234 5678'
        },
        billingAddress: {
            name: 'Priya Sharma',
            company: '',
            address1: 'MG Road 456',
            address2: 'Flat 12B',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            country: 'IN',
            countryName: 'India',
            email: 'priya@example.in',
            phone: '+91 22 1234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'high_tax_india',
            totalValue: 95.00
        }
    },

    {
        id: 'ORD-020',
        orderNumber: '#2024-020',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-26T08:45:00Z',
        products: [
            {
                sku: 'BOOK-COOK-001',
                description: 'Cookbook - Italian Cuisine',
                quantity: 2,
                unitPrice: 35.00,
                weight: 1.2,
                hsCode: SAMPLE_HS_CODES.BOOKS,
                countryOfOrigin: 'US'
            }
        ],
        shippingAddress: {
            name: 'Lucas Silva',
            company: '',
            address1: 'Rua Augusta 789',
            address2: '',
            city: 'São Paulo',
            state: 'São Paulo',
            postalCode: '01305-100',
            country: 'BR',
            countryName: 'Brazil',
            email: 'lucas@example.br',
            phone: '+55 11 91234 5678'
        },
        billingAddress: {
            name: 'Lucas Silva',
            company: '',
            address1: 'Rua Augusta 789',
            address2: '',
            city: 'São Paulo',
            state: 'São Paulo',
            postalCode: '01305-100',
            country: 'BR',
            countryName: 'Brazil',
            email: 'lucas@example.br',
            phone: '+55 11 91234 5678'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'books_brazil',
            totalValue: 70.00
        }
    },

    {
        id: 'ORD-021',
        orderNumber: '#2024-021',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-26T10:30:00Z',
        products: [
            {
                sku: 'ELEC-DRN-002',
                description: 'Consumer Drone Basic Model',
                quantity: 1,
                unitPrice: 180.00,
                weight: 0.8,
                hsCode: SAMPLE_HS_CODES.ELECTRONICS_DRONE,
                countryOfOrigin: 'CN'
            }
        ],
        shippingAddress: {
            name: 'Michael Davis',
            company: '',
            address1: '123 Bay Street',
            address2: 'Suite 401',
            city: 'Toronto',
            state: 'Ontario',
            postalCode: 'M5J 2R8',
            country: 'CA',
            countryName: 'Canada',
            email: 'michael@example.ca',
            phone: '+1 416 555 0177'
        },
        billingAddress: {
            name: 'Michael Davis',
            company: '',
            address1: '123 Bay Street',
            address2: 'Suite 401',
            city: 'Toronto',
            state: 'Ontario',
            postalCode: 'M5J 2R8',
            country: 'CA',
            countryName: 'Canada',
            email: 'michael@example.ca',
            phone: '+1 416 555 0177'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'drone_canada_safe',
            totalValue: 180.00
        }
    },

    {
        id: 'ORD-022',
        orderNumber: '#2024-022',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-27T14:20:00Z',
        products: [
            {
                sku: 'JAC-SPT-L',
                description: 'Sports Jacket - Large',
                quantity: 1,
                unitPrice: 120.00,
                weight: 0.9,
                hsCode: SAMPLE_HS_CODES.APPAREL_JACKET,
                countryOfOrigin: 'VN'
            }
        ],
        shippingAddress: {
            name: 'Anna Kowalski',
            company: '',
            address1: 'Nowy Świat 45',
            address2: '',
            city: 'Warsaw',
            state: 'Mazovia',
            postalCode: '00-042',
            country: 'PL',
            countryName: 'Poland',
            email: 'anna@example.pl',
            phone: '+48 22 123 4567'
        },
        billingAddress: {
            name: 'Anna Kowalski',
            company: '',
            address1: 'Nowy Świat 45',
            address2: '',
            city: 'Warsaw',
            state: 'Mazovia',
            postalCode: '00-042',
            country: 'PL',
            countryName: 'Poland',
            email: 'anna@example.pl',
            phone: '+48 22 123 4567'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'apparel_poland',
            totalValue: 120.00
        }
    },

    {
        id: 'ORD-023',
        orderNumber: '#2024-023',
        status: ORDER_STATUS.PENDING,
        createdAt: '2024-01-27T16:00:00Z',
        products: [
            {
                sku: 'CHEM-IND-001',
                description: 'Industrial Chemical Compound',
                quantity: 1,
                unitPrice: 850.00,
                weight: 5.0,
                hsCode: SAMPLE_HS_CODES.CHEMICALS_INDUSTRIAL,
                countryOfOrigin: 'DE'
            }
        ],
        shippingAddress: {
            name: 'Ahmed Hassan',
            company: 'Industrial Solutions FZE',
            address1: 'Dubai Silicon Oasis',
            address2: 'Building A23',
            city: 'Dubai',
            state: 'Dubai',
            postalCode: '00000',
            country: 'AE',
            countryName: 'United Arab Emirates',
            email: 'ahmed@industrialsolutions.ae',
            phone: '+971 4 123 4567'
        },
        billingAddress: {
            name: 'Ahmed Hassan',
            company: 'Industrial Solutions FZE',
            address1: 'Dubai Silicon Oasis',
            address2: 'Building A23',
            city: 'Dubai',
            state: 'Dubai',
            postalCode: '00000',
            country: 'AE',
            countryName: 'United Arab Emirates',
            email: 'ahmed@industrialsolutions.ae',
            phone: '+971 4 123 4567'
        },
        complianceChecks: [],
        metadata: {
            scenario: 'chemical_dual_use',
            totalValue: 850.00
        }
    }
];

/**
 * Get all orders
 */
export function getAllOrders() {
    return MOCK_ORDERS;
}

/**
 * Get order by ID
 */
export function getOrderById(orderId) {
    return MOCK_ORDERS.find(order => order.id === orderId);
}

/**
 * Get orders by status
 */
export function getOrdersByStatus(status) {
    return MOCK_ORDERS.filter(order => order.status === status);
}

/**
 * Calculate order subtotal
 */
export function calculateOrderSubtotal(order) {
    return order.products.reduce((sum, product) => {
        return sum + (product.unitPrice * product.quantity);
    }, 0);
}