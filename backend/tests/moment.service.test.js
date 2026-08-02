import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createMoment: vi.fn(),
  findFeed: vi.fn(),
  findByShop: vi.fn(),
  incrementLikes: vi.fn(),
  decrementLikes: vi.fn(),
  incrementViews: vi.fn(),
  incrementShopClicks: vi.fn(),
  findById: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
}));

vi.mock("../src/modules/moments/moment.repository.js", () => ({
  createMoment: mocks.createMoment,
  findFeed: mocks.findFeed,
  findByShop: mocks.findByShop,
  incrementLikes: mocks.incrementLikes,
  decrementLikes: mocks.decrementLikes,
  incrementViews: mocks.incrementViews,
  incrementShopClicks: mocks.incrementShopClicks,
  findMomentById: mocks.findById,
}));

vi.mock("../src/modules/moments/moment.social.model.js", () => ({
  default: {
    findOne: mocks.findOne,
    create: mocks.create,
  },
}));

vi.mock("../src/modules/shops/shop.model.js", () => ({
  default: {
    findById: vi.fn(),
  },
}));

import * as momentService from "../src/modules/moments/moment.service.js";

describe("Moment service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes through location and hashtags to the repository when creating a moment", async () => {
    const createdMoment = {
      _id: "moment-1",
      title: "Fresh paneer thali",
      description: "Fresh paneer thali available today",
      mediaUrl: "https://cdn.example.com/moment.mp4",
      location: "Kolhapur",
      hashtags: ["food", "deals"],
    };

    mocks.createMoment.mockResolvedValue(createdMoment);

    const result = await momentService.createMoment("user-1", {
      description: "Fresh paneer thali available today",
      mediaUrl: "https://cdn.example.com/moment.mp4",
      mediaType: "video",
      location: "Kolhapur",
      hashtags: ["food", "deals"],
      type: "SHOP_PROMOTION",
      status: "PUBLISHED",
    });

    expect(mocks.createMoment).toHaveBeenCalledWith(
      expect.objectContaining({
        creator: "user-1",
        title: "Fresh paneer thali available today",
        description: "Fresh paneer thali available today",
        mediaUrl: "https://cdn.example.com/moment.mp4",
        mediaType: "video",
        location: "Kolhapur",
        hashtags: ["food", "deals"],
        type: "SHOP_PROMOTION",
        status: "PUBLISHED",
      })
    );
    expect(result).toEqual(createdMoment);
  });

  it("toggles a like state and returns the updated count", async () => {
    mocks.findOne.mockResolvedValue(null);
    mocks.create.mockResolvedValue({});
    mocks.incrementLikes.mockResolvedValue({ likes: 12 });

    const result = await momentService.likeMoment("507f1f77bcf86cd799439011", "507f191e810c19729de860ea");

    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({ type: "LIKE" }));
    expect(mocks.incrementLikes).toHaveBeenCalledWith("507f191e810c19729de860ea");
    expect(result).toEqual({ liked: true, likes: 12 });
  });
});
