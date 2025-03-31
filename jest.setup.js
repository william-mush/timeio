// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        email: 'test@example.com',
      },
    },
  }),
  signIn: jest.fn(),
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock AudioContext
global.AudioContext = jest.fn().mockImplementation(() => ({
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: { value: 0.5 },
  }),
  createOscillator: jest.fn().mockReturnValue({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: {
      setValueAtTime: jest.fn(),
    },
  }),
  resume: jest.fn(),
})) 