import authRepository from "./repositories/auth.repository.js";

export const createUser = (...args) => authRepository.createUser(...args);
export const findById = (...args) => authRepository.findById(...args);
export const findByMobile = (...args) => authRepository.findByMobile(...args);
export const findByMobileWithPassword = (...args) => authRepository.findByMobileWithPassword(...args);
export const updateRefreshToken = (...args) => authRepository.updateRefreshToken(...args);
export const clearRefreshToken = (...args) => authRepository.clearRefreshToken(...args);
export const updateLastLogin = (...args) => authRepository.updateLastLogin(...args);
export const resetLoginAttempts = (...args) => authRepository.resetLoginAttempts(...args);
export const incrementLoginAttempts = (...args) => authRepository.incrementLoginAttempts(...args);
export const lockAccount = (...args) => authRepository.lockAccount(...args);

export default authRepository;
