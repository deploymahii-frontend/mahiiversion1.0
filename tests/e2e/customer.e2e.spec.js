import {

    test,

    expect

} from "@playwright/test";

test("customer places order", async ({ page }) => {

    await page.goto("/");

    await page.getByText("Explore").click();

    await page.getByText("Veg Thali").click();

    await page.getByRole("button", {

        name: "Add to Cart"

    }).click();

    await page.getByRole("button", {

        name: "Checkout"

    }).click();

    await expect(page).toHaveURL(/checkout/);

});
