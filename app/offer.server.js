const OFFERS = [
    {
      id: 1,
      title: "One time offer #1",
      productTitle: "Lifetime Warranty",
      productImageURL:
        "https://hoperings.com/cdn/shop/files/UpsellImages-1.png?v=1746448954", // Replace this with the product image's URL.
      productDescription: ["Upgrade to our Lifetime Guarantee and enjoy worry-free ownership of all items in your order. We've got you covered no matter what! For repairs, replacements, and adjustments — forever. Protect your jewellery today and cherish it for a lifetime "],
      originalPrice: "30.00",
      discountedPrice: "30.00",
      changes: [
        {
          type: "add_variant",
          variantID: 46311469809909, // Replace with the variant ID.
          quantity: 1,
          discount: {
            value: 50,
            valueType: "percentage",
            title: "50% off",
          },
        },
      ],
    },
    {
        id: 2,
        title: "Second time offer #2",
        productTitle: "Gift Bag with Ribbon",
        productImageURL:
          "https://hoperings.com/cdn/shop/products/1_1.jpg?v=1672696232", // Replace this with the product image's URL.
        productDescription: ["The perfect gift deserves the perfect presentation.&nbsp;Complete your gift and make your loved one feel even more special."],
        originalPrice: "6.99",
        discountedPrice: "6.99",
        changes: [
          {
            type: "add_variant",
            variantID: 43566062010613, // Replace with the variant ID.
            quantity: 1,
            discount: {
              value: 50,
              valueType: "percentage",
              title: "50% off",
            },
          },
        ],
      },
      {
          id: 3,
          title: "Third time offer #3",
          productTitle: "First-In-Line Priority Processing",
          productImageURL:
            "https://hoperings.com/cdn/shop/files/Crown.jpg?v=1741277144", // Replace this with the product image's URL.
          productDescription: ["Don't want to wait any longer?&nbsp;Skip the line and have your order processed first."],
          originalPrice: "5.00",
          discountedPrice: "5.00",
          changes: [
            {
              type: "add_variant",
              variantID: 40814408597675, // Replace with the variant ID.
              quantity: 1,
              discount: {
                value: 50,
                valueType: "percentage",
                title: "50% off",
              },
            },
          ],
        }
  ];
  
  /*
   * For testing purposes, product information is hardcoded.
   * In a production application, replace this function with logic to determine
   * what product to offer to the customer.
   */
  export function getOffers() {
    console.log("offer loaded");
    return OFFERS;
  }
  
  /*
   * Retrieve discount information for the specific order on the backend instead of relying
   * on the discount information that is sent from the frontend.
   * This is to ensure that the discount information is not tampered with.
   */
  export function getSelectedOffer(offerId) {
    return OFFERS.find((offer) => offer.id === offerId);
  }