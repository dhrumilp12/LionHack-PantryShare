# PantryShare API Manual Testing Checklist

## Pre-Testing Setup
- [ ] Server is running on port 5000
- [ ] Firebase is connected
- [ ] Postman collection imported
- [ ] Environment variables set

## 1. Health Checks
- [ ] GET `/` - Server status ✅/❌
- [ ] GET `/health` - Health check ✅/❌

**Expected Results:**
- Status 200
- JSON response with server info
- Firebase status should be "Connected"

---

## 2. Authentication
- [ ] POST `/api/auth/register` - User registration ✅/❌
- [ ] POST `/api/auth/login` - User login ✅/❌  
- [ ] POST `/api/auth/refresh-token` - Token refresh ✅/❌
- [ ] POST `/api/auth/logout` - User logout ✅/❌

**Test Data:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User",
  "role": "student"
}
```

**Expected Results:**
- Registration: Status 201, returns user + token
- Login: Status 200, returns user + token
- Token saved in Postman variables

---

## 3. User Management
- [ ] GET `/api/users/profile` - Get user profile ✅/❌
- [ ] PUT `/api/users/profile` - Update profile ✅/❌
- [ ] PUT `/api/users/location` - Update location ✅/❌
- [ ] GET `/api/users/dashboard` - User dashboard ✅/❌
- [ ] GET `/api/users/:id` - Public profile ✅/❌

**Auth Required:** Yes (Bearer token)

**Expected Results:**
- Profile data returned correctly
- Updates reflected in subsequent requests
- Location coordinates validated

---

## 4. Listings Management
- [ ] GET `/api/listings` - Get all listings ✅/❌
- [ ] GET `/api/listings/search` - Search listings ✅/❌
- [ ] POST `/api/listings` - Create listing ✅/❌
- [ ] GET `/api/listings/:id` - Get specific listing ✅/❌
- [ ] PUT `/api/listings/:id` - Update listing ✅/❌
- [ ] POST `/api/listings/:id/claim` - Claim listing ✅/❌
- [ ] PUT `/api/listings/:id/status` - Update status ✅/❌
- [ ] DELETE `/api/listings/:id` - Delete listing ✅/❌

**Test Listing Data:**
```json
{
  "title": "Fresh Test Vegetables",
  "description": "Test listing for API validation",
  "category": "produce",
  "quantity": 5,
  "unit": "kg",
  "expiryDate": "2024-12-31T18:00:00.000Z",
  "pickupWindow": {
    "start": "2024-12-31T14:00:00.000Z",
    "end": "2024-12-31T18:00:00.000Z"
  },
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "Test Location, NY"
  }
}
```

**Expected Results:**
- Create: Status 201, listing ID saved
- CRUD operations work correctly
- Status transitions: available → claimed → delivered

---

## 5. Volunteer System
- [ ] GET `/api/volunteers/nearby` - Find nearby volunteers ✅/❌
- [ ] POST `/api/volunteers/match` - Match volunteers ✅/❌
- [ ] GET `/api/volunteers/opportunities` - Get opportunities ✅/❌
- [ ] PUT `/api/volunteers/availability` - Update availability ✅/❌
- [ ] GET `/api/volunteers/:id/stats` - Volunteer stats ✅/❌

**Auth Required:** Yes

**Expected Results:**
- Volunteers found based on location
- Matching algorithm works
- Availability updates saved

---

## 6. Chat System
- [ ] GET `/api/chat/conversations` - Get conversations ✅/❌
- [ ] POST `/api/chat/send` - Send message ✅/❌
- [ ] GET `/api/chat/:listingId` - Get chat messages ✅/❌
- [ ] PUT `/api/chat/messages/:id/read` - Mark as read ✅/❌

**Auth Required:** Yes

**Expected Results:**
- Messages sent and received
- Conversations listed correctly
- Read status updates

---

## 7. Dashboard & Analytics
- [ ] GET `/api/dashboard/stats` - Global stats ✅/❌
- [ ] GET `/api/dashboard/user-stats` - User stats ✅/❌
- [ ] GET `/api/dashboard/recent-activity` - Recent activity ✅/❌
- [ ] GET `/api/dashboard/impact-chart` - Impact data ✅/❌
- [ ] GET `/api/dashboard/leaderboard` - Leaderboard ✅/❌

**Expected Results:**
- Statistics calculated correctly
- Charts data in proper format
- Performance metrics accurate

---

## 8. Admin Functions
- [ ] GET `/api/admin/stats` - Admin dashboard ✅/❌
- [ ] GET `/api/admin/users` - All users ✅/❌
- [ ] PUT `/api/admin/users/:id/status` - Update user status ✅/❌
- [ ] GET `/api/admin/listings` - All listings ✅/❌
- [ ] PUT `/api/admin/listings/:id/status` - Update listing ✅/❌
- [ ] GET `/api/admin/reports` - Platform reports ✅/❌

**Auth Required:** Admin role

**Expected Results:**
- Admin-only access enforced
- Comprehensive data returned
- Management operations work

---

## 9. File Upload
- [ ] POST `/api/upload/image` - Upload single image ✅/❌
- [ ] POST `/api/upload/multiple` - Upload multiple images ✅/❌
- [ ] GET `/api/upload/signed-url` - Get signed URL ✅/❌
- [ ] DELETE `/api/upload/:fileName` - Delete file ✅/❌

**Auth Required:** Yes

**Expected Results:**
- Files uploaded to Firebase Storage
- URLs returned correctly
- File validation works

---

## 10. Error Handling
- [ ] Invalid authentication token ✅/❌
- [ ] Missing required fields ✅/❌
- [ ] Invalid object IDs ✅/❌
- [ ] Permission denied scenarios ✅/❌
- [ ] Rate limiting ✅/❌

**Expected Results:**
- Consistent error format
- Appropriate HTTP status codes
- Meaningful error messages

---

## 11. Edge Cases
- [ ] Expired tokens ✅/❌
- [ ] Duplicate email registration ✅/❌
- [ ] Invalid coordinates ✅/❌
- [ ] Large file uploads ✅/❌
- [ ] Concurrent operations ✅/❌

---

## Test Results Summary

**Total Tests:** ___/60
**Passed:** ___
**Failed:** ___
**Issues Found:** ___

### Critical Issues:
1. 
2. 
3. 

### Minor Issues:
1. 
2. 
3. 

### Recommendations:
1. 
2. 
3. 

**Testing Date:** ___________
**Tester:** ___________
**Server Version:** ___________
