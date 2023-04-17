import { auth } from 'firebase-admin';


export async function verifyIsAuthorized(userId: string, authToken = '') {
  const user = await verifyUser(authToken);
  if (userId !== user.userId) throw new Error('Unauthorized');
}

export async function verifyUser(authToken = '') {
  const { uid: userId } = await auth().verifyIdToken(authToken);
  if (!userId) throw new Error('Unauthorized');

  return { userId };
}