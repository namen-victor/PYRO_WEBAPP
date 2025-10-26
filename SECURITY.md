# Firestore Security Rules

This document outlines the security rules implemented for the Pyro Solutions Firestore database.

## Overview

The security rules implement role-based access control with the following user roles:
- **Admin**: Full access to all data
- **Staff**: Can manage clients and applications
- **Client**: Can only access their own data

## Collections and Rules

### Users Collection (`/users/{userId}`)

**Read Access:**
- Users can read their own profile
- Admins can read all users
- Staff can read all users

**Write Access:**
- Users can update their own profile (limited fields: name, linkedinUrl, whatsappConsent, resumeUrl, resumeUploaded)
- Admins can update any user
- Staff can update client users only
- Only admins can create/delete users

**Security Features:**
- Validates user data structure
- Prevents role escalation
- Protects sensitive fields

### Applications Collection (`/applications/{applicationId}`)

**Read Access:**
- Clients can read their own applications
- Staff can read applications assigned to them
- Admins can read all applications

**Write Access:**
- Staff can create applications for clients
- Staff can update applications assigned to them
- Admins can create/update any application
- Only admins can delete applications

**Security Features:**
- Prevents clients from creating unauthorized applications
- Ensures staff can only manage assigned applications
- Validates application data structure

### Messages Collection (`/messages/{messageId}`)

**Read Access:**
- Users can read messages they sent or received

**Write Access:**
- Users can create messages where they are the sender
- No updates or deletes allowed (messages are immutable)

**Security Features:**
- Ensures message integrity
- Prevents message tampering
- Validates sender identity

### Conversations Collection (`/conversations/{conversationId}`)

**Read Access:**
- Users can read conversations they're part of

**Write Access:**
- Staff can create conversations with clients
- No updates or deletes allowed

**Security Features:**
- Ensures conversation privacy
- Prevents unauthorized access

### Notifications Collection (`/notifications/{notificationId}`)

**Read Access:**
- Users can read their own notifications

**Write Access:**
- System can create notifications for users
- Users can update their own notifications (mark as read)
- No deletes allowed

**Security Features:**
- Prevents notification spam
- Ensures notification privacy

## Testing

Run the security rules tests:

```bash
npm install --save-dev @firebase/rules-unit-testing
npm test firestore.rules.test.js
```

## Deployment

Deploy the security rules to Firebase:

```bash
firebase deploy --only firestore:rules
```

## Security Best Practices

1. **Principle of Least Privilege**: Users only get access they need
2. **Role-Based Access Control**: Different permissions for different roles
3. **Data Validation**: All data is validated before storage
4. **Immutable Messages**: Chat messages cannot be modified
5. **Audit Trail**: All changes are logged by Firebase
6. **Default Deny**: All other collections are denied by default

## Monitoring

Monitor security rule violations in the Firebase Console:
1. Go to Firestore Database
2. Click on "Rules" tab
3. View "Rules playground" for testing
4. Check "Usage" tab for rule evaluation metrics

## Common Security Issues

1. **Insufficient Permissions**: Users can't access their data
2. **Overly Permissive Rules**: Users can access other users' data
3. **Data Validation**: Invalid data can be stored
4. **Role Escalation**: Users can change their own roles

## Troubleshooting

If users can't access their data:
1. Check if they're authenticated
2. Verify their role in the users collection
3. Ensure the document structure matches the rules
4. Test in the Rules playground

If security rules are too restrictive:
1. Review the helper functions
2. Check the specific collection rules
3. Test with different user roles
4. Use the Rules playground for debugging
