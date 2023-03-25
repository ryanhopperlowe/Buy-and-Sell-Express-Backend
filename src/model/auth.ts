import { auth } from 'firebase-admin';


export async function verifyIsAuthorized(userId: string, authToken = '') {
  const user = await verifyUser(authToken);
  if (userId !== user.userId) throw new Error();
}

export async function verifyUser(authToken = '') {
  const { uid } = await auth().verifyIdToken(authToken);
  if (!uid) throw new Error();

  return { userId: uid };
}