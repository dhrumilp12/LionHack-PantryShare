// Global teardown for tests
export default async function globalTeardown() {
  console.log('🧹 Test environment cleanup complete');
};
  // Clean up any global resources
  if (global.testServer) {
    await global.testServer.close();
  }
  
  