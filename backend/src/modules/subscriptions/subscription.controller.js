import Subscription from "./subscription.model.js";

export const getCurrentSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findOne({ shop: req.user.shop });

    if (!subscription) {
      subscription = await Subscription.create({
        shop: req.user.shop,
        plan: "FREE",
      });
    }

    res.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const upgradePlan = async (req, res) => {
  try {
    const { plan } = req.body;

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const subscription = await Subscription.findOneAndUpdate(
      { shop: req.user.shop },
      {
        plan,
        status: "ACTIVE",
        startsAt: new Date(),
        expiresAt,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
