#!/usr/bin/env node

/**
 * PantryShare Setup Script
 * Helps set up the frontend-backend integration
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

console.log('🚀 PantryShare Setup Starting...\n')

/**
 * Check if backend is running
 */
async function checkBackend() {
  console.log('📡 Checking backend connection...')
  
  try {
    const response = await fetch('http://localhost:5000/health')
    const data = await response.json()
    console.log('✅ Backend is running:', data.status)
    return true
  } catch (error) {
    console.log('❌ Backend is not running')
    console.log('   Please start the backend first:')
    console.log('   cd Backend && npm run dev\n')
    return false
  }
}

/**
 * Check environment variables
 */
async function checkEnvironment() {
  console.log('🔧 Checking environment configuration...')
  
  try {
    const envExists = await fs.access('.env').then(() => true).catch(() => false)
    
    if (envExists) {
      console.log('✅ Environment file exists')
    } else {
      console.log('⚠️  Environment file not found, using defaults')
    }

    // Check if API URL is configured
    const apiUrl = process.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    console.log(`📍 API URL: ${apiUrl}`)
    
  } catch (error) {
    console.log('❌ Environment check failed:', error.message)
  }
}

/**
 * Install dependencies if needed
 */
async function checkDependencies() {
  console.log('📦 Checking dependencies...')
  
  try {
    // Check if node_modules exists
    const nodeModulesExists = await fs.access('node_modules').then(() => true).catch(() => false)
    
    if (!nodeModulesExists) {
      console.log('⚠️  Installing dependencies...')
      await execAsync('npm install')
      console.log('✅ Dependencies installed')
    } else {
      console.log('✅ Dependencies already installed')
    }
  } catch (error) {
    console.log('❌ Dependency check failed:', error.message)
  }
}

/**
 * Start development server
 */
async function startDevServer() {
  console.log('🌐 Starting development server...')
  console.log('   Frontend will be available at: http://localhost:5173')
  console.log('   Backend API: http://localhost:5000/api')
  console.log('\n💡 Test the integration by opening browser console and running:')
  console.log('   runIntegrationTests()\n')
  
  try {
    await execAsync('npm run dev')
  } catch (error) {
    console.log('❌ Failed to start dev server:', error.message)
  }
}

/**
 * Main setup function
 */
async function setup() {
  try {
    await checkEnvironment()
    await checkDependencies()
    
    const backendRunning = await checkBackend()
    
    if (backendRunning) {
      console.log('\n🎉 Setup complete! Starting development server...\n')
      await startDevServer()
    } else {
      console.log('\n⚠️  Please start the backend first, then run:')
      console.log('   npm run dev\n')
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Run setup
setup()
