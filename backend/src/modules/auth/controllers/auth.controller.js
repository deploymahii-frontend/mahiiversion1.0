import AuthService from "../auth.service.js";

class AuthController {
  async signup(req, res, next) {
    try {
      const result = await AuthService.signup(req.body);

      return res.status(201).json({
        success: true,
        message: "Account created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { phone, email, password } = req.body;

      const result = await AuthService.login({
        mobile: phone,
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async firebaseSync(req, res, next) {
    try {
      const firebaseUser = req.firebaseUser;
      
      const result = await AuthService.firebaseSync(firebaseUser);

      return res.status(200).json({
        success: true,
        message: "Firebase sync successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const result =
        await AuthService.refreshToken(refreshToken);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await AuthService.logout(req.user.id);

      return res.status(200).json({
        success: true,
        message: "Logged out successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
