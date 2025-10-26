# Firestore Indexes Required

This document outlines the Firestore indexes that need to be created for the Pyro Solutions application to work properly.

## Current Status

The application has been updated to avoid complex composite indexes by:
- Removing `orderBy` clauses from Firestore queries
- Performing sorting in JavaScript instead
- Using simple `where` clauses only

## Required Indexes (if needed in the future)

### Applications Collection

1. **Client Applications Query**
   ```
   Collection: applications
   Fields: clientId (Ascending)
   ```

2. **Staff Applications Query**
   ```
   Collection: applications
   Fields: assignedStaffId (Ascending)
   ```

3. **Applications by Status (if needed)**
   ```
   Collection: applications
   Fields: clientId (Ascending), status (Ascending)
   ```

### Notifications Collection

1. **User Notifications Query**
   ```
   Collection: notifications
   Fields: userId (Ascending)
   ```

2. **Notifications by Type (if needed)**
   ```
   Collection: notifications
   Fields: userId (Ascending), type (Ascending)
   ```

3. **Unread Notifications (if needed)**
   ```
   Collection: notifications
   Fields: userId (Ascending), read (Ascending)
   ```

### Messages Collection

1. **Conversation Messages Query**
   ```
   Collection: messages
   Fields: conversationId (Ascending), timestamp (Ascending)
   ```

### Conversations Collection

1. **Staff Conversations Query**
   ```
   Collection: conversations
   Fields: staffId (Ascending)
   ```

2. **Client Conversations Query**
   ```
   Collection: conversations
   Fields: clientId (Ascending)
   ```

## How to Create Indexes

### Option 1: Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database
4. Click on "Indexes" tab
5. Click "Create Index"
6. Add the required fields and their sort orders
7. Click "Create"

### Option 2: Firebase CLI

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy indexes
firebase deploy --only firestore:indexes
```

### Option 3: Automatic Index Creation

Firebase will automatically suggest index creation when you run queries that require them. You can click the link in the error message to create the index directly.

## Performance Considerations

### Current Approach (Recommended for MVP)

- **Pros**: No complex index management, works immediately
- **Cons**: Sorting happens in JavaScript, may be slower for large datasets

### Future Optimization

For production with large datasets, consider:

1. **Create composite indexes** for frequently used queries
2. **Use Firestore's built-in sorting** instead of JavaScript sorting
3. **Implement pagination** for large result sets
4. **Use Firestore's limit()** to reduce data transfer

## Monitoring

Monitor your Firestore usage in the Firebase Console:

1. Go to Firestore Database
2. Click on "Usage" tab
3. Monitor:
   - Read operations
   - Write operations
   - Index usage
   - Storage usage

## Troubleshooting

### Common Index Errors

1. **"The query requires an index"**
   - Solution: Create the required composite index
   - Alternative: Simplify the query (current approach)

2. **"Index is building"**
   - Solution: Wait for the index to finish building (can take several minutes)

3. **"Too many indexes"**
   - Solution: Review and remove unused indexes
   - Consider consolidating similar queries

### Performance Tips

1. **Use specific field queries** instead of range queries when possible
2. **Limit result sets** with `limit()` to reduce data transfer
3. **Use pagination** for large datasets
4. **Monitor query performance** in Firebase Console

## Current Implementation

The application currently uses:

- Simple `where` clauses only
- JavaScript sorting instead of Firestore `orderBy`
- No complex composite indexes required
- Works immediately without index setup

This approach is perfect for MVP and development, but may need optimization for production with large datasets.

