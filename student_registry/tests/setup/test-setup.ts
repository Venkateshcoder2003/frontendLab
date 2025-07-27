import * as fs from "fs";
import * as path from "path";

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Setup test data directory
const testDataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(testDataDir)) {
  fs.mkdirSync(testDataDir, { recursive: true });
}

// Clean up test files after each test
afterEach(() => {
  const testFilePath = path.join(testDataDir, "user_data.json");
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
  }

  // Reset singleton instances
  jest.clearAllMocks();
});
