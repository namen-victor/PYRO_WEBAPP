import { getUserProfile, signUpWithEmail } from '../auth';
import { getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// Mock Firebase modules
jest.mock('firebase/firestore');
jest.mock('firebase/auth');

describe('auth.ts', () => {
  describe('getUserProfile', () => {
    it('should return user profile when document exists', async () => {
      const mockData = {
        email: 'test@example.com',
        name: 'Test User',
        role: 'client',
        status: 'active'
      };

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockData
      });

      const result = await getUserProfile('test-uid');

      expect(result).toEqual({
        uid: 'test-uid',
        email: 'test@example.com',
        name: 'Test User',
        role: 'client',
        status: 'active'
      });
    });

    it('should return null when document does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false
      });

      const result = await getUserProfile('nonexistent-uid');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      (getDoc as jest.Mock).mockRejectedValue(new Error('Firestore error'));

      const result = await getUserProfile('error-uid');

      expect(result).toBeNull();
    });
  });

  describe('signUpWithEmail', () => {
    it('should create user and send verification email', async () => {
      const mockUserCredential = {
        user: { uid: 'new-user-123' }
      };

      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (setDoc as jest.Mock).mockResolvedValue(undefined);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      const result = await signUpWithEmail(
        'newuser@example.com',
        'password123',
        'New',
        'User'
      );

      expect(result).toEqual(mockUserCredential);
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          email: 'newuser@example.com',
          name: 'New User',
          firstName: 'New',
          lastName: 'User',
          role: 'client',
          status: 'pendingProfile',
          stepCompleted: 0,
          resumeUploaded: false
        })
      );
      expect(sendEmailVerification).toHaveBeenCalledWith(mockUserCredential.user);
    });

    it('should throw error if verification email fails', async () => {
      const mockUserCredential = {
        user: { uid: 'new-user-456' }
      };

      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (setDoc as jest.Mock).mockResolvedValue(undefined);
      (sendEmailVerification as jest.Mock).mockRejectedValue(new Error('Email service down'));

      await expect(
        signUpWithEmail('test@example.com', 'password123', 'Test', 'User')
      ).rejects.toThrow('Failed to send verification email');
    });
  });
});

