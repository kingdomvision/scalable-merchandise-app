import {
    reactExtension,
    Image,
    Text,
    TextBlock,
    Button,
    Icon,
    View,
    Heading,
    InlineLayout,
    BlockStack,
    Pressable,
    useApi,
    // useSessionToken,
    useSettings,
} from '@shopify/ui-extensions-react/checkout';
import React, { useState, useEffect } from 'react';

const thankYouBlock = reactExtension("purchase.thank-you.block.render", () => <ProductOffer />);
export { thankYouBlock };
  
function ProductOffer() {
    const { shop } = useApi();
    const [data, setData] = useState();
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    // Get product from extension settings
    const { thk_product_id } = useSettings();
    // console.log(shop, useSessionToken()); // Log the product to the console for debugging purpose
    
    // Default product data if no product is selected in settings
    const defaultProduct = {
        // id: 'gid://shopify/ProductVariant/50398620909862',
        id: 'gid://shopify/Product/01009180393501',
        // id: '10091803935014',
    };
    
    const getVariantId = (gid) => {
        // return `gid://shopify/ProductVariant/50398620909862`;
        // return `gid://shopify/Product/10091803935014`;
        // return `gid://shopify/ProductVariant/50398620811558`;
        return gid == null ? defaultProduct.id : `gid://shopify/Product/${gid}`;
        // return removeGid(gid) : getVariantId(defaultProduct.id);
    }

    const removeGid = (gid) => {
        // console.log('remove gid', gid);
        if( gid == undefined )
            return 0;
        return gid.length ? gid.split('/').pop() : 0;
    }

    const getCartUrlById = (variantId) => {
        return `${shop?.storefrontUrl}/cart/add?id=${variantId}`;
    };

    const toggleDescription = () => {
        // console.log('toggle desc', isDescriptionVisible);
        setIsDescriptionVisible(!isDescriptionVisible);
    };

    useEffect(() => {
        
        // `session` is built as part of the OAuth process
        const getProductsQuery = {
            query: `
                query GetProduct($id: ID!) {
                product(id: $id) {
                    id
                    title
                    description
                    featuredImage {
                        url(transform: { maxWidth: 100, maxHeight: 100 })
                    }
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    variants(first: 5) {
                        edges {
                            node {
                                id
                                title
                                price {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }`,
            // query: `
            //     query GetVariant($id: ID!) {
            //         productVariant(id: $id) {
            //             id
            //             title
            //             price {
            //                 amount
            //                 currencyCode
            //             }
            //             product {
            //                 description
            //                 featuredImage {
            //                 url
            //                 }
            //             }
            //         }
            //     }`,
            variables: { id: getVariantId(thk_product_id) }
        };

        // const apiVersion = 'unstable';
        const apiVersion = '2025-01';

        fetch(
            `${shop.storefrontUrl}/api/${apiVersion}/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getProductsQuery),
            },
        )
        .then((response) => response.json())
        .then(({data, errors}) => setData(data))
        .catch(console.error);
    }, [shop]);
    console.log(data);
    console.log(thk_product_id);

    // Check if product exists in data
    if (!data?.product) {
        return (
            <BlockStack spacing="loose">
                <View padding="base">
                    <Text>Product not found. Please select a valid product in the extension settings.</Text>
                </View>
            </BlockStack>
        );
    }

    const product = data?.product;
    const imageUrl = product?.featuredImage?.url;
    // const price = product?.variants?.edges?.[0]?.node?.price;
    const getFirstVariant = product?.variants?.edges?.[0]?.node;
    // console.log(getFirstVariant);
    const getFirstVariantId = removeGid(getFirstVariant?.id);
    const price = product?.priceRange?.minVariantPrice;

    // Render the product offer
    return (
        <BlockStack spacing="extraTight">
            <View padding={['none', 'none', 'loose', 'none']}>
            <Heading inlineAlignment="start" level="2">Stay Protected:</Heading>
            </View>
            <InlineLayout columns={['19%', 'fill']} padding="none">
            <View borderRadius="base" overflow="hidden">
                <Image source={imageUrl} alt={product?.title || 'Product image'} />
            </View>
            <View padding={['none', 'base', 'none', 'base']}>
                <View padding={['none', 'none', 'extraTight', 'none']}> <Heading level="3">{product?.title}</Heading> </View>
                <View padding={['none', 'none', 'extraTight', 'none']}> <Text>{price?.currencyCode} {price?.amount}</Text> </View>
                <View padding="none"> 
                    <Pressable onPress={toggleDescription} kind="plain" 
                        accessibilityLabel="View description"> 
                        <InlineLayout spacing="base" columns={['fill', 'auto']}>
                            <Text>Description</Text>
                            <Icon source={isDescriptionVisible ? "chevronUp" : "chevronDown"} />
                        </InlineLayout>
                    </Pressable>
                </View>
            </View>
            </InlineLayout>
            {isDescriptionVisible && (
                <View> 
                    <TextBlock>{product?.description}</TextBlock> 
                </View>
            )}
            <View blockAlignment="end" inlineAlignment="end">
                <Pressable to={getCartUrlById(getFirstVariantId)}>
                <Button variant="primary">Add to my order</Button>
                </Pressable>
            </View>
        </BlockStack>
    );
}
  