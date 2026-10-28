import { test, expect } from '@playwright/test';

const rooms = [
    {
        name: 'Single',
        price: '£100',
        amenities: ['TV', 'WiFi', 'Safe'],
        id: 1
    },
    {
        name: 'Double',
        price: '£150',
        amenities: ['TV', 'Radio', 'Safe'],
        id: 2
    },
    {
        name: 'Suite',
        price: '£225',
        amenities: ['Radio', 'WiFi', 'Safe'],
        id: 3
    }
];

test('displays the rooms section', async ({ page }) => {
    await page.goto('https://automationintesting.online/#rooms');

    await expect(
        page.getByRole('heading', { name: 'Our Rooms' })
    ).toBeVisible();
});

for (const room of rooms) {
    test(`displays ${room.name} room information`, async ({ page }) => {
        await page.goto('https://automationintesting.online/#rooms');

        // Scope the locator to the current room to avoid matching other rooms.
        const roomCard = page.locator('.room-card').filter({
            has: page.getByRole('heading', {
                name: room.name,
                exact: true
            })
        });

        await expect(roomCard).toHaveCount(1);

        await expect(
            roomCard.getByRole('heading', {
                name: room.name,
                exact: true
            })
        ).toBeVisible();

        await expect(
            roomCard.locator('.card-footer .fw-bold')
        ).toHaveText(`${room.price} per night`);

        const amenities = roomCard.locator('span.badge');

        await expect(amenities).toHaveText(room.amenities);
    });
}

for (const room of rooms) {
    test(`navigates to the ${room.name} room reservation page`, async ({ page }) => {
        await page.goto('https://automationintesting.online/#rooms');

        await page.locator('.room-card').filter({
            has: page.getByRole('heading', {
                name: room.name,
                exact: true
            })
        }).getByRole('link', { name: 'Book now' }).click();

        await expect(page).toHaveURL(
            new RegExp(`/reservation/${room.id}(?:\\?|$)`)
        );
    });
}